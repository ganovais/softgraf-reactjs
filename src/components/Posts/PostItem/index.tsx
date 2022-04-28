import { FiHeart } from "react-icons/fi";
import { Container, PostHeader, PostContent, PostFooter } from "./styles";

export function PostItem() {
   return (
      <Container>
         <PostHeader>
            <img
               className="avatar"
               src="https://avatars.githubusercontent.com/u/24701969?v=4"
               alt="logo socialmedia"
            />

            <div>
               <p className="username">@ganovais</p>
               <p className="postDate">01/02/2022 14:00</p>
            </div>
         </PostHeader>
         <PostContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, nobis rem iste laborum corrupti unde. Non fugiat, id
            cupiditate voluptas similique necessitatibus, iste voluptatem, eaque
            unde natus quod nisi nihil. lorem
         </PostContent>
         <PostFooter>
            <FiHeart /> 32
         </PostFooter>
      </Container>
   );
}
