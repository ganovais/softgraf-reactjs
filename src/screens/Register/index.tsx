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

interface RegisterFormData {
   name: string;
   email: string;
   password: string;
}

const registerSchema = object({
   name: string().required("Nome obrigatório"),
   email: string().required("E-mail obrigatório").email("E-mail inválido"),
   password: string()
      .required("Senha obrigatória")
      .min(6, "No mínimo 6 caracteres"),
}).required();

export function Register() {
   const [isShowingPassword, setIsShowingPassword] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormData>({
      resolver: yupResolver(registerSchema),
   });

   const onSubmit = (data: RegisterFormData) => {
      console.log(data);
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
