import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { BodyContent, Container, Content, HeaderProfile } from "./styles";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

interface IUser {
   id: number;
   name: string;
   username: string;
   description: string;
   followings?: [];
   followed_by?: [];
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
   const [posts, setPosts] = React.useState([]);
   const [isFriend, setIsFriend] = React.useState(false);

   React.useEffect(() => {
      async function profile() {
         const { data } = await api.get(`/users/profile/${username}`);

         if (data.error) {
            toast.error(data.message);
            return;
         }

         setIsFriend(
            data.user.followed_by.length || data.user.followings.length
         );

         const { data: likes } = await api.get("/users/likes");

         const posts = data.user.publications.map((post) => {
            const meLiked = likes.likes.some(
               (like) => like.publication_id === post.id
            );

            return {
               id: post.id,
               user: post.user,
               content: post.description,
               image: post.image
                  ? process.env.REACT_APP_URL_FILE + "publication/" + post.image
                  : null,
               likes: post.likes.length,
               created_at: new Date(post.created_at).toLocaleDateString(
                  "pt-BR",
                  {
                     day: "2-digit",
                     month: "long",
                     year: "numeric",
                  }
               ),
               meLiked,
            };
         });

         setUser(data.user);
         setPosts(posts);
      }

      profile();
   }, [username]);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   async function handleAddFriend() {
      const { data } = await api.post("/users/friends", {
         friend_id: user.id,
      });

      if (!data.error) {
         toast.success("Amigo adicionado com sucesso");
      } else {
         toast.warning("Vocês já são amigos");
      }

      setIsFriend(true);
   }

   async function handleRemoveFriend() {
      const { data } = await api.post("/users/friends/remove", {
         friend_id: user.id,
      });

      if (!data.error) {
         toast.success("Amigo removido com sucesso");
      } else {
         toast.warning("Vocês já são amigos");
      }

      setIsFriend(false);
   }

   return (
      <Container>
         <Header />

         <Content>
            <SideBar />

            {user.id ? (
               <BodyContent>
                  <HeaderProfile>
                     <div>
                        <h1 className="name">{user.name}</h1>
                        <b className="username">@{user.username}</b>
                     </div>

                     {isFriend ? (
                        <Button
                           onClick={handleRemoveFriend}
                           title="Remover amigo"
                           icon={<FiUserMinus />}
                        />
                     ) : (
                        <Button
                           onClick={handleAddFriend}
                           title="Adicionar amigo"
                           icon={<FiUserPlus />}
                        />
                     )}
                  </HeaderProfile>

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
                           {user.description
                              ? user.description
                              : "Este usuário não informou uma descrição ainda"}
                        </p>
                     </TabPanel>
                     <TabPanel value={value} index={1}>
                        {/* <Posts /> */}
                        <h1>Posts</h1>

                        <Posts posts={posts} />
                     </TabPanel>
                  </Box>
               </BodyContent>
            ) : (
               <h3>Carregando...</h3>
            )}
         </Content>
      </Container>
   );
}
