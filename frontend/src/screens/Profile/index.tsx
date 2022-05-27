import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { BodyContent, Container, Content } from "./styles";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Posts } from "../../components/Posts";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

interface IUser {
   name: string;
   username: string;
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

export function Profile() {
   const [value, setValue] = React.useState(0);
   var { username } = useParams();
   const [user, setUser] = React.useState<IUser>({} as IUser);

   React.useEffect(() => {
      async function profile() {
         const { data } = await api.get(`/profile/${username}`);

         if (data.error) {
            toast.error(data.message);
            return;
         }

         setUser(data.user);
      }

      profile();
   }, [username]);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

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
                     <h4>Descrição</h4>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Blanditiis excepturi doloremque, nulla praesentium
                        minima ut at voluptas, ab sit illum aliquam tempora fuga
                        fugit assumenda? Unde nulla soluta in facilis.
                     </p>
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
