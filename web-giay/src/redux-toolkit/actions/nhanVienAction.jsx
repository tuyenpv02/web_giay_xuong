import { createAsyncThunk } from "@reduxjs/toolkit";
import nhanVienService from "../../services/NhanVienService";

const getAllNhanVien = createAsyncThunk("nhanVien/fetch", async () => {
    let res = await nhanVienService.getAllNhanVien();
    return res;
});

const getAllKhachHang = createAsyncThunk("khachHang/fetch", async () => {
    let res = await nhanVienService.getAllKhachHang();
    return res;
});


export {getAllKhachHang, getAllNhanVien}
