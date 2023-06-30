const required = (key: string): string => {
  const value =
    import.meta.env[`VITE_${key}`] ??
    document.body.getAttribute(`env-${key.split("_").join("-").toLowerCase()}`);
  if (!value) {
    throw new Error(`Missing required config variable ${key}`);
  }
  return value;
};

export const config = {
  apiUrl: required("API_URL"),
  basePath: required("BASE_PATH"),
  googleClientId: required("GOOGLE_CLIENT_ID"),
};
