import React from "react";

import { useState } from "react";
import { signUp } from "../modules/signUp";

import { signIn } from "next-auth/client";

import {
  Box,
  Button,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
} from "@chakra-ui/react";

export default function loading() {
  const [email, setEmail] = useState("");
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

  return (
    <Box>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Ny Användare
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <form onSubmit={handleSubmit}>
              <Stack>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button width="100%" type="submit">
                  Skapa användare
                </Button>
              </Stack>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
