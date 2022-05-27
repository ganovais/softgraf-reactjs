import { PostItem } from "./PostItem";
import { Container } from "./styles";

interface Post {
   id: string;
   author: string;
   content?: string;
   image?: string;
   likes: number;
   created_at: string;
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
