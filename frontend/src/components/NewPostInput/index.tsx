import { useState } from "react";
import { FiImage, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { CustomAvatar } from "../Avatar";
import { Container } from "./styles";

interface NewPostInputProps {
   reloadPosts: () => void;
}
export function NewPostInput({ reloadPosts }: NewPostInputProps) {
   const [newPublication, setNewPublication] = useState("");
   const { user } = useAuth();
   const placeholder = `No que está pensando @${user.username}`;

   async function handleSubmit() {
      if (!newPublication) {
         toast.warning("Nenhuma mensagem informada");
         return;
      }

      const { data } = await api.post("/publications", {
         description: newPublication,
      });

      if (data?.id) {
         toast.success("Publicação criada com sucesso.");
         reloadPosts();
      } else {
         toast.error("Erro ao criar sua publicação.");
      }

      setNewPublication("");
   }

   async function handleSubmitFile(file) {
      const formData = new FormData();
      formData.append("file", file);

      const config = {
         headers: {
            "content-type": "multipart/form-data",
         },
      };

      const { data } = await api.post("/publications", formData, config);

      if (data?.id) {
         toast.success("Publicação criada com sucesso.");
      } else {
         toast.error("Erro ao criar sua publicação.");
      }
   }

   return (
      <Container>
         <CustomAvatar
            avatar={user.avatar}
            username={user.username}
            name={user.name}
         />

         <input
            onChange={(event) => setNewPublication(event.target.value)}
            placeholder={placeholder}
            value={newPublication}
         />

         <label htmlFor="file-input" className="button addImage">
            <FiImage />
         </label>

         <input
            onChange={(event) => handleSubmitFile(event.target.files[0])}
            type="file"
            id="file-input"
         />

         <div onClick={handleSubmit} className="button createPost">
            <FiSend />
         </div>
      </Container>
   );
}
