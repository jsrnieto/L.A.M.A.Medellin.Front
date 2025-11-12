import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Members from "../components/pages/Members";
import NotFound from "../components/pages/NotFound";
import Statistics from "../components/pages/Statistics";

const IndexRouter = createBrowserRouter([
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
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
]);

export default IndexRouter;
