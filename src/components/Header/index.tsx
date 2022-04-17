import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Container } from "./styles";

export function Header() {
   return (
      <Container>
         <Link to="home">
            <img src={logo} alt="logo @socialmedia" />
         </Link>

         <img
            src="https://avatars.githubusercontent.com/u/24701969?v=4"
            alt="avatar"
            className="avatar"
         />
      </Container>
   );
}
