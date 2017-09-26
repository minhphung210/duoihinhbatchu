
const HOST = 'http://43.239.221.139:1990/api/';
const SECRET_KEY = "969D5FDC5F690FACF9FF41374326B54A4E54536361E6F7772B3B47D9D7BF88B5"
var md5 = require('md5');

var config = {
    secret: 'FDVaefnkvasdeFAwfvsdvASDASWDAvdsmlvefASDFASewf'
}
var create = function (time, other) {
    var time_ = time || new Date().getTime();

    return { sig: md5(md5(config.secret + (other || '')) + time_), time: time_ };
}
export function fetchData() {
    var sigs = create();
    let apiURL = "http://43.239.221.139:1990/api/game-data?signature=" + sigs.sig + "&time=" + sigs.time + "&game_id=41&level=1&page=1"
    return fetch(apiURL).then((response) => response.json())
}