import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';

export default class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0) // 透明度初始值设为0
    };

    componentDidMount() {
        // 随时间变化而执行动画
        Animated.timing(
            this.state.fadeAnim, // 动画中的变量值
            {
                toValue: 1, // 透明度最终变为1，即完全不透明
                duration: 3000 // 让动画持续一段时间
            }
        ).start(); // 开始执行动画
    }

    render() {
        let { fadeAnim } = this.state;
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim
                }}>
                {this.props.children}
            </Animated.View>
        );
    }
}
