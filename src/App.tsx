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
import Earn from "./pages/Earn";
import Task from "./pages/Task";
import Settings from "./pages/Settings";
// import WebApp from "@twa-dev/sdk";
// import { useEffect, useState } from "react";
import { useUserLogin } from "./hooks/useAuth";
import Loading from "./pages/Loading";

import { useUser } from "./context/context";
import { useEffect } from "react";

function App() {
  //  const [initData, setInitData] = useState("");
  
   const {setToken, setUser} = useUser()

   const initData ="query_id=AAElBO5_AAAAACUE7n8449Rf&user=%7B%22id%22%3A2146305061%2C%22first_name%22%3A%22Crypto%22%2C%22last_name%22%3A%22Dray%22%2C%22username%22%3A%22Habibilord%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1731079459&hash=f976c3c9b1f46c418b33ddbb16f594986af8b32faa71c37a6c05de64442bee77";
   

  //  useEffect(() => {
  //   WebApp.expand()
  //    const data = WebApp.initData;
  //    setInitData(data);

 
  //  }, []);

  

  

   const {userData} = useUserLogin(initData);


useEffect(()=>{
  if(!userData) return ;
 setUser(userData.user);
 setToken(userData.token);
},[userData])



     if(!userData){
      return <Loading />;
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
            <Route path="earn" element={<Earn />} />
            <Route path="tasks" element={<Task />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Router>
      </CharacterProvider>
    </Box>
    </ChakraProvider>
  )
}

export default App
