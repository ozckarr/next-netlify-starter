// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      title: "Visade ärenden",
      name: "errandsPerPage",
      description:
        "Startantal av visade ärenden per sida. (Går att ändra under användning, det är bara ett standardvärde.)",
      type: "number",
      options: {
        list: [5, 10, 15, 20, 25],
      },
    },
    {
      title: "Visningsstorlek i listan",
      name: "viewMode",
      description:
        "Startstorlek av visade ärenden på sida. (Går att ändra under användning, det är bara ett standardvärde.)",
      type: "string",
      options: {
        list: [
          { title: "Liten", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Stor", value: "large" },
        ],
      },
    },
    {
      name: "logo",
      title: "Logo Vanlig",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "whiteLogo",
      title: "Logo Vit",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
