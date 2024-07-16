import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { Home, Task, Desinger } from "./pages";
import { loader as homeLoader } from "./pages/Home";
import { loader as taskLoader } from "./pages/Task";
function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: "/task",
          element: <Task />,
          loader: taskLoader,
        },
        {
          path: "/desinger",
          element: <Desinger />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
