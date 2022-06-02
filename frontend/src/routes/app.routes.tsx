import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Friends } from "../screens/Friends";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";

const Page = (props) => {
   useEffect(() => {
      document.title = props.title || "";
   }, [props.title]);
   return props.children;
};

export function AppRoutes() {
   return (
      <Routes>
         <Route
            path="home"
            element={
               <Page title="Tela inicial">
                  <Home />
               </Page>
            }
         />
         <Route path="friends" element={<Friends />} />
         <Route path="profile/:username" element={<Profile />} />
      </Routes>
   );
}
