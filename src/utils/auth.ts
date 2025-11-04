import { Interface__User } from "@/constants/interfaces";
import { getStorage, removeStorage, setStorage } from "@/utils/client";

export function getAuthToken() {
  return getStorage("__auth_token") || null;
}

export function setAuthToken(token: string, expireInMs?: number) {
  setStorage("__auth_token", token, "local", expireInMs);
}

export function clearAuthToken() {
  removeStorage("__auth_token");
}

export function getUserData(): Interface__User | null {
  const raw = getStorage("__user_data");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse user data:", e);
    return null;
  }
}

export function setUserData(data: Record<string, any>) {
  try {
    setStorage("__user_data", JSON.stringify(data));
  } catch (e) {
    console.error("Failed to stringify user data:", e);
  }
}

export function clearUserData() {
  removeStorage("__user_data");
}
