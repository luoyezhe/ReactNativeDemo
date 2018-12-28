import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as mainActions from '@app/redux/action/main';
import { shortLocation } from '@app/constant/common';
import Toast from '@app/component/common/toast';

class SelectArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectArr: []
        };
        this.renderAreaItems = this.renderAreaItems.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.resetSelect = this.resetSelect.bind(this);
        this.confirmSelect = this.confirmSelect.bind(this);
    }
    componentDidMount() {
        console.log('');
    }

    itemClick(item) {
        console.log(item);
        let newArr = null;
        if (!item) {
            // 选择全国
            newArr = [];
        } else {
            // 其他地区
            newArr = [].concat(this.state.selectArr);
            let index = newArr.indexOf(item);
            if (index >= 0) {
                newArr.splice(index, 1);
            } else {
                newArr.push(item);
            }
        }
        this.setState({
            selectArr: newArr
        });
    }

    resetSelect() {
        this.setState({
            selectArr: []
        });
    }

    confirmSelect() {
        console.log('confirmSelect-selectArr');
        const { selectArr } = this.state;
        const { confirm } = this.props;
        confirm(selectArr);
    }

    renderAreaItems() {
        let _items = Object.keys(shortLocation).map((item, index) => {
            let _styles = [styles.areaItem];
            if (this.state.selectArr.indexOf(item) >= 0) {
                _styles.push(styles.areaItemActive);
                console.log('_styles', _styles);
            }
            return (
                <Text
                    style={_styles}
                    key={item}
                    onPress={() => {
                        this.itemClick(item);
                    }}>
                    {shortLocation[item]}
                </Text>
            );
        });
        let _totalStyles = [styles.areaItem];
        if (this.state.selectArr.length === 0) {
            _totalStyles.push(styles.areaItemActive);
        }
        return (
            <View style={[styles.areaItems]}>
                <Text
                    style={_totalStyles}
                    onPress={() => {
                        this.itemClick(null);
                    }}>
                    全国
                </Text>
                {_items}
            </View>
        );
    }

    render() {
        const { name } = this.props;
        let _views = this.renderAreaItems();
        return (
            <View style={[styles.container]}>
                <Text style={[styles.selectTitle]}>订阅【{name}】</Text>
                <View style={[styles.selectedContainer]}>
                    <Text style={[styles.descTitle]}>地区范围</Text>
                    <Text style={[styles.desc]}>可选6个地区</Text>
                </View>
                {/*<View style={[styles.areaItems]}>{_views}</View>*/}
                {_views}
                <View style={[styles.btnContainer]}>
                    <Button light onPress={this.resetSelect.bind(this)}>
                        <Text style={{ color: '#91929C' }}>重置</Text>
                    </Button>
                    <Button
                        style={{ marginLeft: 15 }}
                        onPress={this.confirmSelect}>
                        <Text>确定</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

SelectArea.propTypes = {
    name: PropTypes.string,
    close: PropTypes.func,
    confirm: PropTypes.func
};

export default SelectArea;

// export default connect(
//     state => ({
//         // count: state.main.searchList.count
//     }),
//     dispatch => ({
//         mainAction: bindActionCreators(mainActions, dispatch)
//     })
// )(SelectArea);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingLeft: 15
    },
    selectTitle: {
        fontSize: 20,
        color: '#1F2D3D',
        fontWeight: '700'
    },
    selectedContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    descTitle: {
        fontSize: 16,
        color: '#182325'
    },
    desc: {
        fontSize: 12,
        color: '#9099A9',
        marginLeft: 8
    },
    areaItems: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15,
        paddingBottom: 15
    },
    areaItem: {
        width: 80,
        height: 32,
        backgroundColor: '#F6F6F6',
        fontSize: 14,
        color: '#5F606A',
        marginRight: 10,
        marginBottom: 10,
        textAlign: 'center',
        paddingTop: 8
        // flex: 1
    },
    areaItemActive: {
        backgroundColor: '#FFEBE2',
        color: '#FF7A3F'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10
    }
});
