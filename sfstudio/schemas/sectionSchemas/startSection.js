// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "startSection",
  title: "Start Sektion",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Rubrik",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "backgroundImage",
      title: "Bakgrundsbild",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "backgroundImage",
    },
  },
};
