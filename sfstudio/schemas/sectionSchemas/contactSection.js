// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "contactSection",
  title: "Kontakt Sektion",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Rubrik",
      type: "string",
    },

    {
      name: "contactInfo",
      title: "Kontakt Information",
      type: "array",
      of: [
        {
          name: "data",
          title: "data",
          type: "object",
          fields: [
            {
              title: "Titel",
              name: "title",
              type: "string",
            },
            {
              name: "body",
              title: "Informationen",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "backgroundImage",
    },
  },
};
