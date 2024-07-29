import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "8a1cc510-bb0a-4124-a345-d4339447de1e",
        authority: "https://login.microsoftonline.com/organizations",
        redirectUri: "http://localhost:3001/azure-entra-id/auth/login",
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);