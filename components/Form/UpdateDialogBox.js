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
import useSWR from "swr";
import { CloseIcon } from "@chakra-ui/icons";

function UpdateDialogBox({ isOpen, onClose, userId }) {
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

  const URL = `https://reqres.in/api/users/${userId}`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data } = useSWR(URL, fetcher);

  React.useEffect(() => {
    //if we have data then set the inputs to that data
    data && setInputs(data.data);
  }, [data]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((oldState) => ({ ...oldState, [name]: value }));
  };

  const updateFormData = [
    {
      label: "Firs Name",
      name: "firstName",
      type: "text",
      value: inputs.first_name,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      value: inputs.last_name,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      value: inputs.email,
    },
  ];

  const submitUpdateForm = async () => {
    const userObject = {
      first_name: inputs.first_name,
      last_name: inputs.last_name,
      email: inputs.email,
    };

    await axios
      .put("https://reqres.in/api/users", {
        userObject,
      })
      .then(setShowNotification(true));
  };

  return (
    <>
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
              title={"Update User"}
              description={"Change the Fields Below and Update This User."}
              formData={updateFormData}
              handleChange={handleChange}
              submitBtn={"Update"}
              onSubmit={submitUpdateForm}
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
                <Text textAlign={"center"}>User Updated Successfully</Text>
              </Box>
            ) : (
              ""
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateDialogBox;
