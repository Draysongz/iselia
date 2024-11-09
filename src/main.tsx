import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/context.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import App from "./App.tsx";
import './index.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl="">
      <UserProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </UserProvider>
    </TonConnectUIProvider>
  </StrictMode>
);
