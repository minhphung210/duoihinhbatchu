import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing,
    Dimensions,
    TouchableOpacity,
} from "react-native"
import * as Load from '../Functions/LoadText.js'
const { height, width } = Dimensions.get("window")
export default class Alphabet extends Component {
    constructor(props) {
        super(props)
        this.animate = new Animated.Value(0)
    }
    animated() {
        this.animate.setValue(0)
        Animated.timing(
            this.animate,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start()
        setTimeout(this.click, 500)
    }
    click = () => {
        var item = this.props.item
        var index = this.props.index
        this.props.click(item)
    }
    render() {
        const animate = this.animate.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 100, 0]
        })
        return (
            <TouchableOpacity onPress={() => this.animated()}>
                <View style={styles.square}>
                    <Animated.Text style={{
                        marginBottom: animate,
                        textAlign: 'center',
                        backgroundColor:'transparent'
                    }}>
                        {this.props.item.chu}
                    </Animated.Text>
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