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
function App() {

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
