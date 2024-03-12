import React from 'react';
import withAuth from "@/features/auth/withAuth.jsx";

const MyComponent = ({isAuth}) => {
    return (
        <div>
            {isAuth ? (
                <p>User is authenticated!</p>
            ) : (
                <p>User is not authenticated!</p>
            )}
        </div>
    );
};

const MyAuthComponent = withAuth(MyComponent);

export default MyAuthComponent;
