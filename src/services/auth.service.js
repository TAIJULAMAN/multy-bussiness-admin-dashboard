import { decodeAuthToken } from "../Utils/decode-access-token";
import { getFromLocalStorage, getRemoveLocalStorage, setToLocalStorage } from "../Utils/local-storage";
// import { getFromLocalStorage, setToLocalStorage } from "../Utils/local-storage";

// Store user info in localStorage
export const storeUserInfo = (userData) => {
  setToLocalStorage("userData", JSON.stringify(userData));
};

// Retrieve user data from localStorage
export const getUserData = () => {
  const userData = getFromLocalStorage("userData");
  return userData ? JSON.parse(userData) : null;
};
// Store user token in localStorage
export const storeUserToken = ({ accessToken }) => {
  if (accessToken) {
    setToLocalStorage("accessToken", accessToken);
  }
};
// Retrieve user token from localStorage
export const getUserToken = () => {
  const token = getFromLocalStorage("accessToken");
  if (!token) {
    console.error("Authorization token is missing or invalid.");
    return "";
  }
  return token;
};

export const storeResetToken = ({ resetToken }) => {
  if (resetToken) {
    setToLocalStorage("resetToken", resetToken);
  }
};

export const getResetToken = () => {
  const token = getFromLocalStorage("resetToken");
  if (!token) {
    console.error("Reset token is missing or invalid.");
    return "";
  }
  return token;
};

// Retrieve user info (decoded token) from localStorage
export const getUserInfo = () => {
  const authToken = getFromLocalStorage("accessToken");
  if (authToken) {
    try {
      const decodedData = decodeAuthToken(authToken);
      return decodedData;
    } catch (error) {
      console.error("Error decoding the token:", error);
      removeAccessToken(); // Cleanup invalid token
      return null; // Gracefully return null if decoding fails
    }
  }
  return null; // If no token is found, return null
};

// Check if the user is logged in
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("accessToken");
  return !!authToken; // Returns true if token exists
};

// Remove the access token from localStorage
export const removeAccessToken = () => {
  return getRemoveLocalStorage("accessToken");
};

// Remove all user info from localStorage
export const clearUserInfo = () => {
  getRemoveLocalStorage("accessToken");
  getRemoveLocalStorage("userData");
};
