import { createBrowserRouter } from 'react-router-dom';
import Landing from '../components/Landing';
import Home from '../components/Home';
import Navigation from '../components/Navigation';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <Navigation />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);