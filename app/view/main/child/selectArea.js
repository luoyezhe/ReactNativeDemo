import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mainActions from '@app/redux/action/main';
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
        let oldArr = [].concat(this.state.selectArr);
        let index = oldArr.indexOf(item);
        if (index >= 0) {
            oldArr.splice(index, 1);
        } else {
            oldArr.push(item);
        }
        this.setState({
            selectArr: oldArr
        });
    }

    resetSelect() {
        this.setState({
            selectArr: []
        });
    }

    confirmSelect() {
        console.log('confirmSelect-selectArr');
        console.log(this.props);
        const { mainAction, name } = this.props;
        const { selectArr } = this.state;
        let data = {
            keyword: name,
            location: selectArr
        };
        mainAction.addRule(
            data,
            () => {
                Toast.showToast('订阅成功');
                this.props.close();
            },
            error => {
                Toast.showToast(error.data.message || error.data);
            }
        );
    }

    renderAreaItems() {
        let _views = Object.keys(shortLocation).map((item, index) => {
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
        return _views;
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
                <View style={[styles.areaItems]}>{_views}</View>
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
    close: PropTypes.func
};

export default connect(
    state => ({
        // count: state.main.searchList.count
    }),
    dispatch => ({
        mainAction: bindActionCreators(mainActions, dispatch)
    })
)(SelectArea);

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
