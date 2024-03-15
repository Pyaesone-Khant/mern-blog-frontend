import { CustomBtn } from "@/components/index.js";
import { cn } from "@/utils.js";
import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackButton = ({ isDetail }) => {
    const nav = useNavigate();
    const handleGoBack = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        nav(-1);
    };

    return (
        <CustomBtn
            variant={"ghost"}
            size={"xs"}
            className={cn(`w-fit gap-1`, {
                "!text-black dark:!text-white": !isDetail,
            })}
            onClick={handleGoBack}
        >
            <MdOutlineArrowBack className={`text-xl`} /> Back
        </CustomBtn>
    );
};

export default BackButton;
