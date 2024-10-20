export const config = {
  apiUrl: location.hostname === "localhost" ? "http://localhost:8080" : "/api",
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
};
