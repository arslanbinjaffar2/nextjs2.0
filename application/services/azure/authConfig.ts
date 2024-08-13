import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "8a1cc510-bb0a-4124-a345-d4339447de1e",
        authority: "https://login.microsoftonline.com/organizations",
        redirectUri: "https://apidev.eventbuizz.com/login/azure/callback",
    },
    cache: {
        cacheLocation: "sessionStorage", // or "localStorage"
        storeAuthStateInCookie: false, // set to true if you encounter issues on IE/Edge
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);