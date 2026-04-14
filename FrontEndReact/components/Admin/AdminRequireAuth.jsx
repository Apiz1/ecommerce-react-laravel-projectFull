import { useContext } from "react";           // ← this is the correct import
import { AdminAuthContext } from "../context/AdminAuth";
import { Navigate } from "react-router-dom";

export const AdminRequireAuth = ({ children }) => {
    const { user } = useContext(AdminAuthContext);

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};