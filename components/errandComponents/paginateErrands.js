import { useState, useEffect } from "react";
import SingleErrandToggle from "./singleErrandToggle";
import PaginateErrandsHandler from "./paginateErrandsHandler";
import { sanityClient } from "../../lib/sanity";

function PaginateErrands({ data, fetchErrands }) {
  const [settings, setSettings] = useState(null);

  const [errandsPerPage, setErrandsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState("small");

  const [viewIsDone, setViewIsDone] = useState("all");
  const [viewIsInvoiced, setViewIsInvoiced] = useState("all");

  const [filteredData, setFilteredData] = useState(data);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings"]{
            errandsPerPage,
            viewMode
          }`
      )
      .then((data) => {
        setSettings(data[0]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setErrandsPerPage(settings ? settings.errandsPerPage : 10);

    setViewMode(settings ? settings.viewMode : "small");
  }, [settings]);

  // Filter the list by checked and unChecked
  useEffect(() => {
    if (viewIsDone === "all") {
      setFilteredData(data);
    }

    // hides everything checked
    if (viewIsDone === "checked") {
      setFilteredData(data.filter((errand) => errand.isDone === true));
    }

    // hides unChecked
    if (viewIsDone === "unChecked") {
      setFilteredData(data.filter((errand) => errand.isDone === false));
    }
  }, [viewIsDone, data]);

  // Filter the list by checked and unChecked
  useEffect(() => {
    if (viewIsInvoiced === "all") {
      setFilteredData(data);
    }

    // hides everything checked
    if (viewIsInvoiced === "checked") {
      setFilteredData(data.filter((errand) => errand.isInvoiced === true));
    }

    // hides unChecked
    if (viewIsInvoiced === "unChecked") {
      setFilteredData(data.filter((errand) => errand.isInvoiced === false));
    }
  }, [viewIsInvoiced, data]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / errandsPerPage));
  }, [filteredData, data]);

  const startIndex = (page - 1) * errandsPerPage;
  const slicedList = filteredData.slice(
    startIndex,
    startIndex + errandsPerPage
  );

  const selectPage = (num) => {
    setPage(num);
  };

  return (
    <>
      {slicedList.map((errand) => (
        <SingleErrandToggle
          key={errand._id}
          data={errand}
          fetchErrands={fetchErrands}
          viewMode={viewMode}
          deleteMode={deleteMode}
        />
      ))}
      <PaginateErrandsHandler
        currentPage={page}
        totalPages={totalPages}
        selectPage={selectPage}
        setErrandsPerPage={setErrandsPerPage}
        setViewMode={setViewMode}
        setViewIsDone={setViewIsDone}
        viewIsDone={viewIsDone}
        viewIsInvoiced={viewIsInvoiced}
        setViewIsInvoiced={setViewIsInvoiced}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
      />
    </>
  );
}

export default PaginateErrands;
