import { FiLogOut, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Container, ItemList } from "./styles";

export function SideBar() {
   const { signOut } = useAuth();

   function handleSignOut() {
      signOut();
   }

   return (
      <Container>
         <ItemList>
            <FiUsers />
            <Link to="/friends">Amigos</Link>
         </ItemList>

         <ItemList onClick={handleSignOut}>
            <FiLogOut />
            <p>Sair</p>
         </ItemList>
      </Container>
   );
}
