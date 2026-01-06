import { Navigate } from "react-router";

import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
