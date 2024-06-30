const required = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable ${key}`);
  }
  return value;
};

const apiUrl = required("API_URL");
export const config = {
  apiUrl,
  publicApiUrl: process.env.PUBLIC_API_URL || apiUrl,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};
