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
import AddUserPage from "./pages/AddUserPage.tsx";
import AddProductPage from "./pages/AddProductPage.tsx";
import AdminCategoriesPage from "@/pages/AdminCategoriesGrid.tsx";
import EditCategoryPage from "@/pages/EditCategoryPage.tsx";
import AddCategoryPage from "@/pages/AddCategoryPage.tsx";
import AdminUsersGrid from "@/pages/AdminUsersGrid.tsx";
import EditUserPage from "@/pages/EditUserPage.tsx";

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
      { path: "products/add", element: <AddProductPage /> },
      { path: "categories/", element: <AdminCategoriesPage /> },
      { path: "categories/edit/:id", element: <EditCategoryPage /> },
      { path: "categories/add", element: <AddCategoryPage /> },
      {
        path: "users",
        element: (
          <RequireAuth requiredRole="ADMIN">
            <AdminUsersGrid />
          </RequireAuth>
        ),
      },
      {
        path: "users/edit/:id",
        element: (
            <RequireAuth requiredRole="ADMIN">
              <EditUserPage />
            </RequireAuth>
        ),
      },
      {
        path: "users/register",
        element: (
          <RequireAuth requiredRole="ADMIN">
            <AddUserPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
export default router;
