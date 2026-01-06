import { useAuth0 } from "@auth0/auth0-react";

import { useApolloClient } from "@apollo/client/react";

import { Button } from "@chakra-ui/react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const client = useApolloClient();

  async function handleLogout() {
    await logout({ logoutParams: { returnTo: window.location.origin } });
    await client.resetStore();
  }

  return (
    <Button
      size={"lg"}
      color={"red.500"}
      variant={"outline"}
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
