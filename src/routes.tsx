import React from 'react';
import { Home } from './components/home';
import { createBrowserRouter } from 'react-router-dom';
import { Favorites } from './components/favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/favorites',
    element: <Favorites />
  }
]);
