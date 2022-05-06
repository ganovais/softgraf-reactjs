import { FiTrash2 } from "react-icons/fi";
import { Container } from "./styles";

export function CardFriend() {
   return (
      <Container>
         <img
            src="https://avatars.githubusercontent.com/u/24701969?v=4"
            alt="Imagem do perfil"
         />

         <div>
            <p className="name">Gabriel Novais</p>
            <p className="username">@ganovais</p>
         </div>

         <FiTrash2 />
      </Container>
   );
}
