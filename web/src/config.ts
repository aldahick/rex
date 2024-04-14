import { getConfigFromAttributes } from "@athenajs/react-utils";

const athenaConfig = getConfigFromAttributes(import.meta.env);

export const config = {
  apiUrl: athenaConfig.API_URL,
  basePath: athenaConfig.BASE_PATH,
  googleClientId: athenaConfig.GOOGLE_CLIENT_ID,
};
