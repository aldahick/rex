const required = (key: string): string => {
  const envKey = `VITE_${key}`;
  const attribute = `env-${key.split("_").join("-").toLowerCase()}`;
  const value =
    import.meta.env[envKey] ?? document.body.getAttribute(attribute);
  if (!value) {
    document.body.removeAttribute(attribute);
    throw new Error(`Missing required config variable ${key}`);
  }
  return value;
};

export const config = {
  apiUrl: required("API_URL"),
  basePath: required("BASE_PATH"),
  googleClientId: required("GOOGLE_CLIENT_ID"),
};
