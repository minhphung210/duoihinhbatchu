import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions
} from "react-native"
const { height, width } = Dimensions.get("window")
export default class Odapan extends Component {
    constructor(props){
        super(props)
        
    }
    delete(){
        var item= this.props.item
        this.props.del(item)
    }
    render() {
        return (
            <TouchableOpacity onPress={()=> this.delete()}>
                <View style={styles.square}>
                    <Text>{this.props.item.chu}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    square: {
        height: (height / 16) - 5,
        width: width / 10,
        backgroundColor: '#7d7878',
        justifyContent: 'center',
        alignItems: 'center',
        margin:2
    }
})