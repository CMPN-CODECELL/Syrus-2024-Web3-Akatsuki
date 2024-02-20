import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Pages/Home";
import Jobs from './Pages/Jobs';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: '/jobs',
      element: <Jobs/>,
    }
  ])
  return (
    <div className='app'>
      <RouterProvider router = {router}/>
    </div>
  );
};

export default App;

