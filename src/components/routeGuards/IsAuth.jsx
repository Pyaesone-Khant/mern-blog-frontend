import {Navigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.js";

const IsAuth = ({children}) => {
    const {token} = useAuth();
    if (token) {
        return children;
    } else {
        return <Navigate to={"/login"}/>;
    }
};

export default IsAuth;
