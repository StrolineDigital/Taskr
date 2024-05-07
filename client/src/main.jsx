import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/home';
import AddTask from './pages/addTask';
import NoMatch from './pages/NoMatch';
import Login from './pages/login';
import Signup from './pages/signup';
import viewTasks from './pages/viewTasks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: 'addTask',
    element: <AddTask />
  },
  {
    path: 'viewTasks',
    element: <viewTasks />
  },
  {
    path: '*',
    element: <NoMatch />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
