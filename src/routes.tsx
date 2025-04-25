import HomePage from "./pages/HomePage";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout.tsx";
import Login from "@/pages/Login.tsx";
const router = createBrowserRouter([
    {
        path: '/',
        errorElement:<ErrorPage/>,
        element: <Layout/>,
        children:[
            {index:true,element:<HomePage />},
            {path:'products/:id', element: <Login/>}
        ]
    }
])
export default router;