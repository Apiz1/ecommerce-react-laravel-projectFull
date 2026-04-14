import { useContext } from "react";           // ← this is the correct import
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/Auth";

export const RequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/account/login" replace />;
    }

    return children;
};