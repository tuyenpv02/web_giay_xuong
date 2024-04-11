import { ToastContainer } from "react-toastify";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutKhachHang from "./layouts/layoutKhachHang/LayoutKhachHang";
import LayoutAdmin from "./layouts/layoutAdmin/LayoutAdmin";
import { HomePage } from "./pages/client";
import CartPage from "./pages/client/cart/CartPage";
import {
    BanHangPage,
    ChatLieuPage,
    DashboardPage,
    DeGiayPage,
    GiamGiaPage,
    HoaDonPage,
    KhachHangPage,
    KichCoPage,
    MauSacPage,
    NhanVienPage,
    SanPhamPage,
    ThuongHieuPage,
} from "./pages/admin";
import NhanVienAdd from "./pages/admin/taiKhoan/nhanVien/NhanVienAdd";
import NhanVienEdit from "./pages/admin/taiKhoan/nhanVien/NhanVienEdit";
import HoaDonChiTietPage from "./pages/admin/hoaDon/HoaDonChiTietPage";
import SanPhamAddPage from "./pages/admin/sanPham/SanPhamAddPage";
import SanPhamChiTietPage from "./pages/admin/sanPham/SanPhamChiTietPage";

function App() {
    return (
        <>
            <div className="">
                <ToastContainer theme="colored" autoClose={1000} />
                <Routes>
                    <Route path="/" element={<LayoutKhachHang />}>
                        <Route index path="*" element={<HomePage />}></Route>
                        <Route path="cart" element={<CartPage />}></Route>
                    </Route>

                    <Route path="/admin" element={<LayoutAdmin />}>
                        <Route index path="*" element={<DashboardPage />}></Route>
                        <Route path="ban-hang" element={<BanHangPage />}></Route>

                        <Route path="hoa-don" element={<HoaDonPage />}></Route>
                        <Route
                            path="hoa-don/hoa-don-chi-tiet/:id"
                            element={<HoaDonChiTietPage />}
                        ></Route>

                        <Route path="san-pham" element={<SanPhamPage />}></Route>
                        <Route path="san-pham/add" element={<SanPhamAddPage />}></Route>
                        <Route path="san-pham/detail/:id" element={<SanPhamChiTietPage />}></Route>


                        <Route path="chat-lieu" element={<ChatLieuPage />} />
                        <Route path="de-giay" element={<DeGiayPage />} />
                        <Route path="kich-co" element={<KichCoPage />} />
                        <Route path="thuong-hieu" element={<ThuongHieuPage />} />
                        <Route path="mau-sac" element={<MauSacPage />} />

                        <Route path="nhan-vien" element={<NhanVienPage />}></Route>
                        <Route path="nhan-vien/add" element={<NhanVienAdd />}></Route>
                        <Route path="nhan-vien/edit/:id" element={<NhanVienEdit />}></Route>

                        <Route path="khach-hang" element={<KhachHangPage />}></Route>

                        <Route path="giam-gia" element={<GiamGiaPage />}></Route>
                    </Route>
                </Routes>
                {/* <AllRoute /> */}
            </div>
        </>
    );
}

export default App;
