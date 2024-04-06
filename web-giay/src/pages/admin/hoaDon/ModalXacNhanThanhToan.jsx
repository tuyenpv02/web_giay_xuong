import React, { useState } from "react";
import { Modal } from "antd";
import { Button } from "antd";

const ModalXacNhanThanhToan = () => {
    const [open, setOpen] = useState(false);
    // modal só lượng
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = async (e) => {
        handleCancel();
    };
    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                    console.log(open);
                }}
            >
                Xác nhận thanh toán
            </Button>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title="Thanh toán"
                centered
                width={800}
                footer={false}
            ></Modal>
        </>
    );
};

export default ModalXacNhanThanhToan;
