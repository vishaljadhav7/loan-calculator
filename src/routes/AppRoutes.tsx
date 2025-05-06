import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import LiveExhangeRates from "../pages/LiveExhangeRates";
import ErrorPage from "../pages/ErrorPage";
import { RouterProvider } from "react-router-dom";

const AppRoutes = () => {
 
  const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <Layout/>,
        children : [
          {
            path : "/",
            element : <Home/>
          },
          {
            path : "exchange_rates_live",
            element : <LiveExhangeRates/>
          },
          {
            path : "error_page",
            element : <ErrorPage/>
          }
        ]
    }
  ])  

  return (
    <RouterProvider router={appRouter}/>
  )
}

export default AppRoutes;