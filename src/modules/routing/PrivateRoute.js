import { Navigate } from "react-router";

 const PrivateRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
}

export default PrivateRoute;

