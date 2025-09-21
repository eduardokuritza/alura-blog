import axios from "axios";
import qs from "qs";

export const prepareParams = (options: unknown) => {
  const params = {
    params: options,
    paramsSerializer: (params: unknown) => {
      return qs.stringify(params);
    }
  };

  return params;
};

const api = axios.create({
  baseURL: "/api/posts",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
