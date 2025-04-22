import { CustomBtn, CustomModal } from "@/components";
import { useChatContext } from "@/context/chat.context";
import { setAlertMessage } from "@/core/globalSlice";
import { useCreateNewConversationMutation, useGetConversationsQuery } from "@/features/chat/chatApi";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CreateConversation({
    user,
}) {

    const nav = useNavigate();
    const { currentUser } = useCurrentUser();
    const [opened, setOpened] = useState(false);
    const dispatch = useDispatch();

    const [createNewConversation, { isLoading }] = useCreateNewConversationMutation();
    const { data } = useGetConversationsQuery();

    const activeConversation = data?.find((conversation) => {
        const sortedArr1 = [conversation?.members[0], conversation?.members[1]].sort();
        const sortedArr2 = [currentUser?._id, user?._id].sort();
        return sortedArr1[0] === sortedArr2[0] && sortedArr1[1] === sortedArr2[1];
    });

    const { setCurrentConversation } = useChatContext();

    const toggleModal = () => {
        setOpened((prev) => !prev);
    };

    const handleCreateConversation = async () => {

        const payload = {
            receiver: user?._id,
        };
        const { data } = await createNewConversation(payload);
        console.log(data)
        if (data?._id) {
            nav("/chat");
            setCurrentConversation(data)
            toggleModal();
        } else {
            dispatch(
                setAlertMessage({
                    type: "error",
                    content: data?.message,
                })
            );
        }
    }

    const navigateToChat = () => {
        nav("/chat");
        setCurrentConversation(activeConversation)
    }

    return (
        <div
            className="flex items-center justify-between gap-2 font-medium p-5 rounded-md bg-cBlue/10 dark:bg-darkTer/10"
        >
            <h3
                className="text-lg font-medium"
            >
                Chat with
                <span
                    className="font-semibold text-lg px-1 text-cBlue dark:text-darkTer"
                >
                    {user?.name}
                </span>
                :
            </h3>

            <CustomBtn
                className="w-fit gap-2 text-base"
                onClick={activeConversation ? navigateToChat : toggleModal}
            >
                <AiOutlineMessage
                    size={20}
                />
                {
                    activeConversation ? "Message" : "Start"
                }
            </CustomBtn>
            <CustomModal
                title={<h2
                    className="text-lg font-medium"
                >
                    Start a conversation with {user?.name}?
                </h2>}
                isOpen={opened}
                closeModal={toggleModal}
                width={500}
            >
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        You are about to start a conversation with {user?.name}. Please make sure you want to proceed.
                    </p>
                    <div
                        className="flex items-center justify-end gap-2"
                    >
                        <CustomBtn
                            variant={"cancel"}
                            size={"sm"}
                            onClick={toggleModal}
                            disabled={isLoading}
                        >
                            Cancel
                        </CustomBtn>
                        <CustomBtn
                            className="w-fit gap-2 text-base"
                            onClick={handleCreateConversation}
                            data="modal-button"
                            loading={isLoading}
                        >
                            Start Conversation
                        </CustomBtn>
                    </div>
                </div>
            </CustomModal >
        </div >
    )
}

CreateConversation.propTypes = {
    user: PropTypes.object.isRequired,
}