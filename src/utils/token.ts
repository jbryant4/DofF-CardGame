import jwt from 'jsonwebtoken';

export function generateJWTToken(userName: string, expiresIn = '30 days') {
  // Replace 'YOUR_SECRET_KEY_ENV_VARIABLE' with the actual name of your environment variable
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!secretKey) {
    throw new Error(
      'Secret key not provided. Ensure that your environment variable is set.'
    );
  }

  // Create the token with the user ID and an expiration time
  return jwt.sign({ userName }, secretKey, { expiresIn });
}

export function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export function getCookie(cookieName: string) {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();

    // Check if this cookie starts with the specified name
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null; // Return null if the cookie is not found
}
