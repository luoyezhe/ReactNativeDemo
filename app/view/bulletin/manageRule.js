import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as mainActions from '@app/redux/action/main';
import Filters from '@app/filters/';
import translation from '../../filters/translation';
import Toast from '@app/component/common/toast';

class ManageRule extends React.Component {
    constructor(props) {
        super(props);
        this.getRules = this.getRules.bind(this);
        this.reunderRuleItems = this.reunderRuleItems.bind(this);
        this.editAction = this.editAction.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
        this.toAddRule = this.toAddRule.bind(this);
    }

    componentDidMount() {
        const { rules } = this.props;
        if (rules) {
            return;
        }
        this.getRules();
    }

    getRules() {
        const { mainAction } = this.props;
        mainAction.getRules();
    }

    editAction() {
        console.log('editAction');
    }

    deleteAction(item) {
        console.log('deleteAction');
        const { mainAction } = this.props;
        mainAction.deleteRule(
            item,
            () => {
                this.getRules();
            },
            error => {
                Toast.showToast(error.data.message || error.data);
            }
        );
    }

    toAddRule() {
        console.log('toAddRule');
        Actions.push('addRule');
    }

    reunderRuleItems() {
        const { rules } = this.props;
        let _rulesViews = rules.map(rule => {
            console.log('rule', rule);
            return (
                <View style={[styles.ruleItem]} key={rule.id}>
                    <View style={[styles.ruleContentContainer]}>
                        {/*<View style={[styles.keywordContainer]}>*/}
                        <Text style={[styles.ruleKeyword]}>{rule.keyword}</Text>
                        {/*</View>*/}
                        <View style={[styles.editContainer]}>
                            <Text
                                style={[styles.editText]}
                                onPress={this.editAction}>
                                编辑
                            </Text>
                            <Text
                                style={[styles.editText]}
                                onPress={() => this.deleteAction(rule.id)}>
                                删除
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.locationContainer]}>
                        <Icon name="add" style={[styles.locationIcon]} />
                        <Text style={[styles.locationText]}>
                            {Filters.translation(
                                rule.location,
                                'locationAll'
                            ) || '全国'}
                        </Text>
                    </View>
                </View>
            );
        });
        return (
            <View>
                <Text style={[styles.ruleItemsTitle]}>已订阅</Text>
                {_rulesViews}
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={[styles.headerContainer]}>
                    <Icon name="add" style={[styles.headerIcon]} />
                    <Text style={[styles.headerTitle]} onPress={this.toAddRule}>
                        添加订阅词
                    </Text>
                </View>
                {this.reunderRuleItems()}
            </View>
        );
    }
}

export default connect(
    state => ({
        rules: state.main.rules
    }),
    dispatch => ({
        mainAction: bindActionCreators(mainActions, dispatch)
    })
)(ManageRule);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        height: 44,
        backgroundColor: 'rgba(65,130,235,0.20)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerIcon: {
        color: '#4182EB',
        marginRight: 8,
        fontSize: 20
    },
    headerTitle: {
        color: '#4182EB'
    },
    ruleItemsTitle: {
        margin: 10,
        fontSize: 12,
        color: '#818B9D'
    },
    ruleItem: {
        borderBottomColor: '#E5E5EB',
        borderBottomWidth: 1
    },
    ruleContentContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    keywordContainer: {
        // flex: 1
    },
    ruleKeyword: {
        color: '#5F606A',
        fontSize: 14,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#F6F6F6',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    editContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    editText: {
        color: '#4182EB',
        fontSize: 14,
        marginRight: 15
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        marginBottom: 10
    },
    locationIcon: {
        fontSize: 18
    },
    locationText: {
        color: '#818B9D',
        marginLeft: 8
    }
});
