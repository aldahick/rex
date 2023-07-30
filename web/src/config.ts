const optional = (key: string): string | undefined => {
  const envKey = `VITE_${key}`;
  const attribute = `env-${key.split("_").join("-").toLowerCase()}`;
  const envValue = import.meta.env[envKey];
  const attrValue = document.body.getAttribute(attribute);
  if (!attrValue) {
    document.body.removeAttribute(attribute);
  }
  return envValue ?? attrValue;
};

const required = (key: string): string => {
  const value = optional(key);
  if (!value) {
    throw new Error(`Missing required config variable ${key}`);
  }
  return value;
};

export const config = {
  apiUrl: required("API_URL"),
  basePath: required("BASE_PATH"),
  googleClientId: optional("GOOGLE_CLIENT_ID"),
};
