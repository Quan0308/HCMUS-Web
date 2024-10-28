import { doGet } from '../utils/axios.ts';

export const getListPhotos = async (page: number) => {
  const response = await doGet('photos', { page: page, per_page: 20 });

  return response.data;
};

export const getPhoto = async (id: string) => {
  const response = await doGet(`photos/${id}`);

  return response.data;
};
