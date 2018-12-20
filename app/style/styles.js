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
        backgroundColor: colors.background,
        paddingTop: StatusBar.currentHeight,
        height: sizes.navbarHeight
    },
    flexDirectionRow: {
        flexDirection: 'row',
        flex: 1
    },
    flexDirectionColumn: {
        flexDirection: 'column',
        flex: 1
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailTitleText: {
        fontSize: 20,
        color: colors.textDefault
    },
    detailItemTitle: {
        fontSize: 18,
        color: colors.textDefault
    },
    titleBorderPrimary: {
        borderLeftColor: colors.btnPrimary,
        borderLeftWidth: 4,
        paddingLeft: 5
    },
    normalText: {
        color: colors.textDefault,
        fontSize: sizes.normalTextSize
    },
    normalDescText: {
        color: colors.textHint,
        fontSize: sizes.normalTextSize
    },
    normalTextWhite: {
        color: colors.textWhite,
        fontSize: sizes.normalTextSize
    },
    descTextWhite: {
        color: colors.textWhite,
        fontSize: sizes.smallTextSize
    },
    descText: {
        color: colors.textHint,
        fontSize: sizes.smallTextSize
    },
    mainBox: {
        backgroundColor: '#ccc',
        flex: 1
    },
    flexDirectionRowNotFlex: {
        flexDirection: 'row'
    },
    listSeprator: {
        flex: 1,
        height: 2,
        backgroundColor: colors.seprator
    }
});

export default styles;
