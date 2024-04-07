import { v4 as uuidv4 } from 'uuid';


const randomChuoi = () =>{
    const randomString = uuidv4().replace(/-/g, '').substring(0, 6);
    // const shortUUID = uuidv4().substring(0, 12);
    return randomString
}

export {randomChuoi}