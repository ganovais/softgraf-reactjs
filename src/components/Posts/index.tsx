import { PostItem } from "./PostItem";
import { Container } from "./styles";

export function Posts() {
   // Criar um state: posts
   // Buscar da API
   // Fazer map para mostrar todos posts
   return (
      <Container>
         <PostItem />
         <PostItem />
         <PostItem />
         <PostItem />
      </Container>
   );
}
