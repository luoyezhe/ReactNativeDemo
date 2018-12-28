import React from 'react';
import {
    Text,
    View,
    StatusBar,
    InteractionManager,
    ScrollView,
    StyleSheet
} from 'react-native';
import { Container, Header, Left, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as bulletinActions from '@app/redux/action/bulletin.js';
import * as mainActions from '@app/redux/action/main.js';
import BaseView from '@app/component/BaseView';
import PullListView from '@app/component/common/PullLoadMoreListView';
import BulletinItem from '@app/component/bulletin/listItem';

import { AppStyles, AppSizes } from '@app/style';

// 招标页面
class Bulletin extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            rule: []
        };
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.toSearch = this.toSearch.bind(this);
        this.getRules = this.getRules.bind(this);
        this.renderRuleItems = this.renderRuleItems.bind(this);
        this.toManageRules = this.toManageRules.bind(this);
    }
    componentDidMount() {
        if (this.props.bulletinDate && this.props.bulletinDate.length > 0) {
            return;
        }
        this.getRules();
        InteractionManager.runAfterInteractions(() => {
            this.refreshData();
        });
    }
    refreshData(id) {
        if (this.pullList) {
            this.pullList.showRefreshState();
        }
        this.refresh(id);
    }
    refresh(id) {
        console.log('============refresh==============');
        let { bulletinAction, rules } = this.props;
        let params = {
            page: 1
        };
        if (id) {
            params.rule = [id];
        } else {
            params.rule = rules.map(rule => {
                return rule.id;
            });
        }
        this.setState({
            rule: params.rule
        });
        bulletinAction.getBulletinList(params, res => {
            console.log('=============refreshComplete=================');
            this.pullList.refreshComplete(this.props.hasNext);
        });
    }
    loadMore() {
        console.log('============loadMore==============');
        let { bulletinAction } = this.props;
        let params = {
            page: this.props.page + 1
        };
        bulletinAction.getBulletinList(
            params,
            res => {
                this.pullList.loadMoreComplete(this.props.hasNext);
            },
            error => {
                this.pullList.loadMoreComplete(this.props.hasNext);
            }
        );
    }

    getRules() {
        const { mainAction } = this.props;
        mainAction.getRules();
    }

    toSearch() {
        Actions.push('bulletinSearch');
    }

    toManageRules() {
        console.log('toManageRules');
        Actions.push('manageRule');
    }

    renderRow(rowData) {
        // console.log('rowData', rowData.title);
        return (
            <BulletinItem
                item={rowData}
                onPressItem={() => {
                    console.log('to detail');
                    Actions.bulletinDetail({ id: rowData.info_uuid });
                }}
            />
        );
    }

    renderRuleItems() {
        const { rules } = this.props;
        console.log(this.state.rule);
        let _items = rules.map(rule => {
            let _ruleStyle = [styles.ruleItem];
            if (
                this.state.rule.length === 1 &&
                this.state.rule.indexOf(rule.id) >= 0
            ) {
                _ruleStyle.push(styles.ruleItemActive);
            }
            return (
                <Text
                    style={_ruleStyle}
                    key={rule.id}
                    onPress={() => {
                        this.refreshData(rule.id);
                    }}>
                    {rule.keyword}
                </Text>
            );
        });
        let totalRuleStyle = [styles.ruleItem];
        if (this.state.rule.length > 1) {
            totalRuleStyle.push(styles.ruleItemActive);
        }
        return (
            <View style={[styles.rulesContainer]}>
                <View style={[styles.rulesItems]}>
                    <ScrollView
                        overScrollMode="auto"
                        automaticallyAdjustContentInsets={false}
                        horizontal={true}>
                        <Text
                            style={totalRuleStyle}
                            onPress={() => this.refreshData()}>
                            全部
                        </Text>
                        {_items}
                    </ScrollView>
                </View>
                <View style={[styles.addIconContainer]}>
                    <Icon name="add" onPress={() => this.toManageRules()} />
                </View>
            </View>
        );
    }

    render() {
        // let dataSource = this.props.bulletinDate;
        let dataSource = super.getListDataFromSource(
            'bulletin',
            this.props.bulletinDate
        );
        // let _rulesViews = this.renderRuleItems()
        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Right>
                        <Icon name="search" onPress={this.toSearch} />
                    </Right>
                </Header>
                <View style={{ backgroundColor: '#F7F7FA', flex: 1 }}>
                    <StatusBar
                        hidden={false}
                        backgroundColor={'transparent'}
                        translucent
                        barStyle={'light-content'}
                    />
                    {this.renderRuleItems()}
                    <PullListView
                        style={{ flex: 1 }}
                        ref={ref => {
                            this.pullList = ref;
                        }}
                        renderItem={(rowData, index) => this.renderRow(rowData)}
                        refresh={this.refresh}
                        loadMore={this.loadMore}
                        data={dataSource}
                    />
                </View>
            </Container>
        );
    }
}

export default connect(
    state => ({
        bulletinDate: state.bulletin.bulletin.data,
        page: state.bulletin.bulletin.page,
        hasNext: state.bulletin.bulletin.next,
        rules: state.main.rules
    }),
    dispatch => ({
        bulletinAction: bindActionCreators(bulletinActions, dispatch),
        mainAction: bindActionCreators(mainActions, dispatch)
    })
)(Bulletin);

const styles = StyleSheet.create({
    rulesContainer: {
        height: 44,
        // width: AppSizes.screen.width - 50,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    rulesItems: {
        flex: 1
    },
    ruleItem: {
        color: '#818B9D',
        fontSize: 14,
        padding: 13
    },
    ruleItemActive: {
        color: '#4182EB',
        borderBottomColor: '#4182EB',
        borderBottomWidth: 2
    },
    addIconContainer: {
        width: 50,
        paddingTop: 8,
        alignItems: 'center'
    }
});
