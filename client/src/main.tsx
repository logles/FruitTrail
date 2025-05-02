import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { apollo } from './api/apollo.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apollo}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);


// THE BELOW IS BORROWED CODE FROM MODULE 14 TO USE AS A TEMPLATE

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';

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
      {
        path: '/Login',
        element: <Login />
      },
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



// /////////////////THIS IS WHAT WAS HERE BEFORE//////////////////////////////////

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import MapPage from './pages/MapPage.tsx';
// // Ensure the root element exists before calling createRoot
// const rootElement = document.getElementById("root");

// if (!rootElement) {
//   throw new Error(
//     "Root element not found. Make sure you have <div id='root'></div> in your index.html."
//   );
// }

// const root = ReactDOM.createRoot(rootElement);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
