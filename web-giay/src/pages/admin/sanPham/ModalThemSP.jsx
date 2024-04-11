import { Button, Space, Select, Modal, Input, Flex, Form } from "antd";
import ThuongHieuService from "../../../services/ThuongHieuService";
import { useEffect, useState } from "react";
import SanPhamService from "../../../services/SanPhamService";
import { toast } from "react-toastify";

const ModalThemSP = ({ disabledThongTin, load, setLoad }) => {
    const [thuongHieus, setThuongHieus] = useState([]);
    const [sanPham, setSanPham] = useState({
        thuongHieu: { id: null },
        ten: "",
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
        // console.log(sanPham);
        const data = {
            ten: sanPham.ten,
            thuongHieu: sanPham.thuongHieu,
            trangThai: 1,
        };

        SanPhamService.add(data)
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
            <Button disabled={disabledThongTin} onClick={(e) => setModalSuaThongTin(true)}>
                <i className="fa-solid fa-plus"></i>
            </Button>
            {/* modal thay đổi thông tin */}
            <Modal
                width={500}
                title={"Thêm sản phẩm"}
                open={modalSuaThongTin}
                onCancel={handleCancelModalSuaThongTin}
                footer={false}
            >
                <Flex vertical justify="center" gap={"small"} style={{ width: "75%" }}>
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
                        disabled={disabledThongTin}
                        style={{ width: "100%" }}
                        placeholder="chọn đế"
                        onChange={(e) =>
                            setSanPham({
                                ...sanPham,
                                thuongHieu: { id: e },
                            })
                        }
                    >
                        {thuongHieus?.map((de, index) => (
                            <Select.Option key={index} value={de?.id}>
                                {de?.ten}
                            </Select.Option>
                        ))}
                    </Select>
                    <Flex justify="end">
                        <Button onClick={() => themSanPham()}>Thêm</Button>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};

export default ModalThemSP;
