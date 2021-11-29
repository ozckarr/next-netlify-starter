import NewErrand from "../components/errandComponents/newErrand";
import ErrandList from "../components/errandComponents/errandList";
import { ChakraProvider } from "@chakra-ui/react";
import Loading from "../components/loading";
import NewUser from "../components/newUser";

import { sanityClient } from "../lib/sanity";

import { useState, useEffect } from "react";
import { signUp } from "../modules/signUp";

import { useSession, signIn, signOut } from "next-auth/client";

import {
  Box,
  Tabs,
  Button,
  TabList,
  TabPanels,
  Text,
  Stack,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function errandApp() {
  const [checkUser, setCheckUser] = useState("");
  const [email, setEmail] = useState("");

  const [session, loading] = useSession();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await signUp({
      email,
      password,
      name,
    });

    await signIn(null, {
      callbackUrl: `${process.env.NEXT_PUBLIC_URL}/app`,
    });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    await signIn(null, {
      callbackUrl: `${process.env.NEXT_PUBLIC_URL}/app`,
    });
  };

  useEffect(() => {
    if (session) {
      sanityClient
        .fetch(
          `*[ _type == "verifiedUser" && email == "${session.user.email}" ]{
            }`
        )
        .then((data) => {
          setCheckUser(data);
        })
        .catch(console.error);
    }
  }, [session]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="errandsContainer">
        <ChakraProvider>
          {!session ? (
            <div>
              <form onSubmit={handleSubmitSignIn}>
                <Stack placing={2} margin="2em">
                  <Button width="100%" type="submit">
                    Logga in
                  </Button>
                </Stack>
              </form>
              <NewUser />
            </div>
          ) : checkUser.length ===
            0 /*TODO: if empty (equal 0) === no verified user */ ? (
            <>
              <Loading />
              <Text textAlign="center" margin="0 0 3em 0">
                Kontakta Admin för verifiering
              </Text>
              <Button
                margin="2em"
                width="calc( 100% - 4em)"
                onClick={() => signOut()}
              >
                Logga ut
              </Button>
            </>
          ) : (
            <Tabs variant="enclosed">
              <TabList>
                <Tab>NY</Tab>
                <Tab>Ärenden</Tab>
                <Box display="flex" justifyContent="flex-end" width="100%">
                  <Tab onClick={() => signOut()}>Logga ut</Tab>
                </Box>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* ErrandList*/}
                  <NewErrand />
                </TabPanel>
                <TabPanel>
                  {/* ErrandList*/}
                  <ErrandList />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
          {/* Page down here */}
        </ChakraProvider>
      </div>
    </>
  );
}
