import request from "./Request";

class DeGiayService {
    static getAll = async () => {
        let res = await request.get(`de-giay`);
        return res.data;
    };

    // detail by id
    static getById = async (id) => {
        let res = await request.get(id);
        console.log(res);
        return res.data;
    };

    // delete
    static delete(id) {
        return request.delete("de-giay/" + id);
    }

    // add
    static add(data) {
        return request.post("http://localhost:8080/de-giay", data);
    }

    // update
    static update(id, data) {
        return request.put("de-giay/" + id, data);
    }

    static search(seachText) {
        return request.get("de-giay/search", {
            params: {
                seachText,
            },
        });
    }
}

export default DeGiayService;
