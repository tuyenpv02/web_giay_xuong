/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import { InputNumber } from "antd";
import { Switch } from 'antd';
import ChiTietSanPhamService from "../../../services/ChiTietSanPhamService";

const schema = yup.object({
    ten: yup.string().trim("Không hợp lệ").required("Không hợp lệ"),
    soLuong: yup
        .number()
        .integer("nhập số nguyên")
        .min(0, "Tối thiểu là 0")
        .required("Không hợp lệ")
        .typeError("Không hợp lệ"),
    giaBan: yup.number().required("Nhập giá").min(0, "Tối thiểu là 0").typeError("Không hợp lệ"),

    kichCo: yup.string().required("Không hợp lệ"),
    mauSac: yup.string().required("Không hợp lệ"),
    deGiay: yup.string().required("Không hợp lệ"),
    chatLieu: yup.string().required("Không hợp lệ"),

    moTa: yup.string(),
});
const yupSync = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
//
const ModalSuaThongTin = ({ load,setLoad,chiTietSP, deGiays, chatLieus, kichCos, mauSacs }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        // console.log(res);
        form.setFieldValue("ten", chiTietSP.ten);
        form.setFieldValue("giaBan", chiTietSP.giaBan);
        form.setFieldValue("soLuong", chiTietSP.soLuong);
        form.setFieldValue("kichCo", chiTietSP.kichCo.id);
        form.setFieldValue("mauSac", chiTietSP.mauSac.id);
        form.setFieldValue("deGiay",  chiTietSP.deGiay.id);
        form.setFieldValue("chatLieu",  chiTietSP.chatLieu.id);
        form.setFieldValue("moTa",  chiTietSP.moTa);
        form.setFieldValue("trangThai",  chiTietSP.trangThai);
        // console.log("ctsp ", chiTietSP);
    }, []);

    // Open Modal thay đổi thông tin
    const [modalSuaThongTin, setModalSuaThongTin] = useState(false);
    const ShowSuaModalThongTin = () => {
        setModalSuaThongTin(true);
    };
    const handleCancelModalSuaThongTin = () => {
        setModalSuaThongTin(false);
        // form.resetFields();
    };

    const submitForm = (values) => {
        // console.log(values);
        const data = {
            ...values,
            trangThai:values.trangThai?1:0,
            sanPham:{id:chiTietSP?.sanPham.id},
            deGiay:{id:values.deGiay},
            mauSac:{id:values.mauSac},
            kichCo:{id:values.kichCo},
            chatLieu:{id:values.chatLieu},
        }
        ChiTietSanPhamService.update(chiTietSP?.id, data).then(res=>{
            setLoad(!load)
            toast.success('thành công');
            handleCancelModalSuaThongTin()
        }).catch(err=>{
            toast.error('thất bại')
        })
    };

    //
    return (
        <>
            <Button type="primary" onClick={ShowSuaModalThongTin}>
                <i className="fa-solid fa-eye"></i>
            </Button>
            {/* modal thay đổi thông tin */}
            <Modal
                width={700}
                open={modalSuaThongTin}
                onCancel={handleCancelModalSuaThongTin}
                footer={false}
            >
                <Form form={form} onFinish={submitForm} layout="vertical">
                    <Row gutter={[20, 0]} justify={"center"}>
                        <Col span={24}>
                            <Form.Item name="ten" label="Tên" rules={[yupSync]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="soLuong" label="Số lượng" rules={[yupSync]}>
                                <Input min={0} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="giaBan" label="Giá" rules={[yupSync]}>
                                <Input min={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item name="kichCo" label="Kích cỡ" rules={[yupSync]}>
                                <Select className="w-100">
                                    {kichCos?.map((de, index) => (
                                        <Select.Option key={index} value={de?.id}>
                                            {de?.ten}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="mauSac" label="Màu" rules={[yupSync]}>
                                <Select className="w-100">
                                    {mauSacs?.map((de, index) => (
                                        <Select.Option key={index} value={de?.id}>
                                            {de?.ten}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="chatLieu" label="Chất liệu" rules={[yupSync]}>
                                <Select className="w-100">
                                    {chatLieus?.map((de, index) => (
                                        <Select.Option key={index} value={de?.id}>
                                            {de?.ten}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="deGiay" label="đế giày" rules={[yupSync]}>
                                <Select className="w-100">
                                    {deGiays?.map((de, index) => (
                                        <Select.Option key={index} value={de?.id}>
                                            {de?.ten}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[20, 0]} justify={"center"}>
                            <Col span={24}>
                                <Form.Item name="trangThai" label="trạng thái" >
                                    <Switch  />
                                </Form.Item>
                            </Col>
                        </Row>
                    <Row gutter={[20, 0]} justify={"center"}>
                        <Col span={24}>
                            <Form.Item label="Mô tả" name={"moTa"} rules={[yupSync]}>
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <div className="d-flex justify-content-end ">
                                <Button htmlType="submit" type="primary">
                                    Thay đổi
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default ModalSuaThongTin;
