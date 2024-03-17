import React from 'react';

// assets
import {LogoDark, LogoLight} from "@/assets/index.js";

// utils
import {cn} from "@/utils.js";

const Logo = ({className = "", ...props}) => {
    return (
        <div className={cn(`w-12 aspect-square mx-auto`, className)} {...props}>
            <img src={LogoLight} alt={"Logo"}
                 className={`aspect-square dark:hidden object-cover object-center`}/>
            <img src={LogoDark} alt={"Logo"}
                 className={`aspect-square dark:block hidden object-cover object-center`}/>
        </div>
    );
};

export default Logo;
