import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import Form from "./Form";
import axios from "axios";
import { CloseIcon } from "@chakra-ui/icons";

function CreateDialogBox({ isOpen, onClose }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [showNotification, setShowNotification] = React.useState("false");
  React.useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      setShowNotification(false);
    };
  }, []);

  const [inputs, setInputs] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((oldState) => ({ ...oldState, [name]: value }));
  };

  const createFormData = [
    {
      label: "Firs Name",
      name: "firstName",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
  ];

  const submitCreateForm = async () => {
    const userObject = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
    };

    await axios
      .post("https://reqres.in/api/users", {
        userObject,
      })
      .then(setShowNotification(true));
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Form
            title={"Create User"}
            description={"Enter the Fields Below and Create a New User."}
            formData={createFormData}
            handleChange={handleChange}
            submitBtn={"Create"}
            onSubmit={submitCreateForm}
          />
          {showNotification === true ? (
            <Box
              w={"100%"}
              bg={"#D9D9D9"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Button
                colorScheme={"red"}
                alignSelf={"end"}
                onClick={() => {
                  setShowNotification(false);
                }}
              >
                <CloseIcon />
              </Button>
              <Text textAlign={"center"}>User Created Successfully</Text>
            </Box>
          ) : (
            ""
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateDialogBox;
