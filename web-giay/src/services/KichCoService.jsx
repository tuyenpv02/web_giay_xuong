import request from "./Request";

class KichCoService {
    static getAll = async () => {
        let res = await request.get(`kich-co`);
        return res.data;
    };

    // detail by id
    static getById = async (id) => {
        let res = await request.get(id);
        // console.log(res);
        return res.data;
    };

    // delete
    static delete(id) {
        return request.delete("kich-co/" + id);
    }

    // add
    static add(data) {
        // console.log("aad ", data);
        return request.post("http://localhost:8080/kich-co", data);
    }

    // update
    static update(id, data) {
        // console.log("u ", id, data);
        return request.put("kich-co/" + id, data);
    }

    static search(seachText) {
        return request.get("kich-co/search", {
            params: {
                seachText,
            },
        });
    }
}

export default KichCoService;