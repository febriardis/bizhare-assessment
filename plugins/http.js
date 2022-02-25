import Vue from "vue";
import axios from "axios";

const HTTP = axios.create({
  baseURL: "http://sandbox.bizharedev.id:17001", 
  headers: {}
});

// before a request is made start the nprogress
HTTP.interceptors.request.use(config => {
  return config;
});

// before a response is returned stop nprogress
HTTP.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // error interceptor
    const data = error;
    console.log("error", data);
    return Promise.reject(error);
  }
);

Vue.prototype.$http = HTTP;
export { HTTP };
