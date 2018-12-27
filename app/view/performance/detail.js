import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
    Container,
    Header,
    Icon,
    Button,
    Left,
    Right,
    Body,
    Title
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as performanceActions from '@app/redux/action/performance.js';
import DetailHeader from './child/detailHeader';
import DetailContent from './child/content';
import Toast from '@app/component/common/toast';

class PerformanceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.getDetail = this.getDetail.bind(this);
        this.shareAction = this.shareAction.bind(this);
        this.collectAction = this.collectAction.bind(this);
        this.back = this.back.bind(this);
        this.state = {
            starColor: '#ffff00'
        };
    }
    componentDidMount() {
        this.getDetail();
    }

    getDetail() {
        let { performanceAction, id } = this.props;
        performanceAction.getPerformanceDetail(id, res => {
            console.log('re', res);
            if (res.is_collect) {
                this.setState({
                    starColor: '#ff0000'
                });
            } else {
                this.setState({
                    starColor: '#ffff00'
                });
            }
        });
    }

    shareAction() {
        console.log('share');
    }
    collectAction() {
        console.log('collectAction');
        let { detail, id, performanceAction } = this.props;
        if (!detail.org_name) {
            return;
        }
        let data = {};
        if (detail.is_collect) {
            // 取消收藏
            performanceAction.unCollectOrg(
                detail.is_collect,
                () => {
                    this.getDetail();
                    Toast.showToast('取消收藏成功');
                },
                error => {
                    Toast.showToast(error.data.message);
                }
            );
        } else {
            // 收藏
            data.org_uuid = id;
            data.address = detail.address;
            data.est_date = detail.est_date;
            data.location = detail.location;
            data.law_per = detail.law_per;
            data.org_logo = detail.org_logo;
            data.org_name = detail.org_name;
            data.reg_cap = detail.reg;
            performanceAction.collectOrg(
                data,
                () => {
                    this.getDetail();
                    Toast.showToast('收藏成功');
                },
                error => {
                    Toast.showToast(error.data.message);
                }
            );
        }
    }
    back() {
        console.log('back');
        Actions.pop();
    }

    render() {
        let { detail, id } = this.props;
        console.log('detail', detail);
        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button transparent onPress={this.back}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{detail.org_name}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.collectAction}>
                            <Icon
                                family="FontAwesome"
                                name="star"
                                style={{ color: this.state.starColor }}
                            />
                        </Button>
                        <Button transparent onPress={this.shareAction}>
                            <Icon name="share" />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 1 }}>
                    <DetailHeader detail={detail} />
                    <DetailContent id={id} />
                </View>
            </Container>
        );
    }
}

export default connect(
    state => ({
        detail: state.performance.detail
    }),
    dispatch => ({
        performanceAction: bindActionCreators(performanceActions, dispatch)
    })
)(PerformanceDetail);
