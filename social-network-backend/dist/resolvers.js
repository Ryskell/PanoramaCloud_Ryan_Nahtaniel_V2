"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const resolvers = {
    Query: {
        users: async (_parent, _args, context) => {
            return context.prisma.user.findMany();
        },
        articles: async (_parent, _args, context) => {
            return context.prisma.article.findMany({ include: { author: true, comments: { include: { author: true } }, likes: true } });
        },
        topArticles: async (_parent, _args, context) => {
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
        article: async (_parent, args, context) => {
            return context.prisma.article.findUnique({
                where: { id: parseInt(args.id, 10) },
                include: { author: true, comments: { include: { author: true } }, likes: true },
            });
        },
        myArticles: async (_parent, _args, context) => {
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
        likesCount: (parent) => parent.likes.length,
    },
    Mutation: {
        signup: async (_parent, args, context) => {
            const existingUser = await context.prisma.user.findUnique({
                where: { email: args.email },
            });
            if (existingUser) {
                throw new Error('Email déjà existant');
            }
            const hashedPassword = await bcrypt_1.default.hash(args.password, 10);
            return context.prisma.user.create({
                data: {
                    email: args.email,
                    password: hashedPassword,
                    name: args.name,
                },
            });
        },
        login: async (_parent, args, context) => {
            const user = await context.prisma.user.findUnique({ where: { email: args.email } });
            if (!user) {
                throw new Error('No such user found');
            }
            const valid = await bcrypt_1.default.compare(args.password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'APP_SECRET');
            return token;
        },
        createArticle: async (_parent, args, context) => {
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
        createComment: async (_parent, args, context) => {
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
            }
            catch (error) {
                console.error('Erreur lors de la création du commentaire:', error);
                throw new Error('Failed to create comment');
            }
        },
        likeArticle: async (_parent, args, context) => {
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
        deleteAllLikes: async () => {
            const deleteResult = await prisma.like.deleteMany({});
            return deleteResult.count;
        },
        deleteAllComments: async () => {
            const deleteResult = await prisma.comment.deleteMany({});
            return deleteResult.count;
        },
        deleteArticle: async (_parent, args, context) => {
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
exports.default = resolvers;
