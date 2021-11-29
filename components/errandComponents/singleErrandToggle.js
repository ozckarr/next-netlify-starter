import { useState } from "react";
import { Box } from "@chakra-ui/react";

import SingleErrand from "./singleErrand";
import UpdateSingeErrand from "./updateSingeErrand";

export default function SingleErrandToggle({
  data,
  fetchErrands,
  viewMode,
  deleteMode,
}) {
  const [updateView, setUpdateView] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteErrand = () => {
    const _id = data._id;
    fetch("/api/deleteErrand", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((res) => res.errandSent && setIsDeleted(true));
  };

  return (
    <Box
      w="100%"
      borderWidth="1px"
      borderColor="gray.300"
      display="flex"
      justifyContent="space-between"
    >
      {updateView ? (
        <UpdateSingeErrand
          data={data}
          updateView={updateView}
          setUpdateView={setUpdateView}
          fetchErrands={fetchErrands}
          isDeleted={isDeleted}
          setIsDeleted={setIsDeleted}
        />
      ) : (
        <SingleErrand
          data={data}
          updateView={updateView}
          setUpdateView={setUpdateView}
          viewMode={viewMode}
          isDeleted={isDeleted}
          deleteMode={deleteMode}
          deleteErrand={deleteErrand}
        />
      )}
    </Box>
  );
}
