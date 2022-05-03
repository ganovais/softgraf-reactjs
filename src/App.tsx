import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/global";
import { theme_dark } from "./styles/theme_dark";
import { createTheme, ThemeProvider as MuiProvider } from "@mui/material";

const muiTheme = createTheme({
   palette: {
      primary: {
         light: "#fab685",
         main: "#f49d6e",
         dark: "#e58947",
         contrastText: "#fff",
      },
   },
});

function App() {
   const [theme, setTheme] = useState(theme_dark);

   return (
      <ThemeProvider theme={theme}>
         <GlobalStyle />

         <BrowserRouter>
            <MuiProvider theme={muiTheme}>
               <Routes />
            </MuiProvider>
         </BrowserRouter>
      </ThemeProvider>
   );
}

export default App;
