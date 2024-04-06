import { Avatar, Button, Col, Empty, Row, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SanPhamService from "../../../services/SanPhamService";
import { EditOutlined } from "@ant-design/icons";

function SanPhamPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let res = await SanPhamService.getAll();
            setData([...res]);
        };
        getData();
    }, []);

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => <a>{index + 1}</a>,
        },
        {
            title: "Tên",
            dataIndex: "ten",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Thuong hiệu",
            dataIndex: "ten",
            render: (text, record) => <a>{record.thuongHieu.ten}</a>,
        },

        {
            title: "Trạng thái",
            dataIndex: "trangThai",
            render: (trangThai, record) => {
                const color = trangThai ? "green" : "red";
                return <Tag color={color}>{trangThai ? "hoạt động" : "ngưng"}</Tag>;
            },
        },
        {
            title: "Action",
            render: (_, record) => (
                <>
                    <Button type="text" onClick={() => navigate("edit/" + record.id)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <h2>Sản phẩm</h2>

            <div className="p-2 bg-body-tertiary rounded box-shadow">
                <Row className="mb-2 " gutter={[10, 10]}>
                    <Col span={8}>
                        <label htmlFor="" className="form-label ">
                            Nhập
                        </label>
                        <input
                            className=" form-control"
                            name="searchText"
                            placeholder="tìm kiếm "
                            type="text"
                            // value={searchText}
                            // onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                    <Col span={8}>
                        <label htmlFor="" className="form-label ">
                            Trạng thái
                        </label>
                        <select
                            className="form-select w-50"
                            name="trangThai"
                            // value={trangThai}
                            // onChange={(e) => setTrangThai(e.target.value)}
                        >
                            <option value=" ">Tất cả</option>
                            <option value="0">Đang bán</option>
                            <option value="1">Ngưng bán</option>
                        </select>
                    </Col>
                    <Col span={8}>
                        <Space className="d-flex align-items-end w-100 h-100 justify-content-center  ">
                            <Button
                                type="primary"
                                onClick={() => {
                                    navigate("add");
                                }}
                            >
                                Thêm sản phẩm
                            </Button>
                            {/* <Button
                                type="primary"
                                onClick={() => {
                                    alert("chưa");
                                }}
                            >
                                Xuất excel
                            </Button> */}
                        </Space>
                    </Col>
                </Row>
                {/* table */}
                {data.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey={"id"}
                        pagination={{
                            position: ["bottomCenter"],
                            pageSize: 5,
                        }}
                    ></Table>
                ) : (
                    <Empty />
                )}
            </div>
        </>
    );
}

export default SanPhamPage;
