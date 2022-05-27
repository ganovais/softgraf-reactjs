import { useEffect, useState } from "react";
import { CardFriend } from "../../components/CardFriend";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";
import { BodyContent, Container, Content, ListFriends } from "./styles";

interface IFriend {
   name: string;
   username: string;
   avatar: string;
   id: number;
}

export function Friends() {
   const [friends, setFriends] = useState<IFriend[]>([]);

   useEffect(() => {
      async function getFriends() {
         const { data } = await api.get("/users/friends");

         const friendsFormatted = data.friends.map((friend) => ({
            username: friend.following.username,
            name: friend.following.name,
            avatar: friend.following.avatar,
            id: friend.following.id,
         }));

         setFriends(friendsFormatted);
      }

      getFriends();
   }, []);

   return (
      <Container>
         <Header />

         <Content>
            <SideBar />

            <BodyContent>
               <h1>Amigos</h1>

               {friends.length ? (
                  <ListFriends>
                     {friends.map((friend) => (
                        <CardFriend key={friend.id} friend={friend} />
                     ))}
                  </ListFriends>
               ) : (
                  <h4>Nenhum amigo localizado</h4>
               )}
            </BodyContent>
         </Content>
      </Container>
   );
}
