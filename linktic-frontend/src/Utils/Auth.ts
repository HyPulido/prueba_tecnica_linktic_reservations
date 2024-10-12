import { jwtDecode } from "jwt-decode";
import { UsersItems } from "../models/Users";
import { env } from "./Environment";
import * as MarketsmsService from "../services/LinkticService";
import { showToastTC } from "./BaseApp";

export function userLogout() {
  MarketsmsService.logout().then((response) => {
    if (response.status === 200 || response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("base_user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("base_access_token");
      localStorage.removeItem("default_account");
      window.location.href = "/login";
    } else {
      showToastTC('unable to log out', 2000, 'error');
    }
  })
}

export const isUserLogin = (): boolean => {
  const base_access_token = getBaseToken()
  if (base_access_token !== null && base_access_token !== "") {
    if (isValidToken(base_access_token)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function saveLogin(token: string) {
  saveBaseToken(token)
  saveToken(token)
}

export function saveLoginUser(user: UsersItems) {
  localStorage.setItem("base_user", JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
}

export function saveLoginAsUser(user: UsersItems) {
  localStorage.setItem("user", JSON.stringify(user));
}

export const getBaseUser = (): UsersItems | null => {
  const user = localStorage.getItem("base_user") ? JSON.parse(localStorage.getItem("base_user") + "") : null;
  return user;
}

export const getUser = (): UsersItems | null => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") + "") : null;
  return user;
}

export const isAdmin = (): boolean => {
  const user = getBaseUser()
  if (user?.roles_id === 1) {
    return true;
  } else {
    return false;
  }
}

export function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function saveBaseToken(token: string) {
  localStorage.setItem("base_access_token", token);
}

export function getToken() {
  return localStorage.getItem("access_token") ?? "";
}

export function getBaseToken() {
  return localStorage.getItem("base_access_token") ?? "";
}

export function verifyRefreshToken(token: string) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp) {
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    if (((timeUntilExpiration / 1000) / 60) < parseInt(env('INACTIVITY_SESSION_TIME'))) {
      return 1;
    } else {
      return 0;
    }
  }
}

export const isValidToken = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode(token) as { exp?: number };
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp !== undefined && decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};