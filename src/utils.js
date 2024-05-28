import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

export function cn(...className) {
    return twMerge(clsx(className));
}

export const formatDate = (dateString) => {
    const day = new Date(dateString).getDate();
    const month = months[new Date(dateString).getMonth()];
    const year = new Date(dateString).getFullYear();
    const date = `${month} ${day}, ${year}`;

    return date;
};

export const getAvatarName = (name) => {
    const nameArr = name?.split(" ");
    const avatarName =
        nameArr?.length > 1
            ? nameArr[0].charAt(0) + nameArr[1].charAt(0)
            : name;

    return avatarName || "Unknown";
};
