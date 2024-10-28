import { useQuery } from 'react-query';
import { getListPhotos, getPhoto } from '../services/photoService.ts';

export const usePhotos = (page: number) => {
  return useQuery(['photos', page], () => getListPhotos(page), {
    keepPreviousData: true,
    staleTime: 5000
  });
};

export const usePhoto = (id: string) => {
  return useQuery(['photo', id], () => getPhoto(id), {
    keepPreviousData: true,
    staleTime: 5000
  });
};
