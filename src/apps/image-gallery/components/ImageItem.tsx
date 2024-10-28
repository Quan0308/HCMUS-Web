import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ImageItemProps } from '../../../types/interfaces.ts';

export default function ImageItem({ urls, alt_description, user, id }: ImageItemProps) {
  return (
    <Card key={id}>
      <CardMedia component="img" height="140" image={urls.thumb} alt={alt_description || 'No description'} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
