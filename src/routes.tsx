import { lazy, Suspense, type JSX } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { PageLoader } from "./components/loader";
import { NotFoundPage } from "./components/not-found";

const HomePage = lazy(() => import('./pages/home').then(module => ({ default: module.HomePage })));
const CategoryPage = lazy(() => import('./pages/category').then(module => ({ default: module.CategoryPage })));
const FavouritesPage = lazy(() => import('./pages/favourites').then(module => ({ default: module.FavouritesPage })));

const withSuspense = (el: JSX.Element) => (
  <Suspense fallback={<PageLoader />}>{el}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<HomePage />),
      },
      {
        path: "/categories",
        element: withSuspense(<CategoryPage />),
      },
      {
        path: "/favourites",
        element: withSuspense(<FavouritesPage />),
      },
      {
        path: "/not-found",
        element: withSuspense(<NotFoundPage />),
      },
      {
        path: "*",
        element: <Navigate to="/not-found" replace />,
      },
    ]
  }])