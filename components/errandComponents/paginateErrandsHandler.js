import { useState } from "react";
import {
  Select,
  IconButton,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Text,
  Switch,
  Divider,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import { animateScroll as scroll } from "react-scroll";

function PaginateErrandsHandler({
  totalPages,
  selectPage,
  currentPage,
  setErrandsPerPage,
  setViewMode,
  setViewIsDone,
  viewIsDone,
  setViewIsInvoiced,
  viewIsInvoiced,
  deleteMode,
  setDeleteMode,
}) {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  // Hides placeholder after a option is picked, to avoid `value="null"`-bug
  // PH: short for placeholder
  const [hidePHTotalPages, setHidePHTotalPages] = useState(false);
  const [hidePHViewMode, setHidePHViewMode] = useState(false);
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <IconButton
          icon={<ArrowLeftIcon />}
          variant="outline"
          fontSize="20px"
          onClick={() => selectPage(1)}
        />
        <IconButton
          icon={<ChevronLeftIcon />}
          variant="outline"
          fontSize="20px"
          onClick={() => currentPage - 1 >= 1 && selectPage(currentPage - 1)}
        />

        <Select
          onChange={(e) => selectPage(e.target.value)}
          width="180px"
          value={currentPage}
        >
          {pages.map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </Select>
        <IconButton
          icon={<ChevronRightIcon />}
          variant="outline"
          fontSize="20px"
          onClick={() =>
            currentPage + 1 <= pages.length && selectPage(currentPage + 1)
          }
        />
        <IconButton
          icon={<ArrowRightIcon />}
          variant="outline"
          fontSize="20px"
          onClick={() => selectPage(pages.length)}
        />
      </Box>
      <Box>
        <Accordion allowToggle onClick={() => scroll.scrollToBottom()}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Visningsalternativ
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Stack spacing={2}>
                <Select
                  onChange={(e) => {
                    setErrandsPerPage(e.target.value),
                      scroll.scrollToBottom(),
                      setHidePHTotalPages(true);
                  }}
                  width="100%"
                  placeholder={!hidePHTotalPages && "Antal visade"}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </Select>
                <Select
                  onChange={(e) => {
                    setViewMode(e.target.value),
                      scroll.scrollToBottom(),
                      setHidePHViewMode(true);
                  }}
                  width="100%"
                  placeholder={!hidePHViewMode && "Visningsläge"}
                >
                  <option value="small">Liten</option>
                  <option value="medium">Medium</option>
                  <option value="large">Stor</option>
                </Select>
                <Divider orientation="horizontal" />
                <Box
                  display="flex"
                  justifyContent="space-around"
                  className="checked-handlers"
                >
                  <Switch
                    onChange={() => setViewIsDone("all")}
                    value="all"
                    isChecked={viewIsDone === "all"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    fontSize="sm"
                  >
                    Alla
                  </Switch>
                  <Switch
                    onChange={() => setViewIsDone("checked")}
                    value="checked"
                    isChecked={viewIsDone === "checked"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    fontSize="sm"
                  >
                    Avklarade
                  </Switch>
                  <Switch
                    onChange={() => setViewIsDone("unChecked")}
                    value="unChecked"
                    isChecked={viewIsDone === "unChecked"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    fontSize="sm"
                  >
                    Ej Avklarade
                  </Switch>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  className="checked-handlers"
                >
                  <Switch
                    onChange={() => setViewIsInvoiced("all")}
                    value="all"
                    isChecked={viewIsInvoiced === "all"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    fontSize="sm"
                    colorScheme="green"
                  >
                    Alla
                  </Switch>
                  <Switch
                    onChange={() => setViewIsInvoiced("checked")}
                    value="checked"
                    isChecked={viewIsInvoiced === "checked"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    fontSize="sm"
                    colorScheme="green"
                  >
                    Fakturerade
                  </Switch>
                  <Switch
                    onChange={() => setViewIsInvoiced("unChecked")}
                    value="unChecked"
                    isChecked={viewIsInvoiced === "unChecked"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    fontSize="sm"
                    colorScheme="green"
                  >
                    Ofakturerade
                  </Switch>
                </Box>
                <Divider orientation="horizontal" />
                <Box display="flex" justifyContent="center">
                  <Switch
                    size="md"
                    colorScheme="red"
                    isChecked={deleteMode}
                    onChange={() => setDeleteMode(!deleteMode)}
                  >
                    &nbsp; Delete-läge
                  </Switch>
                  <Text fontSize="lg"></Text>
                </Box>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
}

export default PaginateErrandsHandler;
