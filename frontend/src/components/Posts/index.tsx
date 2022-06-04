import { PostItem } from "./PostItem";
import { Container } from "./styles";

interface User {
   name: string;
   username: string;
   avatar: string;
}

interface Post {
   id: number;
   user: User;
   content?: string;
   image?: string;
   likes: number;
   created_at: string;
   meLiked: boolean;
}

interface PostsProps {
   posts: Post[];
}

export function Posts({ posts }: PostsProps) {
   // Criar um state: posts
   // Buscar da API
   // Fazer map para mostrar todos posts
   return (
      <Container>
         {posts.length ? (
            posts.map((post) => <PostItem key={post.id} post={post} />)
         ) : (
            <h4>Nenhuma publicação encontrada.</h4>
         )}
      </Container>
   );
}
