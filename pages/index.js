import Head from "next/head";
import UserList from "../components/user_list/UserList";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>User List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UserList />
      </main>
    </div>
  );
}
