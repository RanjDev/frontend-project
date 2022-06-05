import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import useSetSelectUser from "../store/store";

function Navbar() {
  const selectUser = useSetSelectUser((state) => state.user);
  const selected = useSetSelectUser((state) => state.selected);

  const [showUser, setShowUser] = React.useState(false);

  React.useEffect(() => {
    setShowUser(selected);
  }, [selected]);

  return (
    <Box
      bg="#F9FAFA"
      w="100%"
      h={"50"}
      py={4}
      px={8}
      color="black"
      display={"flex"}
      justifyContent="space-between"
    >
      <Text>Netspot Solutions</Text>

      {showUser ? (
        <Box display={"flex"} flexDirection="row" alignItems="center" gap="2">
          <Image
            boxSize={"30"}
            src={selectUser.avatar}
            alt="User Avatar"
            rounded={"full"}
          />
          <Box>
            <Box fontSize="10">{selectUser.first_name}</Box>
            <Box fontSize="10">{selectUser.email}</Box>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default Navbar;
