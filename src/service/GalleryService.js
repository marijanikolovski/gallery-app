import { axiosInstance } from "./HttpService";

class GalleryService {
  getAll = async (page = 0) => {
    let endpoint = `/galleries/?page=${page}`;

    const { data } = await axiosInstance.get(endpoint);
    return data;
  };

  get = async (id) => {
    const { data } = await axiosInstance.get(`/galleries/${id}`);
    return data;
  };
}

export const galeryService = new GalleryService();
