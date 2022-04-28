import { Header } from "../../components/Header";
import { NewPostInput } from "../../components/NewPostInput";
import { Posts } from "../../components/Posts";
import { SideBar } from "../../components/SideBar";
import { BodyPosts, Container, Content } from "./styles";

export function Home() {
   return (
      <Container>
         <Header />

         <Content>
            <SideBar />

            <BodyPosts>
               <NewPostInput />
               <h1>Postagens</h1>

               <Posts />
            </BodyPosts>
         </Content>
      </Container>
   );
}
