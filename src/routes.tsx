import HomePage from "./pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import Login from "@/pages/Login.tsx";
import AdminLayout from "@/pages/AdminLayout.tsx";
import EditProductPage from "./pages/EditProductPage.tsx";
import AdminProductGrid from "@/pages/AdminProductGrid.tsx";
import RequireAuth from "@/components/RequireAuth"; // ← Add this

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminProductGrid /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "products/edit/:id", element: <EditProductPage /> },
    ],
  },
]);
export default router;
