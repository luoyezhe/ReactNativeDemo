import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Header, Left, Icon } from 'native-base';

import BaseView from '@app/component/BaseView';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bulletinActions from '@app/redux/action/bulletin.js';
import Toase from '@app/component/common/toast';

import DetailHeader from './child/detailHeader';
import DetailContact from './child/detailContact';
import ProjectDetail from './child/projectDetail';
import DetailContent from './child/detailContent';

// 招投标详情
class BulletinDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        };
        this.getDetail = this.getDetail.bind(this);
        this.collectAction = this.collectAction.bind(this);
        this.back = this.back.bind(this);
    }
    componentDidMount() {
        this.getDetail();
    }

    getDetail() {
        let { id, bulletinAction } = this.props;
        Actions.LoadingModal({ backExit: false });
        bulletinAction.getBulletinDetail(
            id,
            res => {
                console.log('detail', res);
                Actions.pop();
                this.setState({
                    detail: res
                });
            },
            error => {
                Actions.pop();
                Toase.showToast(error);
            }
        );
    }

    collectAction() {
        console.log('detail-state', this.state);
        let { bulletinAction } = this.props;
        if (!this.state.detail.collect_id) {
            // 收藏
            let data = {
                collect_type: 'bulletin',
                info_uuid: this.state.detail.info_uuid,
                title: this.state.detail.title,
                release_date: this.state.detail.release_date,
                location: this.state.detail.location,
                tender: this.state.detail.tender
            };
            bulletinAction.bulletinCollect(data, () => {
                this.setState({
                    detail: Object.assign({}, this.state.detail, {
                        collect_id: data.info_uuid
                    })
                });
                console.log('=========>>>', this.state.detail);
                Toase.showToast('收藏成功');
            });
        } else {
            // 取消收藏
            let id = this.state.detail.collect_id;
            let info_uuid = this.state.detail.info_uuid;
            bulletinAction.bulletinUnCollect({ id, info_uuid }, () => {
                this.setState({
                    detail: Object.assign({}, this.state.detail, {
                        collect_id: null
                    })
                });
                Toase.showToast('取消收藏成功');
            });
        }
    }

    back() {
        Actions.pop();
    }

    render() {
        return (
            <Content>
                <DetailHeader detail={this.state.detail} />
                <DetailContact detail={this.state.detail} />
                <ProjectDetail detail={this.state.detail} />
                <DetailContent id={this.props.id} />
            </Content>
        );
    }
}

export default connect(
    state => ({
        // hasNext: state.bulletin.bulletin.next
    }),
    dispatch => ({
        bulletinAction: bindActionCreators(bulletinActions, dispatch)
    })
)(BulletinDetail);
