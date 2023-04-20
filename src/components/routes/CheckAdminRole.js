import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function CheckAdminRole({ children }) {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <>{children}</>;
}

export default CheckAdminRole;


