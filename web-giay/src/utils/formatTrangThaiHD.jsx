function formatTrangThaiHD(value) {
    let trangThai;
    switch (value) {
        case 0:
            trangThai = "đã hủy";
            break;
        case 1:
            trangThai = "tạo đơn hàng";
            break;
        case 2:
            trangThai = "chờ xác nhận";
            break;
        case 3:
            trangThai = "chờ giao hàng";
            break;
        case 4:
            trangThai = "đang giao hàng";
            break;
        case 5:
            trangThai = "đã giao hàng";
            break;
        case 6:
            trangThai = "đã thanh toán";
            break;
        case 7:
            trangThai = "hoàn thành";
            break;
        default:
            trangThai = value;
    }

    return trangThai;
}

function formatTrangThaiLSHD(value) {
    let trangThai;
    switch (value) {
        case 0:
            trangThai = "đã hủy";
            break;
        case 1:
            trangThai = "tạo đơn hàng";
            break;
        case 2:
            trangThai = "chờ xác nhận";
            break;
        case 3:
            trangThai = "chờ giao hàng";
            break;
        case 4:
            trangThai = "đang giao hàng";
            break;
        case 5:
            trangThai = "đã giao hàng";
            break;
        case 6:
            trangThai = "đã thanh toán";
            break;
        case 7:
            trangThai = "hoàn thành";
            break;
        case 8:
            trangThai = "chỉnh sửa hóa đơn";
            break;
        case 9:
            trangThai = "chỉnh sửa hóa đơn";
            break;
        case 10:
            trangThai = "Xác nhận thanh toán";
            break;
        default:
            trangThai = value;
    }

    return trangThai;
}

export { formatTrangThaiHD, formatTrangThaiLSHD };
