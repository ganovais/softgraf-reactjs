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

export function Login() {
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

            <Form>
               <CustomInput label="E-mail" leftIcon={<FiUser />} />
               <CustomInput
                  type="password"
                  label="Senha"
                  leftIcon={<FiLock />}
               />

               <FooterForm>
                  <RegisterLink>Criar uma conta</RegisterLink>
                  <Button type="button" title="Entrar" icon={<FiSend />} />
               </FooterForm>
            </Form>
         </DivRight>
      </Container>
   );
}
