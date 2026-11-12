// Central router config lives in app layer to map routes to pages.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

// Match Vite's `base` (e.g. /publishTemplate/) so routes resolve under the deploy subpath.
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
});

export function Router() {
  return <RouterProvider router={router} />;
}
