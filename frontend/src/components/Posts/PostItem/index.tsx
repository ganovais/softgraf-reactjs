import { FiHeart } from "react-icons/fi";
import { Container, PostHeader, PostContent, PostFooter } from "./styles";

interface Post {
   author: string;
   content?: string;
   likes: number;
   image?: string;
   created_at: string;
}

interface PostItemProps {
   post: Post;
}

export function PostItem({ post }: PostItemProps) {
   return (
      <Container>
         <PostHeader>
            <img
               className="avatar"
               src="https://avatars.githubusercontent.com/u/24701969?v=4"
               alt="logo socialmedia"
            />

            <div>
               <p className="username">@{post.author}</p>
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
            <FiHeart /> {post.likes}
         </PostFooter>
      </Container>
   );
}
