import { PrismaClient, User, Article as PrismaArticle, Comment, Like } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from './context';
import { Article } from './types';

const prisma = new PrismaClient();

interface SignupArgs {
  email: string;
  password: string;
  name: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface CreateArticleArgs {
  title: string;
  description: string;
  imageUrl: string;
}

interface DeleteArticleArgs {
  id: string;
}

interface CreateCommentArgs {
  articleId: string;
  content: string;
}

interface LikeArticleArgs {
  articleId: string;
}

const resolvers = {
  Query: {
    users: async (_parent: {}, _args: {}, context: Context): Promise<User[]> => {
      return context.prisma.user.findMany();
    },
    articles: async (_parent: {}, _args: {}, context: Context): Promise<PrismaArticle[]> => {
      return context.prisma.article.findMany({ include: { author: true, comments: { include: { author: true } }, likes: true } });
    },
    topArticles: async (_parent: {}, _args: {}, context: Context): Promise<PrismaArticle[]> => {
      const articles = await context.prisma.article.findMany({
        take: 3,
        orderBy: {
          likes: {
            _count: 'desc',
          },
        },
        include: {
          author: true,
          comments: { include: { author: true } },
          likes: true
        },
      });

      return articles.map(article => ({
        ...article,
        likesCount: article.likes.length,
      }));
    },
    article: async (_parent: {}, args: { id: string }, context: Context): Promise<PrismaArticle | null> => {
      return context.prisma.article.findUnique({
        where: { id: parseInt(args.id, 10) },
        include: { author: true, comments: { include: { author: true } }, likes: true },
      });
    },
    myArticles: async (_parent: {}, _args: {}, context: Context): Promise<PrismaArticle[]> => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }
      return context.prisma.article.findMany({
        where: { authorId: context.userId },
        include: { author: true, comments: { include: { author: true } }, likes: true },
      });
    },
  },
  Article: {
    likesCount: (parent: Article) => parent.likes.length,
  },
  Mutation: {
    signup: async (_parent: {}, args: SignupArgs, context: Context): Promise<User> => {
      const existingUser = await context.prisma.user.findUnique({
        where: { email: args.email },
      });

      if (existingUser) {
        throw new Error('Email déjà existant');
      }

      const hashedPassword = await bcrypt.hash(args.password, 10);

      return context.prisma.user.create({
        data: {
          email: args.email,
          password: hashedPassword,
          name: args.name,
        },
      });
    },
    login: async (_parent: {}, args: LoginArgs, context: Context): Promise<string> => {
      const user = await context.prisma.user.findUnique({ where: { email: args.email } });
      if (!user) {
        throw new Error('No such user found');
      }

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, 'APP_SECRET');
      return token;
    },
    createArticle: async (_parent: {}, args: CreateArticleArgs, context: Context): Promise<PrismaArticle> => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const article = await context.prisma.article.create({
        data: {
          title: args.title,
          description: args.description,
          imageUrl: args.imageUrl,
          author: { connect: { id: context.userId } }
        },
        include: {
          author: true
        }
      });

      return article;
    },
    createComment: async (_parent: {}, args: CreateCommentArgs, context: Context): Promise<Comment> => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      try {
        const comment = await context.prisma.comment.create({
          data: {
            content: args.content,
            article: { connect: { id: parseInt(args.articleId, 10) } },
            author: { connect: { id: context.userId } },
          },
          include: {
            author: true,
          },
        });

        return comment;
      } catch (error) {
        console.error('Erreur lors de la création du commentaire:', error);
        throw new Error('Failed to create comment');
      }
    },
    likeArticle: async (_parent: {}, args: LikeArticleArgs, context: Context): Promise<Like> => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const userId = context.userId;
      const articleId = parseInt(args.articleId, 10);

      const existingLike = await context.prisma.like.findFirst({
        where: {
          userId: userId,
          articleId: articleId,
        },
      });

      if (existingLike) {
        throw new Error('Vous avez déjà aimé cet article');
      }

      return context.prisma.like.create({
        data: {
          article: { connect: { id: articleId } },
          user: { connect: { id: userId } },
        },
        include: {
          user: true,
          article: true,
        },
      });
    },
    deleteAllLikes: async (): Promise<number> => {
      const deleteResult = await prisma.like.deleteMany({});
      return deleteResult.count;
    },
    deleteAllComments: async (): Promise<number> => {
      const deleteResult = await prisma.comment.deleteMany({});
      return deleteResult.count;
    },
    deleteArticle: async (_parent: {}, args: DeleteArticleArgs, context: Context): Promise<PrismaArticle> => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const articleId = parseInt(args.id, 10);
      const article = await context.prisma.article.findUnique({
        where: { id: articleId },
        include: { comments: true, likes: true },
      });

      if (!article || article.authorId !== context.userId) {
        throw new Error('Not authorized to delete this article');
      }

      await context.prisma.comment.deleteMany({
        where: { articleId: articleId },
      });

      await context.prisma.like.deleteMany({
        where: { articleId: articleId },
      });

      return context.prisma.article.delete({
        where: { id: articleId },
      });
    },
  },
};

export default resolvers;
