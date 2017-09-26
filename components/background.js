import React ,{Component} from "react";
import{
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from "react-native"
import { Actions } from 'react-native-router-flux';
const {height , width} =Dimensions.get("window")

export default class Background extends Component{
    render(){
        return(
            <Image source = {require("../images/background.jpg")} style={styles.container}>
                <TouchableOpacity onPress={()=> Actions.chosen()}>
                    <Image source ={require('../images/playbtn.png')} style={styles.btnPlay}/>
                </TouchableOpacity>
            </Image>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        height:height,
        width:width,
        justifyContent:"center",
        alignItems:"center"
    },
    btnPlay:{
        height:60,
        width:60
    }
})