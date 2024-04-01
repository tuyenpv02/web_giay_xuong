// import {configureStore} from '@reduxjs/toolkit'

import { configureStore } from "@reduxjs/toolkit";
import sanPhamSlice from "../redux-toolkit/sanPhamSlice";
import chiTietSanPhamSlice from "./../redux-toolkit/chiTietSanPhamSlice";
import giamGiaSlice from "./../redux-toolkit/giamGiaSlice";
import gioHangSlice from "./../redux-toolkit/gioHangSlice";
import hoaDonChiTietSlice from "./../redux-toolkit/hoaDonChiTietSlice";
import hoaDonSlice from "./../redux-toolkit/hoaDonSlice";
import lichSuHoaDonSlice from "./../redux-toolkit/lichSuHoaDonSlice";
import phuongThucThanhToanSlice from "./../redux-toolkit/phuongThucThanhToanSlice";
import anhSlice from "./../redux-toolkit/anhSlice";
import deGiaySlice from "./../redux-toolkit/deGiaySlice";
import chatLieuSlice from "./../redux-toolkit/chatLieuSlice";
import thuongHieuSlice from "./../redux-toolkit/thuongHieuSlice";
import mauSacSlice from "./../redux-toolkit/mauSacSlice";
import KichCoSlice from "./../redux-toolkit/kichCoSlice";
import nhanVienSlice from './../redux-toolkit/nhanVienSlice';
import khachHangSlice from './../redux-toolkit/khachHangSlice';

const store = configureStore({
    reducer: {
        anh: anhSlice.reducer,
        chatLieu: chatLieuSlice.reducer,
        chiTietSanPham: chiTietSanPhamSlice.reducer,
        deGiay: deGiaySlice.reducer,
        giamGia: giamGiaSlice.reducer,
        gioHang: gioHangSlice.reducer,
        hoaDonChiTiet: hoaDonChiTietSlice.reducer,
        khachHang: khachHangSlice.reducer,
        hoaDon: hoaDonSlice.reducer,
        kichCo: KichCoSlice.reducer,
        lichSuHoaDon: lichSuHoaDonSlice.reducer,
        mauSac: mauSacSlice.reducer,
        nhanVien: nhanVienSlice.reducer,
        phuongThucThanhToan: phuongThucThanhToanSlice.reducer,
        sanPham: sanPhamSlice.reducer,
        thuongHieu: thuongHieuSlice.reducer,

    },
});

export default store;
