import { Avatar, Col, Image, Layout, Menu, Row, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { UserOutlined, MenuUnfoldOutlined, BellOutlined } from "@ant-design/icons";
import MenuSider from "../../components/menu/Menu";
import { Outlet } from "react-router-dom";
import '../layoutKhachHang/layoutKhach.css'

function LayoutKhachHang() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Layout >
                <Sider
                    collapsed={collapsed}
                    theme="light"
                    width={230}
                    style={{
                        position: "sticky",
                        overflow: 'auto',
                        height:'100vh',
                        top: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    <div className="demo-logo-vertical ">
                        {/* <img
                            className="img-fluid"
                            src="https://kenh14cdn.com/Images/Uploaded/Share/2010/09/14/190810adidas02.jpg"
                            alt=""
                        /> */}
                        <Image
                            preview={false}
                            src="https://jana.vn/wp-content/uploads/2022/08/thiet-ke-logo-shop-giay-3.jpg"
                        />
                        <hr className="p-0" />
                    </div>
                    <MenuSider />
                </Sider>
                <Layout>
                    <Header className="bg-white p-0 opacity-75  ">
                        <Row>
                            <Col span={12}>
                                <div className="header-collapse ">
                                    <MenuUnfoldOutlined
                                        onClick={() => setCollapsed(!collapsed)}
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <Row justify={"end"}>
                                    <Avatar
                                        icon={<UserOutlined />}
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style={{
                            margin: "5px 8px",
                            padding: 12,
                            minHeight: '100vh',
                            background: "white",
                        }}
                    >
                        Content
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default LayoutKhachHang;
