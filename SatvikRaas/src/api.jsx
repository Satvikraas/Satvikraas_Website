import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080"
  baseURL: "http://15.207.46.61:8080",

  // , // Backend URL
  withCredentials: true, // Allows cookies to be sent
  headers: {
    "Content-Type": "application/json", // JSON requests
  },
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302; // Accepts 302 as valid
  },
});

export default api;
