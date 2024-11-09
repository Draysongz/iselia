import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/context.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import App from "./App.tsx";
import './index.css';

const manifestUrl ="https://raw.githubusercontent.com/draysongz/iselia/main/public/manifest.json";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <UserProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </UserProvider>
    </TonConnectUIProvider>
  </StrictMode>
);
