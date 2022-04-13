import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Login } from "./screens/Login";
import { GlobalStyle } from "./styles/global";
import { theme_dark } from "./styles/theme_dark";
import { theme_white } from "./styles/theme_white";

function App() {
   const [theme, setTheme] = useState(theme_dark);

   // useEffect(() => {
   //    setTimeout(() => {
   //       setTheme(theme_white);
   //    }, 5000);
   // }, []);

   return (
      <ThemeProvider theme={theme}>
         <GlobalStyle />
         <Login />
      </ThemeProvider>
   );
}

export default App;
