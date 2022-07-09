import { TOKEN } from "../utils/utils";

/**
 * It sets the token in local storage and retrieves it.
 */
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN);
}