import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./page/auth";
import Root from "./layouts/Root";
import Home from "./page/home";
import Language from "./page/language";
import Restaran from "./page/restaran";
import Food from "./page/food";
import User from "./page/user";
import Category from "./page/category";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        index: true,
        element: <Auth/>
      },
      {
        path: 'dashboard',
        element: <Home/>
      },
      {
        path: 'dashboard/language',
        element: <Language/>
      },
      {
        path: 'dashboard/category',
        element: <Category/>
      },
      {
        path: 'dashboard/restaran',
        element: <Restaran/>
      },
      {
        path: 'dashboard/food',
        element: <Food/>
      },
      {
        path: 'dashboard/user',
        element: <User/>
      }
    ]
  }
])


const App = () => {
  const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </div>
  );
};

export default App;