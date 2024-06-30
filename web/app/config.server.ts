const required = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable ${key}`);
  }
  return value;
};

export const config = {
  apiUrl: required("API_URL"),
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};
