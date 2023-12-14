import {Navigate, useLocation} from "react-router-dom";

const OTPGuard = ({children}) => {
    const location = useLocation();
    const email = location?.state?.email;

    if(!email){
        return <Navigate to={".."}/>
    }else{
        return children;
    }
};

export default OTPGuard;
