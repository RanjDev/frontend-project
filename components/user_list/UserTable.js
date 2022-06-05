import {
  ArrowBackIcon,
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Box,
  Text,
  IconButton,
  useDisclosure,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import UpdateDialogBox from "../Form/UpdateDialogBox";
import { useToast } from "@chakra-ui/react";

import axios from "axios";
import useSWR from "swr";

import useSetSelectUser from "../../store/store";

function UserTable() {
  const [pageIndex, setPageIndex] = React.useState(1);
  const [userToEdit, setUserToEdit] = React.useState(1);

  React.useEffect(() => {
    if (pageIndex < 1) {
      setPageIndex(1); // because 1 is the first page
    }
    if (pageIndex > 2) {
      setPageIndex(2); //because 2 is currently the number of pages
    }
  }, [pageIndex]);

  const address = `https://reqres.in/api/users?page=${pageIndex}`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  // State Management
  const setUser = useSetSelectUser((state) => state.setUser);
  const selectUser = useSetSelectUser((state) => state.user);
  const clearUser = useSetSelectUser((state) => state.clearUser);

  // to control which user is selected in the checkbox
  const [selectedUser, setSelectedUser] = React.useState(selectUser.id);
  // end of state management

  if (error) <Text>Error</Text>;
  if (!data) {
    <Text>Loading...</Text>;
  }

  if (data)
    return (
      <Box display={"flex"} flexDirection={"column"}>
        <TableContainer w={"100%"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>ID</Th>
                <Th>Avatar</Th>
                <Th>Email</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.data.map((user) => {
                return (
                  <Tr key={user.id}>
                    <Td>
                      <Checkbox
                        isChecked={selectedUser == user.id ? true : false}
                        onChange={() => {
                          if (selectedUser !== user.id) {
                            setUser(user);
                            setSelectedUser(user.id);
                          } else {
                            clearUser();
                            setSelectedUser();
                          }
                        }}
                      />
                    </Td>
                    <Td>{user.id}</Td>
                    <Td>
                      <Image
                        src={user.avatar}
                        alt={"Avatar Image"}
                        boxSize={"25"}
                        rounded={"full"}
                      />
                    </Td>
                    <Td>{user.email}</Td>
                    <Td>{user.first_name}</Td>
                    <Td>{user.last_name}</Td>
                    <Td>
                      <Box display={"flex"} gap={"1"}>
                        <IconButton
                          onClick={async () => {
                            await axios
                              .delete(`https://reqres.in/api/users/${user.id}`)
                              .then(
                                toast({
                                  title: `User "${user.first_name}" Deleted`,
                                  status: "error",
                                  duration: 3000,
                                  isClosable: true,
                                })
                              );
                          }}
                          bg={{}}
                          aria-label="Delete User"
                          icon={<DeleteIcon color={"#FF5555"} />}
                        />
                        <IconButton
                          onClick={() => {
                            setUserToEdit(user.id);
                            onOpen();
                          }}
                          bg={{}}
                          aria-label="Edit User"
                          icon={<EditIcon color={"#2E9BFF"} />}
                        />

                        <Link href={`/user/${user.id}`}>
                          <IconButton
                            onClick={() => {
                              setSelectedUser(user.id);
                              setUser(user);
                            }}
                            bg={{}}
                            aria-label="View User"
                            icon={<ViewIcon color={"#6F6F6F"} />}
                          />
                        </Link>
                      </Box>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        {/* Pagination Area */}
        <Box
          alignSelf={"end"}
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          my={"10"}
          px={"4"}
          rounded={"4"}
          bg={"#667080"}
          color={"#FFF"}
          w={"100px"}
        >
          <Button onClick={() => setPageIndex(pageIndex - 1)} bg={"none"}>
            <ArrowBackIcon />
          </Button>
          <Text>{pageIndex}</Text>
          <Button onClick={() => setPageIndex(pageIndex + 1)} bg={"none"}>
            <ArrowForwardIcon />
          </Button>
        </Box>

        <UpdateDialogBox
          isOpen={isOpen}
          onClose={onClose}
          userId={userToEdit}
        />
      </Box>
    );
}

export default UserTable;
