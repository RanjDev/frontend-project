import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { Text, Button, Container, Image, Flex } from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";

function UserDetail() {
  const router = useRouter();
  const userId = router.query.id;

  const address = `https://reqres.in/api/users/${userId}`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) <Text>Error</Text>;
  if (!data) <Text>Loading...</Text>;

  if (data)
    return (
      <>
        <Head>
          <title>User Detail</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Container
            mt={"20"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"4"}
          >
            <Image
              src={data.data.avatar}
              alt={"Avatar Image"}
              boxSize={"250"}
              rounded={"full"}
            />
            <Text fontSize={"24"} fontWeight={"semibold"}>
              {data.data.first_name}
            </Text>
            <Text fontSize={"12"}>{data.data.email}</Text>
            <Button
              onClick={() => {
                router.back();
              }}
            >
              <Flex justifyContent={"center"} alignItems={"center"} gap={"2"}>
                <ArrowBackIcon color={"#667080"} />
                <Text color={"#667080"}>Back To Users List</Text>
              </Flex>
            </Button>
          </Container>
        </main>
      </>
    );
}

export default UserDetail;
