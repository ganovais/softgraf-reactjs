import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { api } from "../../../services/api";
import { CustomAvatar } from "../../Avatar";
import { Container, PostHeader, PostContent, PostFooter } from "./styles";

interface User {
   name: string;
   username: string;
   avatar: string;
}

interface Post {
   id: number;
   user: User;
   content?: string;
   likes: number;
   image?: string;
   created_at: string;
   meLiked: boolean;
}

interface PostItemProps {
   post: Post;
}

export function PostItem({ post }: PostItemProps) {
   const [likes, setLikes] = useState(post.likes);
   const [meLiked, setMeLiked] = useState(post.meLiked);

   async function handleLike(id) {
      const publication_id = id;
      const { data } = await api.post("/publications/like", { publication_id });

      if (!data.error) {
         if (data.type === "minus") {
            setLikes(likes - 1);
            setMeLiked(false);
         } else {
            setLikes(likes + 1);
            setMeLiked(true);
         }
      }
   }

   return (
      <Container>
         <PostHeader>
            <CustomAvatar
               username={post.user.username}
               name={post.user.name}
               avatar={post.user.avatar}
            />

            <div>
               <p className="username">@{post.user.username}</p>
               <p className="postDate">{post.created_at}</p>
            </div>
         </PostHeader>
         <PostContent>
            {post.content && <p>{post.content}</p>}
            {post.image && (
               <img
                  className="image-pub"
                  src={post.image}
                  alt="Imagem da publicação"
               />
            )}
         </PostContent>
         <PostFooter>
            <FiHeart
               color={meLiked ? "#e94a4a" : "#ccc"}
               onClick={() => handleLike(post.id)}
            />{" "}
            {likes}
         </PostFooter>
      </Container>
   );
}
