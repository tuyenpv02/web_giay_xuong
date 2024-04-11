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
                
            </Layout>
        </>
    );
}

export default LayoutKhachHang;
