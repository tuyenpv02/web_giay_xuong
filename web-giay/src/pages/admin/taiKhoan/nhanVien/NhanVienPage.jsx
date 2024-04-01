import { Avatar, Button, Col, Empty, Row, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import "../nhanVien/nhanVien.css";
import { useDispatch, useSelector } from "react-redux";
import nhanVienService from "../../../../services/NhanVienService";
import { getAllNhanVien } from "../../../../redux-toolkit/actions/nhanVienAction";
import nhanVienSlice from "../../../../redux-toolkit/nhanVienSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Option } from "antd/es/mentions";

function NhanVienPage() {
    const navigate = useNavigate();
    const ditpatch = useDispatch();
    const { data } = useSelector((state) => state.nhanVien);
    const [trangThai, setTrangThai] = useState("");
    const [searchText, setSearchText] = useState("");

    const getData = async () => {
        try {
            ditpatch(getAllNhanVien());
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        let getFilter = async () => {
            let res = await nhanVienService.filterNhanVien(searchText, trangThai);
            ditpatch(nhanVienSlice.actions.fetchData(res));
        };
        getFilter();
    }, [trangThai, searchText]);

    const xoaNhanVien = async (id) => {
        try {
            await nhanVienService.delete(id);
            toast.success("Xóa thành công");
            getData();
        } catch (err) {
            toast.warning("Xóa Thất bại");
            console.log(err);
        }
    };

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
            title: "Sdt",
            dataIndex: "sdt",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Giới tính",
            dataIndex: "gioiTinh",
            render: (text) => <a>{text == 1 ? "Nam" : "Nữ"}</a>,
        },
        {
            title: "Trạng thái",
            dataIndex: "trangThai",
            render: (trangThai, record) => {
                const color = trangThai ? "green" : "red";
                return <Tag color={color}>{trangThai ? "hoạt động" : "tạm ngưng"}</Tag>;
            },
        },
        {
            title: "Action",
            render: (_, record) => (
                <>
                    <Space>
                        <Button onClick={() => navigate("edit/" + record.id)}>Sửa</Button>
                        <Button onClick={() => xoaNhanVien(record.id)}>Xóa</Button>
                    </Space>
                </>
            ),
        },
    ];

    // UI
    return (
        <div>
            <h2>Nhân viên</h2>
            {/* <br /> */}
            <div className="p-2 bg-body-tertiary rounded box-shadow">
                <Row className="mb-2 " gutter={[10, 10]}>
                    <Col span={8}>
                        <label htmlFor="" className="form-label ">
                            Nhập
                        </label>
                        <input
                            className=" form-control"
                            name="searchText"
                            placeholder="tìm kiếm theo tên, sdt, email"
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                    <Col span={8}>
                        <label htmlFor="" className="form-label ">
                            Trạng thái
                        </label>
                        <select
                            className="form-select w-50"
                            name="trangThai"
                            value={trangThai}
                            onChange={(e) => setTrangThai(e.target.value)}
                        >
                            <option value=" ">Tất cả</option>
                            <option value="0">Nghỉ</option>
                            <option value="1">Hoạt động</option>
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
                                Thêm Nhân Viên
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {
                                    alert("chưa");
                                }}
                            >
                                Xuất excel
                            </Button>
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
        </div>
    );
}

export default NhanVienPage;
