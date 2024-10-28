import TicTacToe from './apps/tic-tac-toe';
import ImageGallery from './apps/image-gallery';
import ImageDetail from './apps/image-gallery/components/ImageDetail.tsx';
import { Navigate } from 'react-router-dom';
export default [
  {
    path: '/HCMUS-Web',
    element: <Navigate to={'/HCMUS-Web/image-gallery/photos'} replace />
  },
  {
    path: '/HCMUS-Web/tic-tac-toe',
    element: <TicTacToe />
  },
  {
    path: '/HCMUS-Web/image-gallery/photos',
    element: <ImageGallery />,
    children: [
      {
        path: ':id',
        element: <ImageDetail />
      }
    ]
  }
];
