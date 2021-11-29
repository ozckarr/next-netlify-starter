import React from "react";

import { Center, Box, Spinner } from "@chakra-ui/react";

function loading() {
  return (
    <Center width="100%" height="30vh">
      <img src="/loading.gif" alt="loading" />
    </Center>
  );
}

export default loading;
