import { Button, Form, Input } from "antd";
import { updateFollowUp } from "../../api/followUps";
import { toast } from "react-toastify";

const { TextArea } = Input;

const UpdateFollowUp = ({ _id, onClose, fetchFollowups }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const data = {
            followUpNotes: values.followUpNotes,
        };
        console.log(`id: ${_id}`)
        let user = await JSON.parse(localStorage.getItem("user"));
        let response = await updateFollowUp(_id, data, user?.secretKey);
        if(response.success){
            toast.success(response.message);
            fetchFollowups();
            onClose();
        } else{
            toast.error(response.message);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
            name="followUpNotes"
            label="Follow-up Notes"
            rules={[{ required: true, message: "Please enter follow-up notes" }]}
        >
            <TextArea rows={4} placeholder="Enter notes..." />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
            Update
            </Button>
        </div>
        </Form>
    );
};

export default UpdateFollowUp;
