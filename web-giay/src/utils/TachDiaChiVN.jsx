// const diaChi = "số 5 đường hải giang,12-xã hải hưng,24-huyện thương võ,13-thành phố HN";
const TachDiaChiVN = (value) => {
    console.log(value);
    const parts = value?.split(",");

    // console.log(parts);
    // const diaChiCuThe = parts[0];
    // const xa = parts[1].trim().split(",")[0];
    // const huyen = parts[2].trim().split(",")[0];
    // const thanhPho = parts[3].trim().split(",")[0];

    // let soXa = xa[0].split("-")[0].trim();
    // const tenXa = xa[0].split("-")[1].trim();

    // let soHuyen = huyen[0].split("-")[0].trim();
    // const tenHuyen = huyen[0].split("-")[1].trim();

    // let soThanhPho = thanhPho[0].split("-")[0].trim();
    // const tenThanhPho = thanhPho[0].split("-")[1].trim();

    //     return {
    //         diaChiCuThe,
    //         soXa,
    //         tenXa,
    //         soHuyen,
    //         tenHuyen,
    //         soThanhPho,
    //         tenThanhPho,
    //     };
    return {
        parts
        // diaChiCuThe,
        // xa,
        // huyen,
        // thanhPho
    };
};

export { TachDiaChiVN };
