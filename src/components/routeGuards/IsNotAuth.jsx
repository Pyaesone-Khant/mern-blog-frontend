import {Navigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.js";

const IsNotAuth = ({children}) => {
    const {token} = useAuth();
    if (!token) {
        return children;
    } else {
        return <Navigate to={"/"}/>;
    }
};

export default IsNotAuth;
