import HomePage from "./pages/HomePage";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import Login from "@/pages/Login.tsx";
import AdminLayout from "@/pages/AdminLayout.tsx";
import EditProduct from "./pages/EditProduct.tsx";
import AdminProductGrid from "@/pages/AdminProductGrid.tsx";
const router = createBrowserRouter([
    {
        path: '/',
        errorElement:<ErrorPage/>,
        element: <Layout/>,
        children:[
            {index:true,element:<HomePage />},
            {path:'products/:id', element: <ProductDetailPage />},
            {path:'/login/', element: <Login />},
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element:<AdminProductGrid />},
            {path:'products/:id', element: <ProductDetailPage />},
            {path:'products/edit/:id', element: <EditProduct /> },
        ],
    },
])
export default router;