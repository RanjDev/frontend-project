import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import ActionButton from "./ActionButton";
import TopText from "./TopText";
import UserTable from "./UserTable";

function UserList() {
  return (
    <Center w="100%">
      <Box my={"10"} w="80%" display={"flex"} flexDirection={"column"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <TopText />
          <ActionButton />
        </Box>
        <Box my={"10"}>
          <UserTable />
        </Box>
      </Box>
    </Center>
  );
}

export default UserList;
