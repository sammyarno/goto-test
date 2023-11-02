import { createRoot } from "react-dom/client";
import App from "./pages/app";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

const client = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
