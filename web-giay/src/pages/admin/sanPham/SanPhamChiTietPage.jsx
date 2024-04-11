import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SanPhamService from "../../../services/SanPhamService";
import ChiTietSanPhamService from "./../../../services/ChiTietSanPhamService";
import {
    Button,
    Card,
    Col,
    Slider,
    Input,
    Row,
    Select,
    Space,
    Table,
    Typography,
    Avatar,
    Tooltip,
    Tag,
} from "antd";
import { FilterFilled } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import DeGiayService from "../../../services/DeGiayService";
import ChatLieuService from "../../../services/ChatLieuService";
import KichCoService from "../../../services/KichCoService";
import MauSacService from "../../../services/MauSacService";
import ModalSuaThongTin from "./ModalEditCTSP";
import { formatPrice } from "../../../utils/formatNumber";

const SanPhamChiTietPage = () => {
    const formatter = (value) => {
        const formattedValue = value.toLocaleString("en-US");
        return <span>{formattedValue} VND</span>;
    };

    const params = useParams();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [sanPham, setSanPham] = useState();
    const [sanPhamChiTiet, setSanPhamChiTiet] = useState([]);

    const [filter, setFilter] = useState({
        searchText: "",
        mauSac: "",
        kichCo: "",
        deGiay: "",
        chatLieu: "",
        minGia: 0,
        maxGia: 5000000,
        trangThai: "",
    });

    useEffect(() => {
        let res = ChiTietSanPhamService.filter(filter);
    }, [filter]);

    // load data
    // const [sanPhams, setSanPhams] = useState([]);
    const [deGiays, setDeGiays] = useState([]);
    const [chatLieus, setChatLieus] = useState([]);
    const [kichCos, setKichCos] = useState([]);
    const [mauSacs, setMauSacs] = useState([]);
    useEffect(() => {
        const getDaTa = async () => {
            // let resSanPhams = await SanPhamService.getAll();
            let resDeGiays = await DeGiayService.getAll();
            let resChatLieus = await ChatLieuService.getAll();
            let resKichCos = await KichCoService.getAll();
            let resMauSacs = await MauSacService.getAll();

            // setSanPhams([...resSanPhams]);
            setDeGiays([...resDeGiays]);
            setChatLieus([...resChatLieus]);
            setKichCos([...resKichCos]);
            setMauSacs([...resMauSacs]);
        };
        getDaTa();
    }, []);

    //
    let getSPById = async () => {
        let res = await SanPhamService.getById(params.id);
        setSanPham({ ...res });
    };
    let getSPCTById = async () => {
        let res = await ChiTietSanPhamService.getAllBySP(params.id);
        setSanPhamChiTiet([...res]);
    };
    useEffect(() => {
        getSPById();
        getSPCTById();
    }, [load]);

    const columns = [
        {
            title: "#",
            // dataIndex: "ten",
            width: 50,
            render: (_, record, index) => <Typography.Text strong>{index + 1}</Typography.Text>,
        },
        {
            title: "Tên",
            dataIndex: "ten",
            render: (text, record) => (
                <>
                    <Avatar size={64} shape="square" src={record?.anhs[0]?.url} />
                </>
            ),
        },
        {
            title: "Tên",
            dataIndex: "ten",
            render: (text, record) => (
                <>
                    <Typography.Text>{text}</Typography.Text>
                </>
            ),
        },
        {
            title: "Màu sắc",
            dataIndex: "ten",
            render: (text, record) => <Typography.Text>{record.mauSac.ten}</Typography.Text>,
        },
        {
            title: "Kích cỡ",
            dataIndex: "ten",
            render: (text, record) => <Typography.Text>{record.kichCo.ten}</Typography.Text>,
        },
        {
            title: "Đế giày",
            dataIndex: "ten",
            render: (text, record) => <Typography.Text>{record.deGiay.ten}</Typography.Text>,
        },
        {
            title: "Chất liệu",
            dataIndex: "ten",
            render: (text, record) => <Typography.Text>{record.chatLieu.ten}</Typography.Text>,
        },
        {
            title: "Số lượng",
            dataIndex: "soLuong",
            width: 30,
            render: (text, record, index) => <Typography.Text>{record?.soLuong}</Typography.Text>,
        },
        {
            title: "Đơn giá",
            dataIndex: "giaBan",
            width: 120,
            render: (text, record, index) => (
                <>
                    <Typography.Text>{formatPrice(text)}</Typography.Text>
                </>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "trangThai",
            width: 150,
            render: (trangThai, record) => {
                const color = trangThai ? "green" : "blue";
                return <Tag color={color}>{trangThai ? "Hoạt động" : "Ngưng hoạt động"}</Tag>;
            },
        },
        {
            title: "Action",
            width: 50,
            render: (_, record, index) => (
                <>
                    <ModalSuaThongTin
                        load={load}
                        setLoad={setLoad}
                        chiTietSP={record}
                        deGiays={deGiays}
                        chatLieus={chatLieus}
                        kichCos={kichCos}
                        mauSacs={mauSacs}
                    />
                </>
            ),
        },
    ];

    return (
        <>
            {/* <Button onClick={() => console.log(sanPhamChiTiet)}>log</Button> */}
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
                        <Col span={12}>
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
                                placeholder="tìm kiếm "
                            />
                        </Col>
                        <Col span={10}></Col>
                        <Col span={6}>
                            <label className="form-label me-1 ">Kích cỡ : </label>
                            <Select
                                className="w-100"
                                placeholder="Kích cỡ"
                                // value={filter.kichCo}
                                onChange={(e) => setFilter({ ...filter, kichCo: e })}
                            >
                                {/* <Select.Option value={""}>Tất cả</Select.Option> */}
                                {kichCos?.map((de, index) => (
                                    <Select.Option key={index} value={de?.id}>
                                        {de?.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                        <Col span={6}>
                            <label className="form-label me-1 ">Màu sắc : </label>
                            <Select
                                className="w-100"
                                placeholder="Màu sắc"
                                // value={filter.mauSac}
                                onChange={(e) => setFilter({ ...filter, mauSac: e })}
                            >
                                {/* <Select.Option value={""}>Tất cả</Select.Option> */}
                                {mauSacs?.map((sp, index) => (
                                    <Select.Option key={index} value={sp?.id}>
                                        {sp?.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                        <Col span={6}>
                            <label className="form-label me-1 ">Đế giày: </label>
                            <Select
                                className="w-100"
                                placeholder="Đế giày"
                                // value={filter.deGiay}
                                onChange={(e) => setFilter({ ...filter, deGiay: e })}
                            >
                                {/* <Select.Option value={""}>Tất cả</Select.Option> */}
                                {deGiays?.map((sp, index) => (
                                    <Select.Option key={index} value={sp?.id}>
                                        {sp?.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                        <Col span={6}>
                            <label className="form-label me-1 ">Chất liệu : </label>
                            <Select
                                className="w-100"
                                placeholder="Chất liệu"
                                // defaultValue={filter.chatLieu}
                                mode="multiple"
                                onChange={(e) => setFilter({ ...filter, chatLieu: e })}
                            >
                                {/* <Select.Option value={""}>Tất cả</Select.Option> */}
                                {chatLieus?.map((sp, index) => (
                                    <Select.Option key={index} value={sp?.id}>
                                        {sp?.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                        <Col span={6}>
                            <label className="form-label me-1 ">Trạng thái : </label>
                            <Select
                                className="w-100"
                                placeholder="Trạng thái"
                                name="trangThai"
                                // value={filter.trangThai}
                                onChange={(e) => setFilter({ ...filter, trangThai: e })}
                            >
                                <Select.Option value={""}>Tất cả</Select.Option>
                                <Select.Option value={"1"}>Hoạt động</Select.Option>
                                <Select.Option value={"0"}>Dừng</Select.Option>
                            </Select>
                        </Col>
                        <Col span={18}>
                            <label className="form-label me-1 ">Khoảng giá : </label>
                            <Slider
                                max={10000000}
                                range
                                step={100000}
                                tipFormatter={formatter}
                                value={[filter?.minGia, filter?.maxGia]}
                                onChange={(e) => {
                                    setFilter({ ...filter, minGia: e[0], maxGia: e[1] });
                                }}
                            />
                        </Col>
                        <Col span={24}>
                            <Space className="d-flex align-items-center  justify-content-center  ">
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setFilter({
                                            searchText: "",
                                            trangThai: "",
                                            chatLieu: "",
                                            deGiay: "",
                                            mauSac: "",
                                            kichCo: "",
                                            minGia: 0,
                                            maxGia: 10000000,
                                        });
                                    }}
                                >
                                    Làm mới
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                <Card>
                    <Table
                        columns={columns}
                        dataSource={sanPhamChiTiet}
                        key={"id"}
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </Card>
            </Space>
        </>
    );
};

export default SanPhamChiTietPage;
