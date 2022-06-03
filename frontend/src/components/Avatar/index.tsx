import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Avatar, ImageAvatar } from "./styles";

interface CustomAvatarProps {
   avatar?: string;
   name: string;
   username: string;
}

export function CustomAvatar({ avatar, name, username }: CustomAvatarProps) {
   const { user } = useAuth();
   const navigate = useNavigate();

   function handleNavigate() {
      if (user.username === username) {
         navigate("/profile/me");
      } else {
         navigate(`/profile/${username}`);
      }
   }

   return (
      <div onClick={handleNavigate}>
         {avatar ? (
            <ImageAvatar
               src={process.env.REACT_APP_URL_FILE + "avatar/" + avatar}
               alt="Imagem do perfil"
            />
         ) : (
            <Avatar>{name[0] + name[1]}</Avatar>
         )}
      </div>
   );
}
