import {
  Navigate
} from "react-router";
import {
  routes
} from "modules/Core";


const PrivateRoute = ({
  children,
  isLoggedIn
}) => {
  if (!isLoggedIn) {
    return <Navigate to = {
      routes.init
    }
    />;
  }
  return children;
}

export default PrivateRoute;