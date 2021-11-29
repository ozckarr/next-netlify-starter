import { useState } from "react";

import {
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Accordion,
  Text,
  Box,
  Stack,
  Checkbox,
  IconButton,
  Center,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export default function SingleErrand({
  data: {
    _id,
    isDone,
    isInvoiced,
    date,
    description,
    customer,
    hoursTaken,
    milesDriven,
  },
  data,
  updateView,
  setUpdateView,
  viewMode,
  deleteMode,
  deleteErrand,
  isDeleted,
}) {
  const [localIsDone, setLocalIsDone] = useState(isDone);
  const [localIsInvoiced, setLocalIsInvoiced] = useState(isInvoiced);

  const errandIsDone = (result) => {
    data.isDone = result;
    fetch("/api/errandIsDone", {
      method: "PUT",
      body: JSON.stringify({ ...data, _id }),
    }).then((res) => res.json());
  };

  const errandIsInvoiced = (result) => {
    data.isInvoiced = result;
    fetch("/api/errandIsInvoiced", {
      method: "PUT",
      body: JSON.stringify({ ...data, _id }),
    }).then((res) => res.json());
  };

  return !isDeleted ? (
    <Box width="100%">
      {/* small */}
      {viewMode === "small" && (
        <Box display="flex" justifyContent="space-between">
          <Box width="100%">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" width="70%">
                      <Box display="flex">
                        {deleteMode && (
                          <Center>
                            <IconButton
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              fontSize="18px"
                              size="sm"
                              margin="0 0.5em 0 0"
                              onClick={() => deleteErrand()}
                            />
                          </Center>
                        )}
                        <Checkbox
                          isChecked={localIsDone}
                          margin="0 0.5em 0 0"
                          size="lg"
                          onChange={() => {
                            setLocalIsDone(!localIsDone),
                              errandIsDone(!localIsDone);
                          }}
                        ></Checkbox>
                        <Checkbox
                          isChecked={localIsInvoiced}
                          margin="0 0.5em 0 0"
                          size="lg"
                          colorScheme="green"
                          onChange={() => {
                            setLocalIsInvoiced(!localIsInvoiced),
                              errandIsInvoiced(!localIsInvoiced);
                          }}
                        ></Checkbox>
                        <Text fontSize="large" noOfLines>
                          {customer}
                        </Text>
                      </Box>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Stack spacing={3}>
                      <Text fontSize="sm" color="gray.500">
                        {date}
                      </Text>
                      <Text>{description} </Text>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        borderTop="1px"
                        paddingTop="0.3em"
                        borderColor="gray.300"
                      >
                        <Box display="flex">
                          <Text fontSize="small" noOfLines>
                            {milesDriven} mil &nbsp;&nbsp;
                          </Text>
                          <Text fontSize="small" noOfLines>
                            {hoursTaken} h
                          </Text>
                        </Box>

                        <IconButton
                          colorScheme="blue"
                          onClick={() => setUpdateView(!updateView)}
                          icon={<EditIcon />}
                          isRound
                        />
                      </Box>
                    </Stack>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      )}

      {/* Medium */}
      {viewMode === "medium" && (
        <Box display="flex" justifyContent="space-between">
          <Box width="100%">
            <Accordion allowToggle width="100%">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      display="flex"
                      flexDirection={deleteMode ? "column" : "row"}
                    >
                      {deleteMode && (
                        <Center>
                          <IconButton
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            fontSize="18px"
                            size="sm"
                            margin="0 0.5em 0 0"
                            onClick={() => deleteErrand()}
                          />
                        </Center>
                      )}
                      <Checkbox
                        isChecked={localIsDone}
                        margin={deleteMode ? "0.2em 0 0 0.4em" : "0 0.5em 0 0"}
                        size="lg"
                        onChange={() => {
                          setLocalIsDone(!localIsDone),
                            errandIsDone(!localIsDone);
                        }}
                      ></Checkbox>
                      <Checkbox
                        isChecked={localIsInvoiced}
                        margin={deleteMode ? "0.2em 0 0 0.4em" : "0 0.5em 0 0"}
                        size="lg"
                        colorScheme="green"
                        onChange={() => {
                          setLocalIsInvoiced(!localIsInvoiced),
                            errandIsInvoiced(!localIsInvoiced);
                        }}
                      ></Checkbox>
                    </Box>
                    <Box flex="1" textAlign="left" width="70%">
                      <Box>
                        <Text fontSize="large" noOfLines>
                          {customer}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {date}
                        </Text>
                      </Box>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Stack spacing={3}>
                      <Text>{description} </Text>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        borderTop="1px"
                        paddingTop="0.3em"
                        borderColor="gray.300"
                      >
                        <Box display="flex">
                          <Text fontSize="small" noOfLines>
                            {milesDriven} mil &nbsp;&nbsp;
                          </Text>
                          <Text fontSize="small" noOfLines>
                            {hoursTaken} h
                          </Text>
                        </Box>
                        <IconButton
                          colorScheme="blue"
                          onClick={() => setUpdateView(!updateView)}
                          icon={<EditIcon />}
                          isRound
                        />
                      </Box>
                    </Stack>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      )}

      {/* Large */}
      {viewMode === "large" && (
        <Box display="flex" justifyContent="space-between">
          <Box width="100%">
            <Accordion allowToggle width="100%">
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton>
                        <Box
                          display="flex"
                          flexDirection={deleteMode ? "column" : "row"}
                        >
                          {deleteMode && (
                            <Center>
                              <IconButton
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                fontSize="18px"
                                size="sm"
                                margin="0 0.5em 0 0"
                                onClick={() => deleteErrand()}
                              />
                            </Center>
                          )}
                          <Checkbox
                            isChecked={localIsDone}
                            margin={
                              deleteMode ? "0.2em 0 0 0.4em" : "0 0.5em 0 0"
                            }
                            size="lg"
                            onChange={() => {
                              setLocalIsDone(!localIsDone),
                                errandIsDone(!localIsDone);
                            }}
                          ></Checkbox>
                          <Checkbox
                            isChecked={localIsInvoiced}
                            margin={
                              deleteMode ? "0.2em 0 0 0.4em" : "0 0.5em 0 0"
                            }
                            size="lg"
                            colorScheme="green"
                            onChange={() => {
                              setLocalIsInvoiced(!localIsInvoiced),
                                errandIsInvoiced(!localIsInvoiced);
                            }}
                          ></Checkbox>
                        </Box>
                        <Box flex="1" textAlign="left" width="70%">
                          <Box>
                            <Text fontSize="large" noOfLines>
                              {customer}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {date}
                            </Text>
                            <Text
                              fontSize={isExpanded ? "large" : "small"}
                              maxHeight={isExpanded ? "100%" : "10em"}
                              overflow="scroll"
                            >
                              {description}
                            </Text>
                            {!isExpanded && (
                              <Box
                                display="flex"
                                borderTop="1px"
                                marginTop="0.3em"
                                paddingTop="0.3em"
                                borderColor="gray.300"
                              >
                                <Text fontSize="md" noOfLines>
                                  {milesDriven} mil &nbsp;&nbsp;
                                </Text>
                                <Text fontSize="md" noOfLines>
                                  {hoursTaken} h
                                </Text>
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Box>
                        <Stack spacing={3}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            borderTop="1px"
                            marginTop="0.3em"
                            paddingTop="0.3em"
                            borderColor="gray.300"
                          >
                            <Box display="flex" marginLeft="3.5em">
                              <Text fontSize="md" noOfLines>
                                {milesDriven} mil &nbsp;&nbsp;
                              </Text>
                              <Text fontSize="md" noOfLines>
                                {hoursTaken} h
                              </Text>
                            </Box>
                            <IconButton
                              colorScheme="blue"
                              onClick={() => setUpdateView(!updateView)}
                              icon={<EditIcon />}
                              isRound
                            />
                          </Box>
                        </Stack>
                      </Box>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      )}
    </Box>
  ) : (
    <Text fontSize="sm" color="red" margin="0 0 0 1em">
      Borttagen
    </Text>
  );
}
