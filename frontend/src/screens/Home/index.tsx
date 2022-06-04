import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { Header } from "../../components/Header";
import { NewPostInput } from "../../components/NewPostInput";
import { Posts } from "../../components/Posts";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";
import { BodyPosts, Container, Content } from "./styles";

export function Home() {
   const [posts, setPosts] = useState([]);

   async function getPosts() {
      const { data } = await api.get("/publications");
      const { data: likes } = await api.get("/users/likes");

      const posts = data.map((post) => {
         const meLiked = likes.likes.some(
            (like) => like.publication_id === post.id
         );

         return {
            id: post.id,
            user: post.user,
            content: post.description,
            image: post.image
               ? process.env.REACT_APP_URL_FILE + "publication/" + post.image
               : null,
            likes: post.likes.length,
            created_at: new Date(post.created_at).toLocaleDateString("pt-BR", {
               day: "2-digit",
               month: "long",
               year: "numeric",
            }),
            meLiked,
         };
      });

      setPosts(posts);
   }

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <Container>
         <Header />

         <Content>
            <SideBar />

            <BodyPosts>
               <NewPostInput reloadPosts={getPosts} />

               <div className="refresh">
                  <h1>Postagens</h1>
                  {/* <Button title="refresh" onClick={handleRefreshPosts} /> */}
                  <FiRefreshCw onClick={getPosts} size="30" />
               </div>

               <Posts posts={posts} />
            </BodyPosts>
         </Content>
      </Container>
   );
}
