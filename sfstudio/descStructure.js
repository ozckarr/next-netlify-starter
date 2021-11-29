// Structures the UI in the studio.
// Used here to remove the option to add more sections

import S from "@sanity/desk-tool/structure-builder";

// prettier-ignore
// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  S.list()
    .title("Content")
    .items(
      [

        S.listItem()
        .title("Settings")
        .child(
          S.document()
            .schemaType("siteSettings").documentId("siteSettings")),
      
      S.divider(),



        /**
         * Sections
         */
        // To add singleton Section copy and paste this > and replace schema
        S.listItem()
          .title("Start")
          .child(
            S.document()
              .schemaType("startSection").documentId("startSection")
          ),
        // To here. To remove multiple-option filter it out below in documentTypeListItems()
  
        S.listItem()
          .title("Spa Och Bad")
          .child(
              S.document()
                  .schemaType("spaOchBadSection").documentId("spaOchBadSection")),
                  
        S.listItem()
          .title("Anläggning")
          .child(
            S.document()
              .schemaType("anlaggningSection").documentId("anlaggningSection")),
  
      S.listItem()
          .title("Service")
          .child(
              S.document()
                  .schemaType("serviceSection").documentId("serviceSection")),
  
      S.listItem()
        .title("Kontakt")
        .child(
          S.document()
            .schemaType("contactSection").documentId("contactSection")),
        
      S.divider(),
      

        ...S.documentTypeListItems()
          .filter((item) => !["startSection"].includes(item.getId()))
          .filter((item) => !["spaOchBadSection"].includes(item.getId()))
          .filter((item) => !["anlaggningSection"].includes(item.getId()))
          .filter((item) => !["serviceSection"].includes(item.getId()))
          .filter((item) => !["contactSection"].includes(item.getId()))
          
          .filter((item) => !["siteSettings"].includes(item.getId())),
      ]
    );
