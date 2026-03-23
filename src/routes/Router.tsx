// Central router config lives in app layer to map routes to pages.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
