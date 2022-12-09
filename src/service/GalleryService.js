import { axiosInstance } from "./HttpService";

class GalleryService {
  getAll = async (page = 0, userId ="") => {
    let endpoint = `/galleries/?page=${page}`;

    if (userId){
      endpoint += `&userId=${userId}`;
    }

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

  addComment = async ({ galleryId, comment }) => {
    const { data } = await axiosInstance.post(`/galleries/${galleryId}/comments`, comment);
    return data;
  };

  deleteComment = async (comentId) => {
    const { data } = await axiosInstance.delete(`/comments/${comentId}`);
    return data;
  };
}

export const galeryService = new GalleryService();
