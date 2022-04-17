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
import {
   FiArrowLeft,
   FiLock,
   FiMail,
   FiSave,
   FiSend,
   FiUser,
} from "react-icons/fi";
import { Button } from "../../components/Button";

export function Register() {
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

            <Form>
               <CustomInput label="Nome" leftIcon={<FiUser />} />

               <CustomInput type="email" label="E-mail" leftIcon={<FiMail />} />

               <CustomInput
                  type="password"
                  label="Senha"
                  leftIcon={<FiLock />}
               />

               <FooterForm>
                  <RegisterLink to="/">
                     <FiArrowLeft />
                     voltar
                  </RegisterLink>
                  <Button type="button" title="Cadastrar" icon={<FiSave />} />
               </FooterForm>
            </Form>
         </DivRight>
      </Container>
   );
}
