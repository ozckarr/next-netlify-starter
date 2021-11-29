import { useForm } from "react-hook-form";
import { Button, Input, Stack, Textarea, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function newErrand() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Used for feedback, resets when a new errand is created
  const [isCreated, setIsCreated] = useState(false);

  const onSubmit = (data) => {
    // Auto values
    data.date = new Date().toISOString().slice(0, 10);
    data.isDone = false;
    data.isInvoiced = false;

    //Filled in values
    if (data.hoursTaken === "") {
      data.hoursTaken = 0;
    }
    if (data.milesDriven === "") {
      data.milesDriven = 0;
    }
    // Turn string to number
    data.hoursTaken = parseFloat(data.hoursTaken);
    data.milesDriven = parseFloat(data.milesDriven);

    const _id = "_" + Math.random().toString(36).substr(2, 9);
    fetch("/api/createErrand", {
      method: "POST",
      body: JSON.stringify({ ...data, _id }),
    })
      .then((res) => res.json())
      .then((res) => res.errandSent && setIsCreated(true), reset());
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Stack spacing={3}>
          <Input
            {...register("customer", { required: true })}
            placeholder="Kund"
            isRequired
            onChange={() => setIsCreated(false)}
          />
          {errors.name && <p>Titel krävs.</p>}
          <Textarea
            type="textarea"
            {...register("description")}
            placeholder="Beskrivning"
            onChange={() => setIsCreated(false)}
          />
          <Input
            {...register("hoursTaken")}
            placeholder="Timmar"
            type="number"
            onChange={() => setIsCreated(false)}
          />
          <Input
            {...register("milesDriven")}
            placeholder="Mil"
            type="number"
            onChange={() => setIsCreated(false)}
          />

          {isCreated && <Text color="green">Skickad</Text>}
          <Button colorScheme="blue" type="submit">
            Skicka
          </Button>
        </Stack>
      </form>
    </div>
  );
}
