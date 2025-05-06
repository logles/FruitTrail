import React from 'react';
import ReactDOM from 'react-dom/client';
import { APIProvider } from '@vis.gl/react-google-maps';
import { ApolloProvider } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import apollo from './api/apollo.ts';
import HomePage from './pages/HomePage.tsx';
import MapPage from './pages/MapPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/MapPage', element: <MapPage /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apollo}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
        <RouterProvider router={router} />
      </APIProvider>
    </ApolloProvider>
  </React.StrictMode>
);
