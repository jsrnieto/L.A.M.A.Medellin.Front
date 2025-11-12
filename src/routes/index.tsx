import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Members from "../components/pages/Members";
import NotFound from "../components/pages/NotFound";


const IndexRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/members",
      element: <Members />,
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ],
);

export default IndexRouter;