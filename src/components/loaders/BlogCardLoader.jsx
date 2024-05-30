import { useResponsive } from "@/hooks/useResponsive.js";
import { cn } from "@/utils";
import { Skeleton } from "antd";

const BlogCardLoader = ({ isDetail, isRecommended }) => {
    const { isMobile } = useResponsive();

    return (
        <div
            className={cn("border-b border-black/20 dark:border-white/20", {
                "flex items-center md:gap-10 gap-4":
                    !isDetail && !isRecommended,
                "flex flex-col gap-4": isDetail || (isRecommended && !isMobile),
            })}
        >
            <div className={`w-full space-y-2`}>
                <Skeleton
                    active
                    avatar={{
                        className: `!w-8 !h-8 rounded-full`,
                    }}
                    title={{
                        className: `!h-6 rounded-sm max-w-[180px] !my-0`,
                    }}
                    paragraph={false}
                    className={`flex items-center`}
                />
                <Skeleton
                    active
                    title={{
                        className: `!h-8 rounded-sm !w-full md:max-w-[80%] max-w-[90%] !my-0`,
                    }}
                    paragraph={{
                        rows: 3,
                    }}
                    className={`flex items-center`}
                />
                <Skeleton.Button
                    className={`mt-2 max-w-[100px] !w-full !rounded-full`}
                    size={"small"}
                />
            </div>
            <Skeleton.Image
                active={true}
                className={cn({
                    "!w-full !max-w-[120px] !h-full max-h-[120px] !aspect-square":
                        !isDetail & !isRecommended,
                    " !w-full aspect-[16/9] !h-full":
                        isDetail || (isRecommended && !isMobile),
                })}
            />
        </div>
    );
};

export default BlogCardLoader;
