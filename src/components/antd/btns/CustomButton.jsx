// components
import { Button } from "antd";
import { Link } from "react-router-dom";

// utils
import { cn } from "@/utils.js";

const CustomButton = ({
    variant = "primary",
    size = "md",
    className = "",
    isLink = false,
    href = "",
    ...props
}) => {
    const variantClasses = {
        primary: "!bg-cBlue dark:!bg-darkTer !text-white",
        danger: "!bg-danger !text-white",
        ghost: "!bg-transparent !text-cBlue dark:!text-darkTer ",
        outline:
            "!bg-transparent !text-cBlue dark:!text-darkTer !border !border-cBlue dark:!border-darkTer",
        cancel: "!bg-transparent !text-black dark:!text-white !border !border-black/40 dark:!border-white/40",
    };

    const sizeClasses = {
        xs: "px-3 h-8",
        sm: "px-4 h-9",
        md: "px-5 h-10",
        lg: "px-6 h-11",
    };

    return !isLink ? (
        <Button
            htmlType={"button"}
            className={cn(
                `!rounded-sm text-sm !shadow-none !outline-none flex items-center justify-center disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]}`,
                {
                    "!border-none":
                        variant !== "outline" && variant !== "cancel",
                },
                className
            )}
            {...props}
        />
    ) : (
        <Link
            to={href}
            className={cn(
                `!rounded-sm text-sm !shadow-none !outline-none flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]}`,
                { "!border-none": variant !== "outline" },
                className
            )}
            {...props}
        />
    );
};

export default CustomButton;
