export default {
  title: "Errand",
  name: "errand",
  type: "document",
  fields: [
    {
      title: "Avklarad",
      name: "isDone",
      type: "boolean",
    },
    {
      title: "Fakturerad",
      name: "isInvoiced",
      type: "boolean",
    },
    {
      title: "Kunden",
      name: "customer",
      type: "string",
    },
    {
      title: "Beskrivning",
      name: "description",
      type: "text",
    },
    {
      title: "Timmar Tagna",
      name: "hoursTaken",
      type: "number",
    },
    {
      title: "Mil åkt",
      name: "milesDriven",
      type: "number",
    },
    {
      title: "Datum",
      name: "date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
        initialValue: new Date().toISOString(),
      },
    },
  ],
  preview: {
    select: {
      title: "customer",
      subtitle: "date",
    },
  },
};
