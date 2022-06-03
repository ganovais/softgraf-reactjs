import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";
import { CustomAvatar } from "../Avatar";
import { Container } from "./styles";

export function Header() {
   const { user } = useAuth();
   return (
      <Container>
         <Link to="/home">
            <img src={logo} alt="logo @socialmedia" />
         </Link>

         <CustomAvatar
            username={user.username}
            avatar={user.avatar}
            name={user.name}
         />
      </Container>
   );
}
