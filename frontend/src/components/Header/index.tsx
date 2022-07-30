import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { CustomAvatar } from "../Avatar";
import { ModalFriendship } from "../Modal";
import { Container, Input } from "./styles";
interface IUser {
   name: string;
   username: string;
   avatar: string;
   id: number;
}

export function Header() {
   const { user } = useAuth();
   const [search, setSearch] = useState("");
   const [users, setUsers] = useState<IUser[]>([]);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      async function getPeople() {
         if (!search || search.length < 5) {
            document.body.style.overflow = "auto";
            setShowModal(false);
            return;
         }

         const { data: users } = await api.get("/users", {
            params: {
               username: search,
            },
         });

         setShowModal(true);
         setUsers(users);
      }

      getPeople();
   }, [search]);

   function handleCloseModal() {
      setSearch("");
      setShowModal(false);
   }

   return (
      <Container>
         <Link to="/home">
            <img src={logo} alt="logo @socialmedia" />
         </Link>

         <Input
            value={search}
            type="search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar amigo @username"
         />

         {showModal && (
            <ModalFriendship closeModal={handleCloseModal} users={users} />
         )}

         <CustomAvatar
            username={user.username}
            avatar={user.avatar}
            name={user.name}
         />
      </Container>
   );
}
