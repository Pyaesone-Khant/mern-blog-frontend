import {Button} from "antd";

const SubmitBtn = ({
    isSubmitting,
    label,
}) => {
    return <Button type={"primary"} htmlType={"submit"} loading={isSubmitting} className={`submit-btn !shadow-none `} > {label} </Button>
};

export default SubmitBtn;
