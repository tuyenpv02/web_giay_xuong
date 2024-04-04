/* eslint-disable react/prop-types */
import { Col, Row, Tag, Typography } from "antd";
import { formatPrice } from "../../../utils/formatNumber";
import { formatTrangThaiHD } from "../../../utils/formatTrangThaiHD";
import { TachDiaChiVN } from "../../../utils/TachDiaChiVN";

const ThongTinHDCT = ({ hoaDon }) => {
    return (
        <>
            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong htmlFor="">
                                Trạng thái:
                            </Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Tag color="blue">{formatTrangThaiHD(hoaDon?.trangThai)} </Tag>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>Tên khách hàng:</Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Typography.Text>
                                {/* {hoaDon?.taiKhoan ? hoaDon?.hoTen : ""} */}
                                {hoaDon?.hoTen ? hoaDon?.hoTen : ""}
                            </Typography.Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>Loại:</Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Tag color="purple">
                                {hoaDon?.loaiHoaDon ? "tại quầy" : "trực tuyến"}
                            </Tag>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>Số điện thoại:</Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Typography.Text>{hoaDon?.sdt} </Typography.Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>Tổng tiền:</Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Typography.Text>{formatPrice(hoaDon?.tongTien)} </Typography.Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>Phí vận chuyển:</Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Typography.Text>{formatPrice(hoaDon?.tienShip)} </Typography.Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>Địa chỉ:</Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Typography.Text>
                                {hoaDon?.diaChi ?  hoaDon?.diaChi : "Không có"}
                               
                            </Typography.Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>Ghi chú:</Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Typography.Text>
                                {hoaDon?.ghiChu ? hoaDon?.ghiChu : "Không có"}{" "}
                            </Typography.Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default ThongTinHDCT;
