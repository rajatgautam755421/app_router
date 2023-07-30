export const setUserCookie = (user) => {
  if (user) {
    let cookie = `user=${JSON.stringify(user)};`;
    cookie += "path=/;";
    cookie += `max-age=${60 * 60 * 24 * 365};`;

    document.cookie = cookie;
  } else {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

export function getCookieValueInClient(cookieName) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }

  return null;
}
