import { ToastAndroid } from 'react-native'
export function loadText(dapan, alphabet, Random, odapan) {
    for (let i = 0; i < dapan.length; i++) {
        odapan.push({ chu: "", vitri: "" })
    }
    // kiểm tra số ký tự trong đáp án rồi push vào 1 mảng để trộn với các chữ cái khác
    var Dapan = dapan.split("")// chuyển đáp án từ chuỗi thành mảng
    var random = []
    var alphabet = alphabet.split("")
    var m = alphabet.length
    //random chữ vào trong mảng
    for (let i = Dapan.length; i < 14; i++) {
        let j = Math.floor(Math.random() * m)
        random.push(alphabet[j])
    }
    var newArr1 = random.concat(Dapan); // đổ đáp án vào mảng
    //random lại mảng
    var newArr2 = []
    for (let i = 0; i < 14; i++) {
        var h = newArr1.length
        let j = Math.floor(Math.random() * h)
        newArr2.push(newArr1[j])
        newArr1.splice(j, 1)
    }
    // gán vị trí cho các chữ cái
    for (let i = 0; i < 14; i++) {
        Random.push({ chu: newArr2[i], vitri: i })
    }
}

export function click(oDapan, item, index) {
    //vong lap for de chay cac vi tri .neu vi tri nao rong thi se gan chu vao day 
    for (let i = 0; i < oDapan.length; i++) {
        if (oDapan[i].chu == "") {
            oDapan[i].chu = item.chu
            oDapan[i].vitri = item.vitri
            item.chu = ""
            item.vitri = ""
            break;
        }
    }
}
export function delCharacter(item, index, newAlphabet) {
    if (item.chu !== "") {
        newAlphabet[(item.vitri)].chu = item.chu
        newAlphabet[(item.vitri)].vitri = item.vitri
        item.chu = ""
        item.vitri = ""
    }
}
export function clearAll(odapan , random) {
    for (let i = 0; i < odapan.length; i++) {
        var j = odapan[i].vitri
        if (j !== "") {
            random[j].chu = odapan[i].chu
            random[j].vitri = odapan[i].vitri
            odapan[i].chu = ""
            odapan[i].vitri = ""
        }
    }
}