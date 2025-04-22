import { cn } from "@/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

export const TimeAgo = ({ timestamp, className }) => {
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(dayjs()); // refresh the current time
        }, 60000); // update every 60 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <p
            className={cn("text-[13px] text-gray-500 font-medium", className)}
        >
            {dayjs(timestamp).from(now)}
        </p>
    )
};

TimeAgo.propTypes = {
    timestamp: PropTypes.string.isRequired,
    className: PropTypes.string,
}

