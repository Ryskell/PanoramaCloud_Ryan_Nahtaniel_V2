declare module 'graphql-tag' {
    import { DocumentNode } from 'graphql';
  
    function gql(literals: string | readonly string[], ...placeholders: any[]): DocumentNode;
    export default gql;
  }
  