import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { useAuth0 } from "@auth0/auth0-react";

import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/protected-route";

import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";

function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { getAccessTokenSilently } = useAuth0();

  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: import.meta.env.VITE_GRAPHQL_URL,
    });

    const authLink = new SetContextLink(async ({ headers }) => {
      const token = await getAccessTokenSilently();

      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      devtools: { enabled: true },
      link: authLink.concat(httpLink),
    });
  }, [getAccessTokenSilently]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

function App() {
  return (
    <ApolloWrapper>
      <Provider>
        <Toaster />

        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Auth />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ApolloWrapper>
  );
}

export default App;
