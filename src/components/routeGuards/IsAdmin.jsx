import {Navigate} from "react-router-dom";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";

const IsAdmin = ({children}) => {

    const {data: currentUser} = useGetUserDataQuery();
    if (currentUser?.email !== "admin123@gmail.com") {
        return <Navigate to={"/"} replace={true}/>
    }
    return children;

};

export default IsAdmin;
