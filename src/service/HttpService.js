import axios from "axios";

class HttService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
    });
  }
}

export const axiosInstance = new HttService().client;
