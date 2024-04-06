import request from "./Request";

class ThuongHieuService {
    static getAll = async () => {
        let res = await request.get(`thuong-hieu`);
        return res.data;
    };

    // detail by id
    static getById = async (id) => {
        let res = await request.get(`thuong-hieu`+id);
        console.log(res);
        return res.data;
    };

    // delete
    static delete(id) {
        return request.delete("thuong-hieu/" + id);
    }

    // add
    static add(data) {
        return request.post("thuong-hieu", data);
    }

    // update
    static update(id, data) {
        return request.put("thuong-hieu/" + id, data);
    }

    static search(seachText) {
        return request.get("thuong-hieu/search", {
            params: {
                seachText,
            },
        });
    }
}

export default ThuongHieuService;
