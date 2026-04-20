import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

// Lazy-load admin surfaces so the admin bundle doesn't bloat the public site.
const IndexPage = lazy(() => import("@/pages/index"));
const LoginPage = lazy(() => import("@/pages/admin/login"));
const ContentEngine = lazy(() => import("@/components/admin/ContentEngine"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/engine"
            element={
              <ProtectedRoute>
                <ContentEngine />
              </ProtectedRoute>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
