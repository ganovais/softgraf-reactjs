import { CardFriend } from "../../components/CardFriend";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { BodyContent, Container, Content, ListFriends } from "./styles";

export function Friends() {
   return (
      <Container>
         <Header />

         <Content>
            <SideBar />

            <BodyContent>
               <h1>Amigos</h1>

               <ListFriends>
                  <CardFriend />
                  <CardFriend />
                  <CardFriend />
                  <CardFriend />
                  <CardFriend />
                  <CardFriend />
                  <CardFriend />
                  <CardFriend />
                  <CardFriend />
                  <CardFriend />
               </ListFriends>
            </BodyContent>
         </Content>
      </Container>
   );
}
