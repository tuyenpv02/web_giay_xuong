import { Button, Space, Select, Modal, Input, Flex, Form } from "antd";
import ThuongHieuService from "../../../services/ThuongHieuService";
import { useEffect, useState } from "react";
import SanPhamService from "../../../services/SanPhamService";
import { toast } from "react-toastify";

const ModalSuaThemSP = ({ load, setLoad, sanPhamEdit }) => {
    const [thuongHieus, setThuongHieus] = useState([]);
    const [sanPham, setSanPham] = useState({
        thuongHieu: { id: null },
        ten: "",
        moTa: "",
        trangThai: 1,
    });
    const getData = async () => {
        try {
            let res = await ThuongHieuService.getAll();
            setThuongHieus([...res]);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
        setSanPham({
            thuongHieu: sanPhamEdit?.thuongHieu?.id,
            ten: sanPhamEdit?.ten,
            moTa: sanPhamEdit?.moTa,
            trangThai: sanPhamEdit?.trangThai,
        });
    }, []);

    // Open Modal thay đổi thông tin
    const [modalSuaThongTin, setModalSuaThongTin] = useState(false);
    const ShowSuaModalThongTin = () => {
        setModalSuaThongTin(true);
    };
    const handleCancelModalSuaThongTin = () => {
        setModalSuaThongTin(false);
    };

    const themSanPham = async () => {
        const data = {
            ten: sanPham.ten,
            moTa: sanPham.moTa,
            thuongHieu: { id: sanPham.thuongHieu },
            trangThai: sanPham.trangThai ? 1 : 0,
        };
        // console.log(sanPhamEdit?.id, data);
        SanPhamService.update(sanPhamEdit?.id, data)
            .then((res) => {
                setLoad(!load);
                toast.success("thành công");
                handleCancelModalSuaThongTin();
            })
            .catch((err) => {
                toast.error("thất bại");
                console.log(err);
            });
    };

    return (
        <>
            <Button  type="text" onClick={(e) => setModalSuaThongTin(true)}>
                <i className="fa-solid fa-eye"></i>
            </Button>
            {/* modal thay đổi thông tin */}
            <Modal
                width={400}
                title={"Sửa sản phẩm"}
                open={modalSuaThongTin}
                onCancel={handleCancelModalSuaThongTin}
                footer={false}
            >
                <Flex vertical justify="center" gap={"small"} style={{ width: "100%" }}>
                    <Input
                        value={sanPham.ten}
                        onChange={(e) =>
                            setSanPham({
                                ...sanPham,
                                ten: e.target.value,
                            })
                        }
                    />
                    <Select
                        value={sanPham.thuongHieu}
                        style={{ width: "100%" }}
                        placeholder="Thương hiệu"
                        onChange={(e) =>
                            setSanPham({
                                ...sanPham,
                                thuongHieu: e,
                            })
                        }
                    >
                        {thuongHieus?.map((de, index) => (
                            <Select.Option key={index} value={de?.id}>
                                {de?.ten}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select
                        value={sanPham.trangThai}
                        style={{ width: "100%" }}
                        placeholder="Trạng thái"
                        onChange={(e) =>
                            setSanPham({
                                ...sanPham,
                                trangThai: e,
                            })
                        }
                        defaultValue={1}
                    >
                        <Select.Option value={1}>Hoạt động</Select.Option>{" "}
                        <Select.Option value={0}>Ngưng hoạt động</Select.Option>
                    </Select>
                    <Input.TextArea
                        value={sanPham.moTa}
                        onChange={(e) =>
                            setSanPham({
                                ...sanPham,
                                moTa: e.target.value,
                            })
                        }
                    />
                    <Flex justify="end">
                        <Button onClick={() => themSanPham()}>Cập nhật</Button>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};

export default ModalSuaThemSP;
