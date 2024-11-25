import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Auth from "./page/auth";
import Root from "./layouts/Root";
import Home from "./page/home";
import Language from "./page/language";
import Restaran from "./page/restaran";
import Food from "./page/food";
import User from "./page/user";
import Category from "./page/category";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import CategoryImg from "./page/category-img";
import RestaurantUser from "./page/restaurant-user";
import UserProfile from "./page/user-profile";

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
      },
      {
        path: 'dashboard/restaurant-uers',
        element: <RestaurantUser/>
      },
      {
        path: 'dashboard/category-img',
        element: <CategoryImg/>
      },
      {
        path: 'dashboard/profile',
        element: <UserProfile/>
      }
    ]
  }
])


const App = () => {
  const queryClient = new QueryClient()
  if(!localStorage.getItem('language')){
      localStorage.setItem('language', JSON.stringify({
        code: "uz",
        createdAt: "2024-11-23T12:44:29.922Z",
        image:
            "public/static/uzbekistan.png",
        name: "O'zbek",
        updatedAt: "2024-11-23T12:44:29.922Z",
        __v: 0,
        _id: "6741ce2da360c5d6323af416"
    }))
  }
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </div>
  );
};

export default App;