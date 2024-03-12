import {twMerge} from "tailwind-merge";
import clsx from "clsx";

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
]

export function cn(...className) {
    return twMerge(clsx(className))
}

export const formatDate = (dateString) => {
    const day = new Date(dateString).getDate();
    const month = months[new Date(dateString).getMonth()];
    const year = new Date(dateString).getFullYear();
    const date = `${month} ${day}, ${year}`;

    return date;
}