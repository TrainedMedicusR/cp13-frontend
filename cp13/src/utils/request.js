import axios from 'axios'
import router from "../router";

const service = axios.create({
  baseURL: "http://"+location.hostname+":8000", // api base_url
  timeout: 15000,
});

// request interceptor
service.interceptors.request.use(function(response){
  response.headers["Content-Type"] = 'application/json';
  return response
}, function (error) {
  return Promise.reject(error);
})

service.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error) {
      if (!error.response) {
        return console.log('Error', error.response);
      }
      const status = error.response.status;
      const errorText = error.response.data.message;

      if (status === 404) {
        router.push({name:'NotFound'})
      } else if (status === 500 || status === 501) {
        return error;
      } else {
        console.log(errorText);
      }
    }
    // throw error;
    return Promise.reject(error);
  }
);

export default service
