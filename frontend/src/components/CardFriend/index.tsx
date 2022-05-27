import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Avatar, Container } from "./styles";

interface IFriend {
   name: string;
   username: string;
   avatar: string;
   id: number;
}
interface CardFriendProps {
   friend: IFriend;
}

export function CardFriend({ friend }: CardFriendProps) {
   const navigate = useNavigate();

   return (
      <Container>
         {friend.avatar ? (
            <img src={friend.avatar} alt="Imagem do perfil" />
         ) : (
            <Avatar>{friend.name[0] + friend.name[1]}</Avatar>
         )}

         <div className="info">
            <p
               className="name"
               onClick={() => navigate(`/profile/${friend.username}`)}
            >
               {friend.name}
            </p>
            <p className="username">@{friend.username}</p>
         </div>

         <FiTrash2 />
      </Container>
   );
}
