import { Button, Col, Form, Input, Modal, Row, Space, Switch, Table, Tag,Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import KichCoService from "../../../services/KichCoService";
import KichCoSlice from '../../../redux-toolkit/kichCoSlice';
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import getDateNow from "../../../utils/GetDateNow";

function KichCoPage() {
    const ditpatch = useDispatch();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const isCheck = useRef(1); // 1 - add | 2 - edit

    // Open Modal
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalAdd = () => {
        isCheck.current = 1;
        form.resetFields();
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //

    //
    const getData = async () => {
        try {
            let res = await KichCoService.getAll();
            ditpatch(KichCoSlice.actions.fetchData(res));
            setDataSource([...res]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const showModalEdit = (record) => {
        isCheck.current = 2;
        setIsModalOpen(true);
        form.setFieldsValue({ ...record });
    };

    const handleSubmit = (values) => {
        if (isCheck.current == 1) {
            const data = {
                ten: values.ten.trim(),
                nguoiTao: "system",
                nguoiCapNhat: null,
                ngayTao: getDateNow(),
                ngayCapNhat: null,
                trangThai: values.trangThai ? 1 : 0,
            };
            KichCoService.add(data)
                .then((res) => {
                    toast.success("Thêm thành công");
                    getData();
                    handleCancel();
                })
                .catch((err) => {
                    toast.warning("Thêm thất bại ");
                    console.log(err);
                });
        } else {
            const data = {
                id: form.getFieldValue("id"),
                ten: values.ten.trim(),
                nguoiTao: null,
                nguoiCapNhat: "system",
                ngayTao: null,
                ngayCapNhat: getDateNow(),
                trangThai: values.trangThai ? 1 : 0,
            };
            KichCoService.update(data.id, data)
                .then((res) => {
                    toast.success("Cập nhật thành công");
                    getData();
                    handleCancel();
                })
                .catch((err) => {
                    toast.warning("Cập nhật thất bại ");
                    console.log(err);
                });
        }
    };

    const handleDelete = (record) => {
        // console.log(record);
        KichCoService.delete(record.id)
            .then((res) => {
                toast.success("Xóa thành công");
                getData();
            })
            .catch((error) => {
                console.log("Lỗi Xóa " + error);
            });
    };
    const handleSearch = (event) => {
        KichCoService.search(event.target.value.trim())
            .then((res) => {
                // console.log(res);
                setDataSource([...res.data]);
            })
            .catch((error) => {});
    };

    const columns = [
        {
            title: "#Id",
            dataIndex: "id",
            width: 80,
            render: (text, record, index) => <Typography.Text strong>{index + 1}</Typography.Text>,
        },
        {
            title: "Tên",
            dataIndex: "ten",
            // width: 400,
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Ngày tạo",
            dataIndex: "ngayTao",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Người tạo",
            dataIndex: "nguoiTao",
            render: (text) => <a>{text ? text : "system"}</a>,
        },
        {
            title: "Trạng Thái",
            dataIndex: "trangThai",
            render: (trangThai, record) => {
                const color = trangThai ? "green" : "blue";
                return <Tag color={color}>{trangThai ? "hoạt động" : "tạm ngưng"}</Tag>;
            },
        },
        {
            title: "Action",
            width: 120,
            render: (_, record) => (
                <>
                    <Space>
                        <Button onClick={() => showModalEdit(record)}>Sửa</Button>
                        <Button onClick={() => handleDelete(record)}>Xóa</Button>
                    </Space>
                </>
            ),
        },
    ];

    // UI
    return (
        <div>
            <h2>Quản lý chất liệu</h2>
            <br />
            <Row className="mb-2 ">
                <Col span={12}>
                    <Button
                        type="primary"
                        className="bg-success"
                        icon={<PlusOutlined />}
                        onClick={showModalAdd}
                    >
                        Thêm Dữ Liệu
                    </Button>
                </Col>
                <Col span={12}>
                    <Input
                        onChange={(e) => handleSearch(e)}
                        placeholder="Tìm theo tên hoặc người tạo"
                        prefix={<i className="fa-solid fa-magnifying-glass"></i>}
                    />
                </Col>
            </Row>
            {dataSource.length > 0 ? (
                <Table columns={columns} dataSource={dataSource} rowKey={"id"}></Table>
            ) : (
                <span>loading...</span>
            )}

            {/* //Modal  */}
            <Modal
                title={isCheck.current == 1 ? "Thêm" : "Cập nhật"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        label={"Kích cỡ"}
                        name="ten"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập dữ liệu",
                            },
                            {
                                whitespace: true,
                                message: "Vui lòng nhập dữ liệu",
                            },
                        ]}
                    >
                        <Input placeholder="Kích cỡ" width={50} />
                    </Form.Item>
                    <Form.Item label={"Trạng thái"} name="trangThai">
                        <Switch checkedChildren="hoạt động" unCheckedChildren="tạm ngưng" />
                    </Form.Item>
                    <Button key={"submit"} type="primary" htmlType="submit">
                        {isCheck.current == 1 ? "Thêm" : "Cập nhật"}
                    </Button>
                </Form>
            </Modal>
            {/* // End modal */}
        </div>
    );
}

export default KichCoPage