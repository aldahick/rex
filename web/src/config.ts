const makeAttributeName = (key: string): string =>
  `env-${key.split("_").join("-").toLowerCase()}`;

const optional = (key: string): string | undefined => {
  const envKey = `VITE_${key}`;
  const attribute = makeAttributeName(key);
  return import.meta.env[envKey] ?? document.body.getAttribute(attribute);
};

const required = (key: string): string => {
  const value = optional(key);
  if (!value) {
    document.body.removeAttribute(makeAttributeName(key));
    throw new Error(`Missing required config variable ${key}`);
  }
  return value;
};

export const config = {
  apiUrl: required("API_URL"),
  basePath: required("BASE_PATH"),
  googleClientId: optional("GOOGLE_CLIENT_ID"),
};
