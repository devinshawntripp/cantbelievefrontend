import axios from "axios";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_APP_URL });

// axios.interceptors.request.use((req) => {
//   if (localStorage.getItem("x-auth-token")) {
//     console.log("SETTING THE AUTHORIZATION HEADER");
//     req.headers.Authorization = `Bearer ${JSON.parse(
//       localStorage.getItem("x-auth-token")
//     )}`;
//   }

//   return req;
// });

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const editProduct = (payload) => API.post("/items/UpdateItem", payload);
