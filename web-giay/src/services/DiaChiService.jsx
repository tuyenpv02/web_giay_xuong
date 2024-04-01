// eslint-disable-next-line no-unused-vars
import React from "react";
import request from "./Request";

class DiaChiService {

     // detail by id
     static getByIdTaiKhoan = async (id) => {
        let res = await request.get(`dia-chi/tai-khoan/${id}`);
        return res.data;
    };

    // delete
    static delete(id) {
        return request.delete("dia-chi/" + id);
    }

    // add
    static add(idTaiKhoan, data) {
        return request.post("http://localhost:8080/dia-chi", {
            ...data,
            taiKhoan: {
                id: idTaiKhoan,
            },
        });
    }

    // update
    static update(id, data) {
        return request.put("dia-chi/" + id, data);
    }
}

export default DiaChiService;
