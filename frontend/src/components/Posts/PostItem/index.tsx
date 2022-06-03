import { FiHeart } from "react-icons/fi";
import { CustomAvatar } from "../../Avatar";
import { Container, PostHeader, PostContent, PostFooter } from "./styles";

interface User {
   name: string;
   username: string;
   avatar: string;
}

interface Post {
   user: User;
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
            <FiHeart /> {post.likes}
         </PostFooter>
      </Container>
   );
}
