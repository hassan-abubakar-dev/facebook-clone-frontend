import { Navigate } from "react-router-dom";

const ProtectRoutes = ({children}) => {
    const accessToken = localStorage.getItem('accessToken');
 
    
    if(!accessToken){
        return <Navigate to='/logging' replace />
    }

    return children;
};

export default ProtectRoutes;