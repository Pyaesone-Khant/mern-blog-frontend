import React from 'react';
import {CustomBtn} from "@/components/index.js";
import {useNavigate} from "react-router-dom";
import {cn} from "@/utils.js";

const BackButton = ({isDetail}) => {

    const nav = useNavigate();
    const handleGoBack = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        nav(-1);
    }

    return <CustomBtn variant={"ghost"} size={"xs"}
                      className={cn(`w-fit gap-1`, {"!text-black dark:!text-white": !isDetail})}
                      onClick={handleGoBack}>
        <span className={`text-2xl`}> &#8592; </span> Back
    </CustomBtn>
};

export default BackButton;
