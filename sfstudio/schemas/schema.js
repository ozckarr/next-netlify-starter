// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import errand from "./errand";

import siteSettings from "./siteSettings";

import startSection from "./sectionSchemas/startSection";
import spaOchBadSection from "./sectionSchemas/spaOchBadSection";
import anlaggningSection from "./sectionSchemas/anlaggningSection";
import serviceSektion from "./sectionSchemas/serviceSection";
import contactSection from "./sectionSchemas/contactSection";

import account from "./nextAuth/account";
import user from "./nextAuth/user";
import verificationRequest from "./nextAuth/verification-request";
import verifiedUser from "./nextAuth/verifiedUser";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    errand,

    startSection,
    spaOchBadSection,
    anlaggningSection,
    serviceSektion,
    contactSection,
    siteSettings,

    account,
    user,
    verificationRequest,
    verifiedUser,
  ]),
});
