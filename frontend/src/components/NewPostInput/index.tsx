import { FiImage, FiSend } from "react-icons/fi";
import { Container } from "./styles";

export function NewPostInput() {
   return (
      <Container>
         <img
            className="avatar"
            src="https://avatars.githubusercontent.com/u/24701969?v=4"
            alt="logo socialmedia"
         />

         <input placeholder="No que está pensando @ganovais" />

         <div className="addImage">
            <FiImage />
         </div>

         <div className="createPost">
            <FiSend />
         </div>
      </Container>
   );
}
