import { Box, Text } from "@chakra-ui/react";
import React from "react";

function TopText() {
  return (
    <Box>
      <Text fontSize={"32"} fontWeight={"semibold"}>
        User List
      </Text>
      <Text>Create, Update, and Delete users</Text>
    </Box>
  );
}

export default TopText;
