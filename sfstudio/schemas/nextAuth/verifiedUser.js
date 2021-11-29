export default {
  name: "verifiedUser",
  title: "⭐ Verifierad Användare",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titel",
      description: "Visas enbart i sidlistan",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description: "Måste vara samma som i ett användar-konto.",
    },
  ],
};
