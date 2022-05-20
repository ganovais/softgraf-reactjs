import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { NewPostInput } from "../../components/NewPostInput";
import { Posts } from "../../components/Posts";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";
import { BodyPosts, Container, Content } from "./styles";

export function Home() {
   const [posts, setPosts] = useState([]);
   const [refresh, setRefresh] = useState(0);

   useEffect(() => {
      async function getPosts() {
         const { data } = await api.get("/publications");
         const posts = data.posts.map((post) => ({
            id: post.id,
            author: post.author,
            content: post.content,
            created_at: new Date(post.created_at).toLocaleDateString("pt-BR", {
               day: "2-digit",
               month: "long",
               year: "numeric",
            }),
         }));

         setPosts(posts);
      }

      getPosts();
   }, [refresh]);

   function handleRefreshPosts() {
      let item = refresh;
      item++;
      setRefresh(item);
   }

   return (
      <Container>
         <Header />

         <Content>
            <SideBar />

            <BodyPosts>
               <NewPostInput />
               <h1>Postagens</h1>
               <Button title="refresh" onClick={handleRefreshPosts} />

               <Posts posts={posts} />
            </BodyPosts>
         </Content>
      </Container>
   );
}
