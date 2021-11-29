import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  Button,
  Box,
  Stack,
  Input,
  Text,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { ChevronUpIcon, DeleteIcon } from "@chakra-ui/icons";

export default function updateSingleErrand({
  data: { _id, date, description, customer, hoursTaken, milesDriven },
  updateView,
  setUpdateView,
  fetchErrands,
  isDeleted,
  setIsDeleted,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      customer: customer,
      date: date,
      description: description,
      hoursTaken: hoursTaken,
      milesDriven: milesDriven,
    },
  });

  const [isUpdated, setIsUpdated] = useState(false);

  const onSubmit = (data) => {
    fetch("/api/updateErrand", {
      method: "PUT",
      body: JSON.stringify({ ...data, _id }),
    })
      .then((res) => res.json())
      .then((res) => res.errandSent && fetchErrands(), setIsUpdated(true));
  };

  const deleteErrand = () => {
    fetch("/api/deleteErrand", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((res) => res.errandSent && setIsDeleted(true));
  };

  return (
    <Box width="93%">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {!isDeleted ? (
          <Stack margin="10px" width="100%">
            <Box display="flex" justifyContent="space-between">
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                fontSize="20px"
                onClick={() => deleteErrand()}
              />
              <Text fontSize="md" color="gray.500">
                {date}
              </Text>
              <IconButton
                icon={<ChevronUpIcon />}
                variant="outline"
                fontSize="20px"
                onClick={() => setUpdateView(!updateView)}
              />
            </Box>

            <Input
              {...register("customer", { required: true })}
              placeholder="Kund"
              isRequired
            ></Input>
            {errors.name && <p>Titel krävs.</p>}
            <Textarea
              type="textarea"
              {...register("description")}
              placeholder="Beskrivning"
            />
            <Input
              type="number"
              placeholder="Mil"
              {...register("hoursTaken")}
            />
            <Input
              type="number"
              placeholder="Timmar"
              {...register("milesDriven")}
            />

            <Input type="date" placeholder="Datum" {...register("date")} />

            {isUpdated && (
              <Text fontSize="md" color="green">
                Uppdaterad
              </Text>
            )}
            <Button colorScheme="blue" type="submit">
              Uppdatera
            </Button>
          </Stack>
        ) : (
          <Text fontSize="sm" color="red" margin="0 0 0 1em">
            Borttagen
          </Text>
        )}
      </form>
    </Box>
  );
}
