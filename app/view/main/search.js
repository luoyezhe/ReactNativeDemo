import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Container,
    Content,
    Left,
    Right,
    Input,
    Icon,
    Button
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modalbox';

import * as mainActions from '@app/redux/action/main.js';
import SearchResult from './child/searchResultList';
import SelectArea from './child/selectArea';
import Toast from '@app/component/common/toast';

// 搜索订阅
class SearchAddSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: this.props.searchInput
        };
        this.addSubscription = this.addSubscription.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getRules = this.getRules.bind(this);
        this.renderAddSubscriptionBtn = this.renderAddSubscriptionBtn.bind(this);
    }
    componentWillMount() {
        console.log('componentWillMount');
    }
    componentDidMount() {
        console.log('componentWillMount', this.props.searchInput);
        this.getRules();
    }

    searchAction() {
        console.log('searchAction');
    }
    addSubscription() {
        console.log('addSubscription');
        if (!this.state.searchInput) {
            Toast.showToast('请先输入订阅关键词');
            return;
        }
        this.modal.open();
    }

    closeModal() {
        this.modal.close();
    }

    getRules() {
        const { mainAction } = this.props;
        mainAction.getRules();
    }

    // 渲染添加订阅按钮
    renderAddSubscriptionBtn() {
        let { rules } = this.props;
        let addText = '';
        let addBtnStyle = null;
        let addIconStyle = null;
        let addTextStyle = null;
        let disabled = false;
        for (let i = 0, len = rules.length; i < len; i++) {
            if (rules[i].keyword === this.state.searchInput) {
                addText = '已订阅';
                addBtnStyle = styles.addBtnDisabled;
                addIconStyle = styles.addIconDisabled;
                addTextStyle = styles.addTextDisabled;
                disabled = true;
                break;
            }
        }
        if (!addText) {
            addText = '订阅';
            addBtnStyle = styles.addBtn;
            addIconStyle = styles.addIcon;
            addTextStyle = styles.addText;
        }
        return (
            <Button small disabled={disabled} style={[addBtnStyle]} onPress={this.addSubscription}>
                <Icon style={[addIconStyle]} name="add" />
                <Text style={[addTextStyle]}>{addText}</Text>
            </Button>
        );
    }

    render() {
        let { count } = this.props;

        return (
            <View style={[styles.container]}>
                <View style={[styles.searchContainer]}>
                    <Input
                        style={[styles.search]}
                        placeholder="输入您想关注的项目，如智慧城市"
                        onChangeText={text =>
                            this.setState({ searchInput: text })
                        }
                        clearButtonMode="while-editing"
                        value={this.state.searchInput}
                        onSubmitEditing={this.searchAction}
                    />
                </View>
                <View style={[styles.infoContainer]}>
                    <View style={[styles.countContainer]}>
                        <Text style={[styles.searchText]}>
                            {this.state.searchInput}
                        </Text>
                        <Text style={[styles.searchCount]}>
                            相关项目{count}条
                        </Text>
                    </View>
                    <Right>
                        {/*<LinearGradient colors={['#5BB0FE', '#3288FF']}>*/}
                        {this.renderAddSubscriptionBtn()}
                        {/*</LinearGradient>*/}
                    </Right>
                </View>
                <View style={{ flex: 1 }}>
                    <SearchResult searchInput={this.state.searchInput} />
                </View>
                <Modal
                    ref={ref => {
                        this.modal = ref;
                    }}
                    style={[styles.modalContainer]}
                    position={'bottom'}>
                    <SelectArea
                        name={this.state.searchInput}
                        close={this.closeModal}
                    />
                </Modal>
            </View>
        );
    }
}
export default connect(
    state => ({
        count: state.main.searchList.count,
        rules: state.main.rules
    }),
    dispatch => ({
        mainAction: bindActionCreators(mainActions, dispatch)
    })
)(SearchAddSubscription);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    searchContainer: {
        height: 44,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6
    },
    search: {
        height: 32,
        fontSize: 14,
        backgroundColor: '#F7F7F7'
    },
    infoContainer: {
        height: 44,
        backgroundColor: 'rgba(65,130,235,0.15)',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    countContainer: {
        flex: 1,
        height: 44,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    searchText: {
        fontSize: 14,
        color: '#1380DC'
    },
    searchCount: {
        fontSize: 12,
        color: '#818B9D'
    },
    addBtn: {
        paddingRight: 10
    },
    addBtnDisabled: {
        backgroundColor: '#F7F7F7',
        width: 80,
        justifyContent: 'center'
    },
    addIcon: {
        color: '#fff',
        marginRight: 5,
        fontSize: 20,
        fontWeight: '600'
    },
    addIconDisabled: {
        display: 'none'
    },
    addText: {
        color: '#fff',
        fontWeight: '600'
    },
    addTextDisabled: {
        color: '#666'
    },
    modalContainer: {
        height: 600
    }
});
