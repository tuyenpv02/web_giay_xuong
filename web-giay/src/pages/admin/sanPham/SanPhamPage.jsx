import { Input, Button, Col, Empty, Row, Select, Space, Table, Tag,Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SanPhamService from "../../../services/SanPhamService";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import ModalSuaThemSP from "./ModalSuaSanPham";

function SanPhamPage() { 
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const [filter, setFilter] = useState({
        searchText: "",
        trangThai: "",
    });

    useEffect(() => {
        const getData = async () => {
            let res = await SanPhamService.getAll();
            setData([...res]);
        };
        getData();
    }, [load]);

    useEffect(() => {
        // console.log(filter);
        let filterHoaDon = async () => {
            let res = await SanPhamService.filter(filter);
            setData([...res]);
        };
        filterHoaDon();
    }, [filter]);

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => <Typography.Text strong>{index + 1}</Typography.Text>,
        },
        {
            title: "Tên",
            dataIndex: "ten",
            width: 400,
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
            width: 150,
            render: (_, record) => (
                <>
                    <ModalSuaThemSP load={load} setLoad={setLoad} sanPhamEdit={record}  />
                    <Button
                        type="text"
                        onClick={() => {
                            navigate("detail/" + record.id);
                        }}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <h3>Sản phẩm</h3>

            <div className="p-2 bg-body-tertiary rounded box-shadow">
                <Row className="mb-2 " gutter={[10, 10]}>
                    <Col span={8}>
                        <Input
                            value={filter.searchText}
                            name={filter.searchText}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    searchText: e.target.value,
                                })
                            }
                            prefix={<SearchOutlined />}
                            placeholder="tìm kiếm"
                        />
                    </Col>
                    <Col span={8}>
                        <Select
                            className=" w-75 "
                            placeholder="Trạng thái"
                            name="loaiHoaDon"
                            value={filter.trangThai}
                            onChange={(e) => setFilter({ ...filter, trangThai: e })}
                        >
                            <Select.Option value={""}>Tất cả</Select.Option>
                            <Select.Option value={"1"}>Hoạt động</Select.Option>
                            <Select.Option value={"0"}>Dừng</Select.Option>
                        </Select>
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
