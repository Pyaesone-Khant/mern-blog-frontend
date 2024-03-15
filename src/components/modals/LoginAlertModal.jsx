import { CustomBtn, CustomModal } from "@/components/index.js";
import React from "react";

const LoginAlertModal = ({ isOpen, closeModal, content = "" }) => {
    return (
        <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            title={"Login Required!"}
        >
            <p className={`py-1 text-black`}>{content}</p>

            <div className={`flex items-center justify-end gap-2  pt-2`}>
                <CustomBtn size={"xs"} variant={"cancel"} onClick={closeModal}>
                    Cancel
                </CustomBtn>
                <CustomBtn
                    size={"xs"}
                    variant={"primary"}
                    href={"/login"}
                    isLink={true}
                    data="modal-button"
                >
                    Go to Login
                </CustomBtn>
            </div>
        </CustomModal>
    );
};

export default LoginAlertModal;
