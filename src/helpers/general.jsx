export const setUserCookie = (token) => {
  if (token) {
    let cookie = `user=${token};`;
    cookie += "path=/;";
    cookie += `max-age=${60 * 60 * 24 * 365};`;

    document.cookie = cookie;
  } else {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

export function getCookieValueInClient(cookieName) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}
