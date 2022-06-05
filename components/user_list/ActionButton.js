import { AddIcon } from "@chakra-ui/icons";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CreateDialogBox from "../Form/CreateDialogBox";

function ActionButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        display={"flex"}
        gap={"2"}
        alignItems={"center"}
        bg={"#667080"}
        color="#FFF"
        _hover={{ bg: "#4f5763" }}
        _active={{ bg: "#383e47" }}
        _focus={{}}
        // open dialog box
        onClick={onOpen}
      >
        <AddIcon />
        <Text>Create</Text>
      </Button>

      <CreateDialogBox isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ActionButton;
