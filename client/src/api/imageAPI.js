import API from "./index";

export const getImages = async (page) => (await API.get(`/images?page=${page}`));

export const increaseImageLikes = async data => (await API.patch(`images/like`, data));