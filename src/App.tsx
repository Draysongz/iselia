import { Box, ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Welcome from "./pages/Welcome";
// import Loading from "./pages/Loading";
// import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Character from "./pages/Character";
import { CharacterProvider } from "./components/CharacterContext";
import customTheme from "./components/theme"
import Shop from "./pages/Shop";
import Team from "./pages/Team";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useUserLogin } from "./hooks/useAuth";
import Loading from "./pages/Loading";
import Welcome from "./pages/Welcome";

function App() {
   const [initData, setInitData] = useState("");
   const [page, setPage] = useState("welcome"); // State to manage current page ('intro', 'loading', or 'home')
   const userData = useUserLogin(initData);

   useEffect(() => {
     WebApp.ready();
     const data = WebApp.initData;
     setInitData(data);

     // Show Intro page for 5 seconds, then switch to Loading
     const timer = setTimeout(() => {
       setPage("loading");
     }, 2000);

     // Clear timer if component unmounts before 5 seconds
     return () => clearTimeout(timer);
   }, []);

   // If page is 'intro', show Intro page
   if (page === "welcome" && !userData) {
     return <Welcome />;
   }else if(page === "loading" && !userData){
    return <Loading />
   }

  return (
    <ChakraProvider theme={customTheme}>
    <Box width={'100vw'} overflowX={'hidden'} fontFamily={'sans-serif'}
    >
      <CharacterProvider>
      <Router>
          <Routes>
            <Route index element={<Home />}  />
            <Route path="characters" element={<Character />}  />
            <Route path="team" element={<Team />}/>
            <Route path="shop" element={<Shop />}  />
          </Routes>
        </Router>
      </CharacterProvider>
    </Box>
    </ChakraProvider>
  )
}

export default App
