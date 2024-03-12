import {useEffect, useState} from "react";

const withAuth = (WrappedComponent) => {
    return function WithAuthComponent(props) {
        const [isAuth, setIsAuth] = useState(false)

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                setIsAuth(true);
            }, 1000);

            // Clean up the timeout on component unmount
            return () => clearTimeout(timeoutId);
        }, []);

        return <WrappedComponent {...props} isAuth={isAuth}/>
    }
};

export default withAuth;
