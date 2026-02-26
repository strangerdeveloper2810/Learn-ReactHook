import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useAuthStore } from './store/useAuthStore';
import Login from './Pages/Login';
import Lobby from './Pages/Lobby';
import Room from './Pages/Room';
import Game from './Pages/Game';

interface RouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: RouteProps) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function GuestRoute({ children }: RouteProps) {
  const user = useAuthStore((s) => s.user);
  if (user) return <Navigate to="/lobby" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest routes */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/lobby"
          element={
            <ProtectedRoute>
              <Lobby />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:code"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game/:code"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/lobby" replace />} />
        <Route path="*" element={<Navigate to="/lobby" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
