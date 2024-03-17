import {useState} from "react";

// icons
import {FaHeart, FaRegHeart} from "react-icons/fa";

// components
import {LoginAlertModal} from "@/components/index.js";

// apis
import {useSetUserReactionMutation} from "@/features/blogs/blogApi";
import {useGetUserDataQuery} from "@/features/users/UserApi.js";

// hooks
import {useAuth} from "@/hooks/useAuth.js";

const ReactionBtn = ({blog}) => {

    const [openModal, setOpenModal] = useState(false);

    const {token} = useAuth();
    const {data: currentUser} = useGetUserDataQuery();
    const reactionsCount = blog?.reactions.length;
    const isAlreadyLiked = blog?.reactions.includes(currentUser?._id);
    const [isLiked, setIsLiked] = useState(isAlreadyLiked);
    const [setUserReaction] = useSetUserReactionMutation();

    const handleBlogReaction = async () => {
        if (token) {
            const requiredIds = {userId: currentUser?._id, blogId: blog?._id};
            try {
                setIsLiked(!isLiked);
                await setUserReaction(requiredIds);
            } catch (error) {
                throw new Error(error);
            }
        } else {
            setOpenModal(true)
        }
    };

    return (
        <section>
            <button onClick={handleBlogReaction} className={`reaction-btn `}>
                {isLiked && token ? (
                    <FaHeart/>
                ) : isLiked && !token ? (
                    <FaRegHeart/>
                ) : (
                    <FaRegHeart/>
                )}
                <p className=" text-sm font-medium tracking-widest ">
                    {" "}
                    <span className={`font-grm mr-1`}>
                    {reactionsCount > 0 ? reactionsCount : ""}
                </span>
                    {reactionsCount > 1
                        ? "Likes"
                        : reactionsCount === 1
                            ? "Like"
                            : ""}
                </p>
            </button>

            {/* for un-auth user*/}
            <LoginAlertModal closeModal={() => setOpenModal(!openModal)} isOpen={openModal}
                             content={"You need to login to like this blog!"}/>
        </section>
    );
};

export default ReactionBtn;
