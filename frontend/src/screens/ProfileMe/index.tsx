import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
   BodyContent,
   Container,
   Content,
   FooterForm,
   Form,
   RegisterLink,
} from "./styles";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/Input";
import { FiArrowLeft, FiLock, FiMail, FiSave, FiUser } from "react-icons/fi";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && <Box sx={{ marginTop: "20px" }}>{children}</Box>}
      </div>
   );
}

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
}

export function ProfileMe() {
   const [isShowingPassword, setIsShowingPassword] = React.useState(false);
   const [value, setValue] = React.useState(0);
   const { user } = useAuth();
   const [description, setDescription] = React.useState(user.description);
   const [password, setPassword] = React.useState("");
   const [confirmPassword, setConfirmPassword] = React.useState("");

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   function showPassword() {
      setIsShowingPassword(!isShowingPassword);
   }

   async function handleSubmit(e) {
      e.preventDefault();
      console.log(description, password, confirmPassword);
      if (password && password.length < 6) {
         toast.warn("Senha deve ter pelo menos 6 caracteres");
         return;
      }

      if (password !== confirmPassword) {
         toast.warn("As senhas são diferentes");
         return;
      }

      const data = {
         description,
         password,
      };

      const response = await api.put("/users", data);
      console.log(response);
   }

   return (
      <Container>
         <Header />

         <Content>
            <SideBar />

            <BodyContent>
               <h1 className="name">{user.name}</h1>
               <b className="username">@{user.username}</b>

               <Box sx={{ width: "100%", padding: "0", marginTop: "20px" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                     <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="primary"
                        indicatorColor="primary"
                     >
                        <Tab
                           sx={{ paddingLeft: "0" }}
                           label="Informações"
                           {...a11yProps(0)}
                        />
                        <Tab label="Publicações" {...a11yProps(1)} />
                     </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                     <Form onSubmit={handleSubmit} autoComplete="off">
                        <div className="inputs">
                           <div className="textarea">
                              <label>Sobre</label>
                              <textarea
                                 placeholder="Sobre mim"
                                 defaultValue={user.description}
                                 onChange={(event) =>
                                    setDescription(event.target.value)
                                 }
                              ></textarea>
                           </div>

                           <div className="df">
                              <div className="row mr-30">
                                 <CustomInput
                                    label="Nome"
                                    leftIcon={<FiUser />}
                                    value={user.name}
                                    disabled
                                 />

                                 <CustomInput
                                    type="email"
                                    label="E-mail"
                                    leftIcon={<FiMail />}
                                    value={user.email}
                                    disabled
                                 />
                              </div>

                              <div className="row">
                                 <CustomInput
                                    isPassword
                                    type={
                                       isShowingPassword ? "text" : "password"
                                    }
                                    label="Nova senha"
                                    leftIcon={<FiLock />}
                                    showPassword={showPassword}
                                    isShowingPassword={isShowingPassword}
                                    onChange={(event) =>
                                       setPassword(event.target.value)
                                    }
                                 />

                                 <CustomInput
                                    isPassword
                                    type={
                                       isShowingPassword ? "text" : "password"
                                    }
                                    label="Confirmar senha"
                                    leftIcon={<FiLock />}
                                    showPassword={showPassword}
                                    isShowingPassword={isShowingPassword}
                                    onChange={(event) =>
                                       setConfirmPassword(event.target.value)
                                    }
                                 />
                              </div>
                           </div>
                        </div>

                        <FooterForm>
                           <RegisterLink to="/home">
                              <FiArrowLeft />
                              voltar
                           </RegisterLink>
                           <Button
                              type="submit"
                              title="Editar"
                              icon={<FiSave />}
                           />
                        </FooterForm>
                     </Form>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                     {/* <Posts /> */}
                     <h1>Posts</h1>
                  </TabPanel>
               </Box>
            </BodyContent>
         </Content>
      </Container>
   );
}