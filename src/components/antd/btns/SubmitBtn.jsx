import {Button} from "antd";

const SubmitBtn = ({
    isSubmitting,
    label,
    isDeleteBtn,
}) => {
    return <Button type={"primary"} htmlType={"submit"} loading={isSubmitting} className={` ${isDeleteBtn ? "delete-btn" : "submit-btn"}  !shadow-none `} > {label} </Button>
};

export default SubmitBtn;
