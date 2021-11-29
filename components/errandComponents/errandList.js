import {
  Box,
  Stack,
  Select,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { sanityClient } from "../../lib/sanity";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  SearchIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

import PaginateErrands from "./paginateErrands";

export default function ErrandList() {
  const [errandData, setErrandData] = useState(null);
  const [errandsSorted, setErrandsSorted] = useState(null);
  const [sorting, setSorting] = useState("");
  const [search, setSearch] = useState("");
  const [sortingReverse, setSortingReverse] = useState(false);

  useEffect(() => {
    fetchErrands();
  }, []);

  const fetchErrands = () => {
    sanityClient
      .fetch(
        `*[_type == "errand"]{
      _id,
      isDone,
      isInvoiced,
      customer,
      date,
      description,
      hoursTaken,
      milesDriven
  }`
      )
      .then((data) => {
        // When fetched the data is sorded by date. The data duplicated,
        //one for displaying and sorting, the other as a backup to avoid re-fetching
        setErrandData(
          data.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          })
        );
        setErrandsSorted(
          data.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          })
        );
      })
      .catch(console.error);
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    setSortingReverse(false);
    let sortedData = errandsSorted;
    setSorting(value);
    if (value === "customer") {
      sortedData = errandsSorted.sort((a, b) =>
        a.customer.localeCompare(b.customer)
      );
    }
    if (value === "date") {
      sortedData = errandsSorted.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }

    setErrandsSorted(sortedData);
  };

  const handleReverse = () => {
    setSortingReverse(!sortingReverse);
    setErrandsSorted(errandsSorted.reverse());
  };

  // Searches for pieces of a string in description and customer
  const handleSearch = (e) => {
    setSearch(e.target.value);
    let newArray = errandData.filter(
      (errand) =>
        errand.description
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        errand.customer.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setErrandsSorted(newArray);
  };

  return (
    <div>
      <Stack spacing={3}>
        <Stack spacing={3}>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="center" fontSize="sm">
                    <SearchIcon marginLeft="1.4em" />
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Box>
                  <Stack>
                    <InputGroup>
                      <Input placeholder="Sök" onChange={handleSearch} />
                      <InputRightAddon children={<SearchIcon />} />
                    </InputGroup>
                    <Box display="flex" justifyContent="space-between">
                      <Select
                        placeholder="Välj sortering"
                        onChange={handleSelect}
                        width="calc(100% - 50px)"
                      >
                        <option value="customer">Kund</option>
                        <option value="date">Datum</option>
                      </Select>
                      <IconButton
                        icon={
                          sortingReverse ? <ArrowUpIcon /> : <ArrowDownIcon />
                        }
                        variant="outline"
                        fontSize="20px"
                        onClick={handleReverse}
                      />
                    </Box>
                  </Stack>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <IconButton
            icon={<RepeatIcon />}
            variant="outline"
            width="100%"
            colorScheme="green"
            onClick={() => fetchErrands()}
          />
        </Stack>
        <Box display="flex">
          <Text marginLeft="1.4em" fontSize="10px" color="blue">
            Klar
          </Text>
          <Text marginLeft="0.3em" fontSize="10px">
            |
          </Text>
          <Text marginLeft="0.3em" fontSize="10px" color="green">
            Fakturerad
          </Text>
        </Box>

        <Stack spacing={3}>
          {errandsSorted && (
            <PaginateErrands data={errandsSorted} fetchErrands={fetchErrands} />
          )}
        </Stack>
      </Stack>
    </div>
  );
}
