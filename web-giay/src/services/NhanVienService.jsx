import request from "./Request";

class nhanVienService {
    static getAllNhanVien = async () => {
        let res = await request.get(`tai-khoan/nhan-vien`);
        return res.data;
    };

    static getAllKhachHang = async () => {
        let res = await request.get(`tai-khoan/khach-hang`);
        return res.data;
    };

    // detail by id
    static getById = async (id) => {
        let res = await request.get('tai-khoan/'+id);
        // console.log(res);
        return res.data;
    };

    // delete
    static delete(id) {
        return request.delete("tai-khoan/" + id);
    }

    // add
    static add(data) {
        return request.post("tai-khoan", data);
    }

    // update
    static update(id, data) {
        return request.put("tai-khoan/" + id, data);
    }

    static filterNhanVien = async (searchText, trangThai) => {
        let res = await request.get("tai-khoan/filter", {
            params: {
                searchText,
                trangThai,
            },
        });
        return res.data;
    };
}

export default nhanVienService;
