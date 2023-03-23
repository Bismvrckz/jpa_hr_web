import axios from "axios";
// require("dotenv").config();

export const API_URL = "http://localhost:3000";

const axiosInstance = axios.create({ baseURL: API_URL });

export default axiosInstance;
