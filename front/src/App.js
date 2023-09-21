import React from 'react';
import Main from './page/Main';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from './page/SignUp';
import LoginPage from './page/LoginPage';
import Contain from './page/Contain';
import Profile from './page/Profile';


const router = createBrowserRouter([{
  path: '/',
  element: <Main /> ,
  errorElement: <p>Not Found</p>  
},
  {
  path: 'signup/',
  element: <SignUp />
},
  {
    path: 'loginpage/',
    element: <LoginPage />
  },
  {
    path: 'contain/',
    element: <Contain />
  },
  {
    path: 'profile/',
    element: <Profile />
  }
  
]);


const App = () => (
  <RouterProvider router={router}>
  <div>
   <Main />

  </div>

  </RouterProvider>
);

export default App;
