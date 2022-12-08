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

  add = async (newGallery) => {
    const { data } = await axiosInstance.post("/galleries", newGallery);
    return data;
  };

  edit = async (galleryId, newGallery) => {
    const { data } = await axiosInstance.put(`galleries/${galleryId}`, newGallery);
    return data;
  };

  delete = async (id) => {
    const { data } = await axiosInstance.delete(`galleries/${id}`);
    return data;
  };
}

export const galeryService = new GalleryService();
