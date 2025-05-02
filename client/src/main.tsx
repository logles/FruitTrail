// import React from 'react';
// import { ApolloProvider } from '@apollo/client';
// import { apollo } from './api/apollo.ts';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <ApolloProvider client={apollo}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>,
// );


// THE BELOW IS BORROWED CODE FROM MODULE 14 TO USE AS A TEMPLATE (added to/updated to try to fit our app)

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import MapPage from './pages/MapPage.tsx';
// import Login from './pages/Login.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      }, 
      // {
      //   path: '/Login',
      //   element: <Login />
      // },
      {
        path: '/MapPage',
        element: <MapPage />
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
  <RouterProvider router={router} />);
}




