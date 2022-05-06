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
import { FiLock, FiSend, FiUser } from "react-icons/fi";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useLayoutEffect, useState } from "react";

interface LoginFormData {
   email: string;
   password: string;
}

const loginSchema = object({
   email: string().required("E-mail obrigatório").email("E-mail inválido"),
   password: string()
      .required("Senha obrigatória")
      .min(6, "No mínimo 6 caracteres"),
}).required();

export function Login() {
   const [isShowingPassword, setIsShowingPassword] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormData>({
      resolver: yupResolver(loginSchema),
   });

   const onSubmit = (data: LoginFormData) => {
      console.log(data);
   };

   useLayoutEffect(() => {
      console.log("useLayoutEffect");
   }, [isShowingPassword]);

   useEffect(() => {
      console.log("useEffect");
   }, [isShowingPassword]);

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
            <Title>Login</Title>

            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
               <CustomInput
                  label="E-mail"
                  leftIcon={<FiUser />}
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
                  <RegisterLink to="register">Criar uma conta</RegisterLink>
                  <Button type="submit" title="Entrar" icon={<FiSend />} />
               </FooterForm>
            </Form>
         </DivRight>
      </Container>
   );
}