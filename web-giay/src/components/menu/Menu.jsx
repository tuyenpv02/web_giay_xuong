import { Menu } from "antd";
import { ProductOutlined } from "@ant-design/icons";
import { Link,  } from "react-router-dom";

function getItem(label, key, icon, children, type) {
    return {
        label,
        key,
        icon,
        children,
        type,
    };
}

const items = [
    {
        key: "1",
        icon: <i className="fa-solid fa-chart-pie"></i>,
        label: (
            <Link className="text-decoration-none" to={'/admin'}>
                Dashboard
            </Link>
        ),
    },
    {
        key: "2",
        label: (
            <Link className="text-decoration-none" to={'ban-hang'}>
                Bán hàng
            </Link>
        ),
        icon: <i className="fa-solid fa-shop"></i>,
    },
    {
        key: "3",
        label: (
            <Link className="text-decoration-none" to={'hoa-don'}>
                Quản lý đơn hàng
            </Link>
        ),
        icon: <i className="fa-solid fa-money-bill"></i>,
    },
    {
        key: "4",
        label: "Quản lý sản phẩm",
        icon: <ProductOutlined />,
        children: [
            {
                key: "4a",
                label: (
                    <>
                        <Link className="text-decoration-none" to={'san-pham'}>
                            Sản phẩm
                        </Link>
                    </>
                ),
            },
            {
                key: "4b",
                label: (
                    <>
                        <Link className="text-decoration-none" to={'de-giay'}>
                            Đế giày
                        </Link>
                    </>
                ),
            },
            {
                key: "4c",
                label: (
                    <>
                        <Link className="text-decoration-none" to={'chat-lieu'}>
                            Chất liệu
                        </Link>
                    </>
                ),
            },
            {
                key: "4d",
                label: (
                    <>
                        <Link className="text-decoration-none" to={'thuong-hieu'}>
                            Thương hiệu
                        </Link>
                    </>
                ),
            },
            {
                key: "4e",
                label: (
                    <>
                        <Link className="text-decoration-none" to={'mau-sac'}>
                            Màu sắc
                        </Link>
                    </>
                ),
            },
            {
                key: "4f",
                label: (
                    <>
                        <Link className="text-decoration-none" to={'kich-co'}>
                           Kích cỡ
                        </Link>
                    </>
                ),
            },
        ],
    },
    {
        key: "5",
        label: "Quản lý tài khoản",
        icon: <i className="fa-solid fa-user"></i>,
        children: [
            {
                key: "5a",
                label: (
                    <>
                        <Link className="text-decoration-none" to={'khach-hang'}>
                            Khách hàng
                        </Link>
                    </>
                ),
            },
            {
                key: "5b",
                label:   <>
                <Link className="text-decoration-none" to={'nhan-vien'}>
                    Nhân viên
                </Link>
            </>,
            },
        ],
    },
    {
        key: "6",
        label: (
            <>
                <Link className="text-decoration-none" to={'giam-gia'}>
                    Giảm giá
                </Link>
            </>
        ),
        icon: <i className="fa-solid fa-ticket-simple"></i>,
    },
    {
        key: "7",
        label: "Thoát",
        icon: <i className="fa-solid fa-right-from-bracket"></i>,
    },
];

function MenuSider() {
    return (
        <>
            <Menu theme="light" mode="inline" items={items} />
        </>
    );
}

export default MenuSider;
