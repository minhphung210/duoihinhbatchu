import { ToastAndroid } from "react-native"
export function open1Character(arr, m, dapan, odapan, Random) {
    for (let x = 0; x < m; x++) {
        if (odapan[x].chu == "") {
            arr.push(x)
        }
    }
    //lay random phan tu trong mang arr
    var k = Math.floor(Math.random() * arr.length)
    //gan vi tri se hien thi o chu
    var j = arr[k]
    // kiem tra mang co rong hay khong . neu rong thi khi chay se loi
    if (j !== undefined) {
        // hien thi chu duoc goi y va xoa chu o duoi o dap an
        odapan[j].chu = dapan[j]
        for (let i = 0; i < Random.length; i++) {
            if (odapan[j].chu == Random[i].chu) {
                odapan[j].vitri = Random[i].vitri
                Random[i].chu = ""
                Random[i].vitri = ""
                break;
            }
        }

    }
}
export function open3Character(m, newArr, Random, odapan, arr, dapan) {
    // xem dap an con trong de tao mang 
    for (let x = 0; x < m; x++) {
        if (odapan[x].chu == "") {
            arr.push(x)
        }
    }
    // lay ngau nhien cac phan tu trong mang 
    for (let i = 0; i < 3; i++) {
        var m = arr.length
        var k = Math.floor(Math.random() * m)
        var h = arr[k]
        newArr.push(h)
        arr.splice(k, 1)
    }
    console.log(dapan)
    var g = newArr[0]
    var h = newArr[1]
    var j = newArr[2]
    if (j !== undefined && h !== undefined && g !== undefined) {
        for (let i = 0; i < Random.length; i++) {
            if (Random[i].chu == dapan[g]) {
                if (odapan[g].chu == "") {
                    odapan[g].chu = Random[i].chu
                    odapan[g].vitri = Random[i].vitri
                    Random[i].chu = ""
                    Random[i].vitri = ""
                }
            } else { }
            if (Random[i].chu == dapan[h]) {
                if (odapan[h].chu == "") {
                    odapan[h].chu = Random[i].chu
                    odapan[h].vitri = Random[i].vitri
                    Random[i].chu = ""
                    Random[i].vitri = ""
                }
            }
            else { }
            if (Random[i].chu == dapan[j]) {
                if (odapan[j].chu == "") {
                    odapan[j].chu = Random[i].chu
                    odapan[j].vitri = Random[i].vitri
                    Random[i].chu = ""
                    Random[i].vitri = ""
                }
            }
        }
    }
    else {
        ToastAndroid.show("ban can 3 o trong", ToastAndroid.SHORT)
    }
}
