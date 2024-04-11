// eslint-disable-next-line no-unused-vars
import request from "./Request";

class AnhService {
    

     // delete
     static delete(id) {
        return request.delete("anh/" + id);
    }

    // add
    static add(data) {
        console.log("aad ", data);
        return request.post("anh", data);
    }
}

export default AnhService;
