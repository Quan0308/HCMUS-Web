import { usePhotos } from '../../hooks/photo.ts';
import { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress, Grid2 as Grid, IconButton, Modal } from '@mui/material';
import ImageItem from './components/ImageItem.tsx';
import { Link, Outlet, useParams } from 'react-router-dom';
import ImageDetail from './components/ImageDetail.tsx';
import { Close } from '@mui/icons-material';
import { ImageItemProps } from '../../types/interfaces.ts';
export default function ImageGallery() {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<ImageItemProps[]>([]);
  const { data: newPhotos, isLoading, isFetching, isError } = usePhotos(page);
  const { id } = useParams();

  useEffect(() => {
    if (newPhotos) {
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    }
  }, [newPhotos]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setPage(prevPage => prevPage + 1);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isFetching]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error loading pages</p>;

  return (
    <div>
      <Grid container spacing={2}>
        {photos?.map((p, index) => (
          <Grid key={`Image-${index}`} size={{ xs: 12, lg: 3 }}>
            <Link to={`/HCMUS-Web/image-gallery/photos/${p.id}`}>
              <ImageItem urls={p.urls} user={p.user} alt_description={p.alt_description} id={p.id} />
            </Link>
          </Grid>
        ))}
      </Grid>
      {isFetching && (
        <div>
          <CircularProgress />
        </div>
      )}
      <Modal open={!!id} onClose={() => window.history.back()} aria-labelledby="image-detail-modal" aria-describedby="image-detail-modal-description">
        <Box sx={{ position: 'relative', width: 'fit-content', margin: 'auto', marginTop: '5%' }}>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0, zIndex: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={() => window.history.back()}>
            <Close />
          </IconButton>
          <ImageDetail />
        </Box>
      </Modal>
      <Outlet />
    </div>
  );
}
