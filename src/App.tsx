import { Box, ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Welcome from "./pages/Welcome";
// import Loading from "./pages/Loading";
// import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Character from "./pages/Character";
import customTheme from "./components/theme"
function App() {

  return (
    <ChakraProvider theme={customTheme}>
    <Box width={'100vw'} overflowX={'hidden'} fontFamily={'sans-serif'}
    >
      <Router>
          <Routes>
            <Route index element={<Home />}  />
            <Route path="characters" element={<Character />}  />
          </Routes>
        </Router>
    </Box>
    </ChakraProvider>
  )
}

export default App
