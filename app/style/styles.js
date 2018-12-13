import React, {
    StyleSheet,
    Dimensions,
    PixelRatio,
    Platform,
    StatusBar
} from 'react-native';
import colors from './color';
import sizes from './size';

const styles = StyleSheet.create({
    routerStyle: {
        //设置router的样式
        flex: 1,
        // backgroundColor: constant.mainBackgroundColor,
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null
    },
    navigationBar: {
        backgroundColor: colors.primaryColor,
        paddingTop: StatusBar.currentHeight,
        height: sizes.navbarHeight
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    normalText: {
        color: '#19192d',
        fontSize: sizes.normalTextSize
    },
    mainBox: {
        backgroundColor: '#ccc',
        flex: 1
    },
    flexDirectionRowNotFlex: {
        flexDirection: 'row'
    }
});
