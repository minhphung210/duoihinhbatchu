import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    AsyncStorage,
    Alert,
    Animated,
    Easing
} from "react-native";
import data from "../data.json"
import { Actions } from 'react-native-router-flux';
import * as Request from '../Functions/request.js'
import * as BoDau from '../Functions/bodau.js'
import * as Load from '../Functions/LoadText.js'
import * as Chacracter from '../Functions/openCharacter.js'
import Alphabet from "./alphabet.js"
import Odapan from "./odapan.js"

const alphabet = "ZXCVBNMASDFGHJKLQWERTYUIOP"

const { height, width } = Dimensions.get("window")


export default class Chosen extends Component {
    constructor(props) {
        super(props)
        this.animate = new Animated.Value(0)
        this.state = {
            random: [],
            odapan: [],
            check: false,
            img: "",
            id: 0,
            disabled: false,
            coin: 500,
            combo: 0,
            apiData: '',
            type: 0
        }
    }
    componentDidMount() {
        this.fetchData()

    }
    animated() {
        this.animate.setValue(0)
        Animated.timing
    }
    fetchData = async () => {
        try {
            const valueID = await AsyncStorage.getItem("ID");
            if (valueID !== null) {
                this.setState({
                    id: parseInt(valueID)
                })
            }
        } catch (error) {
        }
        try {
            const value = await AsyncStorage.getItem("coin");
            if (value !== null) {
                this.setState({
                    coin: parseInt(value)
                })
            }
        } catch (error) {
        }
        this.LoadText(this.state.id, this.state.coin)
        Request.fetchData()
            .then((responseData) => {
                this.setState({
                    apiData: responseData.data
                })
            })
    }
    LoadText(id) {
        // xóa câu hỏi cũ trước khi load câu hỏi mới  
        var odapan = this.state.odapan
        var random = this.state.random
        odapan.splice(0, odapan.length)
        random.splice(0, random.length)
        this.setState({
            odapan: odapan,
            random: random
        })
        if (id < data.length) {
            //load cau tiep theo neu cau hien tai da tra loi dung
            var dapan = data[id].answers
            var Random = this.state.random
            var odapan = this.state.odapan
            // ham bo dau tieng viet
            var dapan = BoDau.bodau(dapan)
            var img = data[id].url
            //kiểm tra số ký tự trong đáp án rồi tạo 1 mảng rỗng để map
            Load.loadText(dapan, alphabet, Random, odapan)
            AsyncStorage.setItem("ID", id.toString())
            AsyncStorage.setItem("coin", value = this.state.coin.toString())
            this.setState({
                random: Random,
                odapan: odapan,
                check: false,
                img: img,
                id: id,
                disabled: false,
            })
        }
        else {
            try {
                var i = id - 50
                var apiData = this.state.apiData
                var dapan = apiData[i].answers[0]
                var Random = this.state.random
                var odapan = this.state.odapan
                // ham bo dau tieng viet
                var dapan = BoDau.bodau(dapan)
                var img = apiData[i].pictures[0].url
                //kiểm tra số ký tự trong đáp án rồi tạo 1 mảng rỗng để map
                Load.loadText(dapan, Alphabet, Random, odapan)
                AsyncStorage.setItem("ID", id.toString())
                AsyncStorage.setItem("coin", value = this.state.coin.toString())
                this.setState({
                    random: Random,
                    odapan: odapan,
                    check: false,
                    img: img,
                    id: id,
                    disabled: false,
                })
            }
            catch (error) {
                this.setTimeout(() => {
                    this.setTimePassed();
                }, 1000);
                Alert.alert("thong bao", "ban can co mang de co the choi cau tiep theo",
                    [
                        { text: "OK" },
                        { text: 'cancle' }
                    ]
                )
            }
        }
    }

    skip(id) {
        var coin = this.state.coin
        if (coin >= 30) {
            this.setState({
                id: id,
                coin: coin - 30
            })
            this.LoadText(id)
        }
        else {
            ToastAndroid.show("ban khong du coin", ToastAndroid.SHORT)
        }
    }
    //ấn click để chọn đáp án
    click = (item, index) => {
        let oDapan = this.state.odapan
        let random = this.state.random
        var arr = []

        // goi ham click da duoc tach ra
        //Load.click(oDapan, item, index)
        for (let i = 0; i < oDapan.length; i++) {
            if (oDapan[i].chu == "") {
                oDapan[i].chu = item.chu
                oDapan[i].vitri = item.vitri
                item.chu = ""
                item.vitri = ""
                break;
            }
        }
        this.setState({
            odapan: oDapan,
            random: random
        })
        // kiem tra xem cac o chu da duoc dien het chua roi tien hanh check
        for (let i = 0; i < oDapan.length; i++) {
            if (oDapan[i].chu !== "") {
                arr.push(oDapan[i].chu)
            }
        }
        if (arr.length == oDapan.length) {
            this.check()
        }
    }

    //kiem tra dap an
    check() {
        var combo = this.state.combo
        var id = this.state.id
        var check = this.state.check
        var coin = this.state.coin
        var apiData = this.state.apiData
        var odapan = this.state.odapan
        let checkDapAn = this.state.odapan
        if (id < data.length) {
            // kiem tra dap an
            var dapan = data[id].answers
            var renderDapan = BoDau.boKhoangTrang(dapan)// doan string chua dap an khong bi bo dau   
            var RenderDapan = renderDapan.split("")
            var dapan = BoDau.bodau(dapan)//doan string chua dap an da ba bo het dau va khoang trang
            var Dapan = dapan.split("")
            var j = 0
            while (j < checkDapAn.length) {
                if (checkDapAn[j].chu == Dapan[j]) {
                    j++
                }
                else {
                    break;
                }
            }
            if (j == Dapan.length) {
                for (let i = 0; i < odapan.length; i++) {
                    odapan[i].chu = RenderDapan[i]
                }
                this.setState({
                    odapan: odapan
                })
                if (combo % 5 == 0 && combo !== 0) {
                    setTimeout(() => {
                        this.setState({
                            check: true,
                            coin: this.state.coin + 50,
                            combo: this.state.combo + 1,
                        });
                    }
                        , 700)
                }
                else {
                    setTimeout(() => {
                        this.setState({
                            check: true,
                            coin: this.state.coin + 5,
                            combo: this.state.combo + 1,
                        });
                    }
                        , 700)
                }
            }
            else {
                ToastAndroid.show("dap an chua chinh xac", ToastAndroid.SHORT)
            }
        }
        else {
            var i = id - 50
            var n = 0
            var dapan = apiData[i].answers[0]
            var dapan = BoDau.bodau(dapan)
            var Dapan = dapan.split("")
            while (n < checkDapAn.length) {
                if (checkDapAn[n].chu == Dapan[n]) {
                    n++
                }
                else {
                    break;
                }
            }
            if (n == Dapan.length) {
                if (combo % 5 == 0 && combo !== 0) {
                    this.setState({
                        check: true,
                        coin: this.state.coin + 50,
                        combo: combo + 1
                    })
                }
                else {
                    this.setState({
                        check: true,
                        coin: this.state.coin + 5,
                        combo: combo + 1
                    })
                }
            }
            else {
                ToastAndroid.show("dap an chua chinh xac", ToastAndroid.SHORT)
            }
        }
    }
    Open1Character(id) {
        var Random = this.state.random
        odapan = this.state.odapan
        let arr = []
        var apiData = this.state.apiData
        var coin = this.state.coin
        if (id < data.length) {
            //vong lap tim kiem nhung vi tri trong man con rong roi push vao 1 mang moi
            let dapan = data[id].answers
            dapan = BoDau.bodau(dapan)
            var m = dapan.length
            Chacracter.open1Character(arr, m, dapan, odapan, Random)
            if (coin >= 10) {

                if (arr.length == 1) {
                    setTimeout(() => { this.check() }, 1000)
                }
                this.setState({
                    odapan: odapan,
                    random: Random,
                    coin: coin - 10
                })
            }
            else {
                ToastAndroid.show("ban khong du coin", ToastAndroid.SHORT)
            }
        }
        else {
            var i = id - 50
            let dapan = apiData[i].answers[0]
            dapan = BoDau.bodau(dapan)
            var m = dapan.length
            Chacracter.open1Character(arr, m, dapan, odapan, Random)
            if (coin >= 10) {

                if (arr.length == 1) {
                    this.check()
                }
                this.setState({
                    odapan: odapan,
                    random: Random,
                    coin: coin - 10
                })
            }
            else {
                ToastAndroid.show("ban khong du coin", ToastAndroid.SHORT)
            }
        }
    }
    Open3Character(id) {
        var newArr = []
        var Random = this.state.random
        var odapan = this.state.odapan
        var apiData = this.state.apiData
        var coin = this.state.coin
        if (id < data.length) {
            let dapan = data[id].answers
            dapan = BoDau.bodau(dapan)
            var m = dapan.length
            let arr = []
            if (coin >= 20) {
                Chacracter.open3Character(m, newArr, Random, odapan, arr, dapan)
                if (arr.length == 0) {
                    this.check()
                }
                this.setState({
                    odapan: odapan,
                    random: Random,
                    coin: coin - 20
                })
            } else {
                ToastAndroid.show("ban khong du coin", ToastAndroid.SHORT)
            }
        }
        else {
            var i = id - 50
            let dapan = apiData[i].answers[0]
            dapan = BoDau.bodau(dapan)
            var m = dapan.length
            let arr = []
            if (coin >= 20) {
                Chacracter.open3Character(m, newArr, Random, odapan, arr, dapan)
                if (arr.length == 0) {
                    setTimeout(() => { this.check() }, 1000)
                }
                this.setState({
                    odapan: odapan,
                    random: Random,
                    coin: coin - 20
                })
            } else {
                ToastAndroid.show("ban khong du coin", ToastAndroid.SHORT)
            }
        }
    }
    //xóa những ký tự vừa chọn
    delCharacter = (item, index) => {
        let odapan = this.state.odapan
        let newAlphabet = this.state.random
        Load.delCharacter(item, index, newAlphabet)
        this.setState({
            random: newAlphabet,
            odapan: odapan,
        })
    }
    clearAll() {
        odapan = this.state.odapan
        random = this.state.random
        Load.clearAll(odapan, random)
        this.setState({
            odapan: odapan,
            random: random
        })
    }
    // hiển thị các ô vuông chứa chữ để trọn
    renderAlphabet = () => {
        var _this = this
        return _this.state.random.map(function (item, index) {
            return (
                <Alphabet item={item} click={_this.click} index={index} />
            )
        })
    }
    //hiện thị số ký tự trong đáp án , mỗi ký tự là 1 ô vuông
    renderDapan = () => {
        var _this = this

        return _this.state.odapan.map(function (item, index) {
            return (
                <Odapan key={index} item={item} del={_this.delCharacter} />
            )
        })
    }
    renderImages = (id) => {
        //var id = this.state.id
        if (id < data.length) {
            return (
                <Image source={{ uri: `data:image/png;base64,${this.state.img}` }} style={styles.img} />
            )
        }
        else {
            return (
                <Image source={{ uri: `http://43.239.221.139:1235${this.state.img}` }} style={styles.img} />
            )
        }
    }
    // hien thi dap an chinh xac 
    renderCorrectAnswer(id) {
        apiData = this.state.apiData
        if (id < data.length) {
            return (<Text>Đáp án chính xác : {data[id].answers}</Text>)
        }
        else {
            return (<Text>Đáp án chính xác : {apiData[id - 50].answers}</Text>)
        }
    }
    // xac nhan dung xu de tro giup
    renderConfirm(type, id) {
        if (type == 10) {
            Alert.alert(
                "thong bao",
                "ban xac nhan dung 10 xu de mo 1 o chu cai",
                [
                    { text: "xac nhan", onPress: () => this.Open1Character(id) },
                    { text: 'huy bo' }
                ]
            )
        }
        else if (type == 20) {
            Alert.alert(
                "thong bao",
                "ban xac nhan dung 20 xu de mo 3 o chu cai",
                [
                    { text: "xac nhan", onPress: () => this.Open3Character(id) },
                    { text: 'huy bo' }
                ]
            )
        }
        else if (type == 30) {
            Alert.alert(
                "thong bao",
                "ban xac nhan bo qua cau nay",
                [
                    { text: "xac nhan", onPress: () => this.skip(id) },
                    { text: 'huy bo' }
                ]
            )
        }

    }
    render() {
        var id = this.state.id
        var type = this.state.type
        var coin = this.state.coin
        return (
            <View style={styles.container}>
                {/*coin va cau hoi hien tai*/}
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Image source={require("../images/back.png")} style={styles.imgBack} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Cau: {id + 1}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Image source={require("../images/coin.png")} style={styles.imgCoin} />
                        <Text style={{ fontSize: 20 }}>{this.state.coin}</Text>
                    </View>
                </View>
                {/*anh*/}
                <View style={styles.imgView}>
                    {this.renderImages(id)}
                </View>
                {/*phan quang cao + linh tinh*/}
                <View style={styles.adsView}>
                    <TouchableOpacity onPress={() => this.clearAll()}>
                        <Image
                            source={require("../images/delete.png")}
                            style={{ height: 40, width: 40 }}
                        />
                    </TouchableOpacity>
                </View>
                {/* phan duoi*/}
                <View style={styles.container}>
                    {/*helpView*/}
                    <View style={styles.helpView}>
                        <TouchableOpacity onPress={() => this.renderConfirm(type = 10, id)} >
                            <View style={styles.btnhelp}>
                                <Text>mở 1 chữ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.renderConfirm(type = 20, id)}>
                            <View style={styles.btnhelp}>
                                <Text >
                                    mở 3 chữ
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.renderConfirm(type = 30, id = id + 1)}>
                            <View style={styles.btnhelp} >
                                <Text> bỏ qua câu</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*o dap an*/}
                    <View style={styles.viewanswers}>
                        {this.renderDapan()}
                    </View>
                    {/*o chu cai*/}
                    <View style={styles.viewClick} >
                        {this.renderAlphabet()}
                    </View>
                </View>
                {/* scene dap an dung*/}
                {this.state.check &&
                    <View style={styles.trueAlert}>
                        {this.renderCorrectAnswer(id)}
                        <TouchableOpacity onPress={() => this.LoadText(id = id + 1)}>
                            <View style={styles.btnNext}>
                                <Text style={{ fontSize: 14 }}>next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewanswers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    viewClick: {
        backgroundColor: '#3eacff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        height: (height / 16) - 5,
        width: width / 10,
        backgroundColor: '#7d7878',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    trueAlert: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        position: 'absolute',
    },
    imgView: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    btnNext: {
        height: 40,
        width: 80,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    helpView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnhelp: {
        height: 40,
        width: 80,
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cc71d2'
    },
    imgCoin: {
        height: 30,
        width: 30
    },
    topContainer: {
        height: height / 13,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:20
    },
    adsView: {
        height: 50,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    text: {
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "200"
    },
    img: {
        height: (height / 2) - 100,
        width: width - 60,
    },
    imgBack: {
        height: 24,
        width: 24
    },
});