import {
  Navigate
} from "react-router";

import {
  routes
} from "modules/core";

const RedirectRoute = ({
  children,
  isLoggedIn
}) => {
  if (isLoggedIn) {
    return <Navigate to = {
      routes.dashboard
    }
    />;
  }
  return children;
}

export default RedirectRoute;