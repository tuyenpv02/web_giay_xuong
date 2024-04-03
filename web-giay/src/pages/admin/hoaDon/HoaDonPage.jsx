import {
    FilterFilled,
    PlusSquareOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    DatePicker,
    Input,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import HoaDonService from "../../../services/HoaDonService";
import { formatPrice } from "../../../utils/formatNumber";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { formatTrangThaiHD } from "../../../utils/formatTrangThaiHD";

function HoaDonPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        searchText: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        loaiHoaDon: "",
        trangThai: "",
    });

    useEffect(() => {
        let getAllHD = async () => {
            let res = await HoaDonService.getAll();
            setData([...res]);
        };
        getAllHD();
    }, []);

    useEffect(() => {
        let filterHoaDon = async () => {
            let res = await HoaDonService.filter(filter);
            // console.log(res);
            setData([...res]);
        };
        filterHoaDon();
    }, [filter]);

    const columns = [
        {
            title: "#",
            render: (_, record, index) => <a>{index + 1}</a>,
        },
        {
            title: "Mã",
            dataIndex: "ma",
            render: (text) => <b>{text}</b>,
        },
        {
            title: "Khách hàng",
            dataIndex: "hoTen",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Nhân viên",
            dataIndex: "nguoiTao",
            render: (nguoiTao) => {
                const color = nguoiTao ? "green" : "geekblue";
                return <Tag color={color}>{nguoiTao ? nguoiTao : "System"}</Tag>;
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "ngayTao",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Loại đơn hàng",
            dataIndex: "loaiHoaDon",
            render: (loaiHoaDon) => {
                const color = loaiHoaDon ? "green" : "blue";
                return <Tag color={color}>{loaiHoaDon ? "Tại quầy" : "Trực tuyến"}</Tag>;
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "tongTien",
            render: (text) => formatPrice(text),
        },
        {
            title: "Trạng thái",
            dataIndex: "trangThai",
            render: (trangThai, record) => {
                const color = trangThai ? "green" : "blue";
                return <Tag color={color}>{formatTrangThaiHD(trangThai)}</Tag>;
            },
        },
        {
            title: "Action",
            render: (_, record) => (
                <>
                    <Button type="text" onClick={()=>{
                        navigate('hoa-don-chi-tiet/'+record.id)
                    }}>
                        <i className="fa-solid fa-eye "></i>
                    </Button>
                </>
            ),
        },
    ];
    return (
        <>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: "flex",
                }}
            >
                <Card
                    title={
                        <Typography.Title level={4}>
                            <FilterFilled /> Bộ lọc
                        </Typography.Title>
                    }
                    size="default"
                >
                    <Row align={"middle"} gutter={[30, 10]}>
                        <Col span={8}>
                            {/* <label className="form-label">tìm kiếm</label> */}
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
                                placeholder="tìm kiếm hóa đơn"
                            />
                        </Col>

                        <Col span={8}>
                            {" "}
                            <DatePicker.RangePicker
                                placeholder={["ngày bắt đầu", "ngày kết thúc"]}
                                name="ngayTim"
                                value={
                                    filter.ngayBatDau && filter.ngayKetThuc
                                        ? [
                                              moment(filter.ngayBatDau, "yyyy-MM-DD"),
                                              moment(filter.ngayKetThuc, "yyyy-MM-DD"),
                                          ]
                                        : null
                                }
                                onChange={(date, dateString) => {
                                    // console.log(date, dateString);
                                    setFilter({
                                        ...filter,
                                        ngayBatDau: dateString[0],
                                        ngayKetThuc: dateString[1],
                                    });
                                }}
                                style={{
                                    width: "100%",
                                }}
                            />
                        </Col>
                        <Col span={8}>
                            {/* <label className="form-label">ngày tìm kiếm</label> */}
                        </Col>
                        <Col span={8}>
                            <label className="form-label me-1 ">loại : </label>
                            <Select
                                className=" w-50"
                                placeholder="loại hóa đơn"
                                name="loaiHoaDon"
                                value={filter.loaiHoaDon}
                                onChange={(e) => setFilter({ ...filter, loaiHoaDon: e })}
                            >
                                <Option value={""}>Tất cả</Option>
                                <Option value={"1"}>Tại quầy</Option>
                                <Option value={"0"}>Trực tuyến</Option>
                            </Select>
                        </Col>

                        <Col span={10}>
                            <label className="form-label me-1 ">Trạng thái : </label>
                            <Select
                                className="w-50"
                                placeholder="Trạng thái"
                                name="trangThai"
                                value={filter.trangThai}
                                onChange={(e) => setFilter({ ...filter, trangThai: e })}
                            >
                                <Option value={""}>tất cả</Option>
                                <Option value={"0"}>hủy</Option>
                                {/* <Option value={"1"}>hủy</Option> */}
                                <Option value={"2"}>chờ xác nhận</Option>
                                <Option value={"3"}>chờ vận chuyển</Option>
                                <Option value={"4"}>đang giao hàng</Option>
                                <Option value={"5"}>đã thanh toán</Option>
                                <Option value={"6"}>hoàn thành</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Space className="d-flex align-items-center  justify-content-center  ">
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setFilter({
                                            searchText: "",
                                            ngayBatDau: "",
                                            ngayKetThuc: "",
                                            loaiHoaDon: "",
                                            trangThai: "",
                                        });
                                    }}
                                >
                                    Làm mới
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
                </Card>
                <Card
                    title={
                        <Typography.Title level={4}>
                            <i className="fa-solid fa-list"></i> Danh sách đơn hàng
                        </Typography.Title>
                    }
                    extra={
                        <Button type="primary" icon={<PlusSquareOutlined />} onClick={()=> navigate('/admin/ban-hang')}>
                             
                            Tạo hóa đơn
                        </Button>
                    }
                    size="small"
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        key={"id"}
                        pagination={{
                            position: ["bottomCenter"],
                            pageSize: 5,
                        }}
                    />
                </Card>
            </Space>
        </>
    );
}

export default HoaDonPage;
