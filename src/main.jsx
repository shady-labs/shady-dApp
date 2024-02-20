import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index.js";
import { store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@fontsource-variable/manrope";
import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext
} from "@dynamic-labs/sdk-react-core";
import { ethers } from "ethers";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { addUser } from "./graphql/mutation/addUser.js";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <ChakraProvider
            theme={theme}
            toastOptions={{
              defaultOptions: {
                position: "top",
                duration: 3000,
                variant: "subtle",
                containerStyle: { fontSize: 14 },
              },
            }}
          >
            <DynamicContextProvider
              settings={{
                environmentId: "ac028ea8-26b1-4d54-bfb0-5b2d0d84b434",
                walletConnectors: [EthereumWalletConnectors],
                eventsCallbacks: {
                  onAuthFlowClose: () => {
                    console.log("in onAuthFlowClose");
                  },
                  onAuthFlowOpen: () => {
                    console.log("in onAuthFlowOpen");
                  },
                  onAuthSuccess: async ({
                    authToken,
                    user,
                  }) => {
                    console.log(
                      `Welcome ${user?.email} your token is ${authToken}`,
                    );
                    const wallet =await new ethers.providers.Web3Provider(window.ethereum).getSigner().getAddress();
                    addUser(user?.firstName, false, user?.ens.avatar, wallet, user?.country, user?.email)
                    // window.location.assign('/success');
                  },
                  onLogout: () => {
                    console.log("in onLogout");
                  },
                },
              }}
            >
              <RouterProvider router={router} />
            </DynamicContextProvider>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
