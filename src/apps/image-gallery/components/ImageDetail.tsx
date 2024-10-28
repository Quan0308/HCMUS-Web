import { usePhoto } from '../../../hooks/photo.ts';
import { CircularProgress, Container, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ImageDetail() {
  const { id } = useParams();
  const { data: photo, isLoading, isFetching, isError } = usePhoto(id || '');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <Container>
      {photo && (
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={photo.urls.full}
            alt={photo.alt_description || 'Photo'}
            style={{
              width: '100%',
              maxHeight: isSmallScreen ? '300px' : '500px',
              objectFit: 'contain'
            }}
          />
          <Box
            sx={{
              marginTop: '10px',
              color: 'black',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '10px',
              borderRadius: '5px',
              textAlign: isSmallScreen ? 'left' : 'center'
            }}>
            <Typography variant="h4">{photo.alt_description || 'Untitled'}</Typography>
            <Typography variant="h6">By {photo.user?.name || 'Unknown'}</Typography>
            <Typography variant="body1">{photo.description || 'No description available.'}</Typography>
          </Box>
        </Box>
      )}
      {isFetching && (
        <div>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}
