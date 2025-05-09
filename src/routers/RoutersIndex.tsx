import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import ActionLayout from "@/pages/Layouts/ActionLayout"
import NotFound from "@/pages/Layouts/NotFound"
import QRScannerPage from "@/pages/QRScanPage"
import ProtectedRoute from "./ProtectedRoute"

const ViewActionPage = lazy(() => import("../pages/ViewActionPage"))
const FoodsHome = lazy(() => import("@/pages/Foods/FoodsHome"))
const Orders = lazy(() => import("@/pages/Orders/TabOrders"))
const LoginPage = lazy(() => import("@/pages/WellComePage"))
const ClosedPage = lazy(() => import("@/pages/ClosedPage"))
const Payment = lazy(() => import("@/pages/Payment"))
const Loading = lazy(() => import("@/pages/Layouts/LoadingFallBack"))

const RouterIndex = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes - no protection needed */}
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route path="/closed" element={<ClosedPage />} />
        <Route path="/locked" element={<ClosedPage />} />
        <Route path="/booked" element={<ClosedPage />} />

        {/* Protected routes - will check table status */}
        <Route
          path="/get-started/:id"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/action"
          element={
            <ProtectedRoute>
              <ViewActionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qr-scanner"
          element={
            <ProtectedRoute>
              <QRScannerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/action"
          element={
            <ProtectedRoute>
              <ActionLayout />
            </ProtectedRoute>
          }
        >
          <Route path="foods" element={<FoodsHome />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default RouterIndex
