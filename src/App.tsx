import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./page/auth";
import Root from "./layouts/Root";
import Home from "./page/home";


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
        path: 'home',
        element: <Home/>
      }
    ]
  }
])


const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;