import undraw from "../../assets/undraw.svg";
import logoSoftgraf from "../../assets/logo-softgraf.svg";
import logo from "../../assets/logo.svg";
import {
   Container,
   DivLeft,
   DivRight,
   FooterForm,
   Form,
   RegisterLink,
   Title,
} from "./styles";
import { CustomInput } from "../../components/Input";
import { FiArrowLeft, FiLock, FiMail, FiSave, FiUser } from "react-icons/fi";
import { Button } from "../../components/Button";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface RegisterFormData {
   name: string;
   email: string;
   password: string;
}

interface ResponseRegister {
   error: boolean;
}

const registerSchema = object({
   name: string().required("Nome obrigatório"),
   email: string().required("E-mail obrigatório").email("E-mail inválido"),
   password: string()
      .required("Senha obrigatória")
      .min(6, "No mínimo 6 caracteres"),
}).required();

export function Register() {
   const navigate = useNavigate();
   const [isShowingPassword, setIsShowingPassword] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormData>({
      resolver: yupResolver(registerSchema),
   });

   const onSubmit = async (dataForm: RegisterFormData) => {
      const { data } = await api.post("/users", {
         name: dataForm.name,
         email: dataForm.email,
         password: dataForm.password,
      });

      if (!data.error) {
         toast.success("Usuário cadastrado com sucesso.");
         navigate("/");
      } else {
         toast.error("Erro ao cadastrar usuário");
      }
   };

   function showPassword() {
      setIsShowingPassword(!isShowingPassword);
   }

   return (
      <Container>
         <DivLeft>
            <img
               className="logo"
               src={logoSoftgraf}
               alt="Logo Escola softgraf"
            />
            <img
               className="undraw"
               src={undraw}
               alt="Imagem com uma mulher e seu notebook"
            />
         </DivLeft>

         <DivRight>
            <img
               className="logo"
               src={logo}
               alt="Logo da rede social (@softmedia)"
            />
            <Title>Cadastrar</Title>

            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
               <CustomInput
                  label="Nome"
                  leftIcon={<FiUser />}
                  {...register("name")}
                  error={errors.name}
               />

               <CustomInput
                  type="email"
                  label="E-mail"
                  leftIcon={<FiMail />}
                  {...register("email")}
                  error={errors.email}
               />

               <CustomInput
                  isPassword
                  type={isShowingPassword ? "text" : "password"}
                  label="Senha"
                  leftIcon={<FiLock />}
                  {...register("password")}
                  error={errors.password}
                  showPassword={showPassword}
                  isShowingPassword={isShowingPassword}
               />

               <FooterForm>
                  <RegisterLink to="/">
                     <FiArrowLeft />
                     voltar
                  </RegisterLink>
                  <Button type="submit" title="Cadastrar" icon={<FiSave />} />
               </FooterForm>
            </Form>
         </DivRight>
      </Container>
   );
}
