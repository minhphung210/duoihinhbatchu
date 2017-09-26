
export function bodau(dapan) {
    dapan = dapan.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ằ|Ẵ/g, "A");
    dapan = dapan.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    dapan = dapan.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    dapan = dapan.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    dapan = dapan.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    dapan = dapan.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    dapan = dapan.replace(/Đ/g, "D");
    dapan = dapan.replace(/\s+/g, "");
    return dapan;
}
export function boKhoangTrang(dapan) {
    dapan = dapan.replace(/\s+/g, "");
    return dapan;
}