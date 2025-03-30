import {BaseApiUrl , ApiUrl} from "../utils/constants"
const BaseApi = BaseApiUrl // "https://api.satvikraas.com/api"
import axios from "axios";

//--------------------------------------------------------------------------------
// Fetch all products from the API
export const fetchProductsAPI = async () => {
    try {
      const response = await fetch(`${BaseApi}/public/getAllProducts`);
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        console.log("fetched products");
        return data.data; // Return product array
      } else {
        console.error("Invalid API response format:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

//--------------------------------------------------------------------------------


const api = axios.create({
  // baseURL: "http://localhost:8080"
  // baseURL: "https://15.207.46.61:443",
  baseURL: "https://api.satvikraas.com:443",
  // baseURL: "http://localhost:8080",

  // , // Backend URL
  withCredentials: true, // Allows cookies to be sent
  headers: {
    "Content-Type": "application/json", // JSON requests
  },
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302; // Accepts 302 as valid
  },
});

export default api; // Ensure this is present