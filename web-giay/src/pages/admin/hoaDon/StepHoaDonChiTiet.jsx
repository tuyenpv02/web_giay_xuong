import { Avatar, Steps, Typography } from "antd";
import { formatTrangThaiHD } from "../../../utils/formatTrangThaiHD";
import { FileTextOutlined, WarningOutlined } from "@ant-design/icons";
const { Step } = Steps;
const StepHoaDonChiTiet = ({ lichSuHoaDon }) => {
    return (
        <>
            <Steps labelPlacement="vertical" style={{ overflowY: "auto" }}>
                {lichSuHoaDon?.map((step) => {
                    return (
                        step.hanhDong != 2 && (
                            <Step
                                style={{ maxWidth: "200px" }}
                                icon={
                                    step.trangThai == 0 ? (
                                        <Avatar
                                            size={"large"}
                                            style={{
                                                backgroundColor: "#e04927",
                                                verticalAlign: "middle",
                                            }}
                                            icon={<WarningOutlined />}
                                        />
                                    ) : (
                                        <Avatar
                                            size={"large"}
                                            style={{
                                                backgroundColor: "#26b726",
                                                verticalAlign: "middle",
                                            }}
                                            icon={<FileTextOutlined />}
                                        />
                                    )
                                }
                                title={
                                    <Typography.Title color="blue" level={4}>
                                        {formatTrangThaiHD(step?.trangThai)}
                                    </Typography.Title>
                                }
                                subTitle={step.ngayTao}
                                key={step.id}
                            ></Step>
                        )
                    );
                })}
            </Steps>
        </>
    );
};

export default StepHoaDonChiTiet;
