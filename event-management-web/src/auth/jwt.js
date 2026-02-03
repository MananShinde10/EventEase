export const parseJwt = (token) => {
  if (!token) return null;
  const base64 = token.split(".")[1];
  return JSON.parse(atob(base64));
};
