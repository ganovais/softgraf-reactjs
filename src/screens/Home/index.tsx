import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { BodyPosts, Container, Content } from "./styles";

export function Home() {
   return (
      <Container>
         <Header />

         <Content>
            <SideBar />

            <BodyPosts>
               <h1>Postagens</h1>
            </BodyPosts>
         </Content>
      </Container>
   );
}
