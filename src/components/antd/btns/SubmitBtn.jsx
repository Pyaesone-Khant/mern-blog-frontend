import { Spinner } from "@/components";

const SubmitBtn = ({
    isSubmitting,
    label,
    canSave,
    isDisabled,
    isCommentBtn,
}) => {
    return isDisabled ? (
        <button
            className={`btn submit-btn ${
                canSave && !isSubmitting ? "" : "disabled"
            }`}
            disabled={!canSave || isSubmitting}
        >
            {isSubmitting ? <Spinner /> : label}
        </button>
    ) : (
        <button
            className={`btn submit-btn ${!isSubmitting ? "" : "disabled"} ${
                isCommentBtn ? "ml-auto" : ""
            } `}
            disabled={isSubmitting}
        >
            {isSubmitting ? <Spinner /> : label}
        </button>
    );
};

export default SubmitBtn;
