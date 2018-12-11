import React from 'react';
import { Text, View, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bulletinActions from '@app/redux/action/bulletin.js';

import BaseView from '@app/component/BaseView';
import api from '@app/api/bulletin';

// 标讯详情
class BulletinDetail extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        };
        this.getDetail = this.getDetail.bind(this);
        this.collectAction = this.collectAction.bind(this);
    }

    componentDidMount() {
        this.getDetail();
    }

    render() {
        return (
            <View>
                <Text>{this.state.detail.title}</Text>
                <Button
                    onPress={this.collectAction}
                    title={this.state.detail.collect_id ? '取消收藏' : '收藏'}
                />
            </View>
        );
    }

    collectAction() {
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
                    detail: super.getSourceItem(
                        'bulletin',
                        data.info_uuid,
                        'detail'
                    )
                });
                console.log('=========>>>', this.state.detail);
                super.showToast('收藏成功');
            });
        } else {
            // 取消收藏
            let id = this.state.detail.collect_id;
            let info_uuid = this.state.detail.info_uuid;
            bulletinAction.bulletinUnCollect({ id, info_uuid }, () => {
                this.setState({
                    detail: super.getSourceItem('bulletin', info_uuid, 'detail')
                });
                super.showToast('取消收藏成功');
            });
        }
    }

    getDetail() {
        let { id } = this.props;
        api.getDetail(id)
            .then(res => {
                console.log('detail', res);
                // super.updateSourceItem('bulletin', id, 'detail', res);
                this.setState({
                    detail: super.getSourceItem('bulletin', id, 'detail')
                });
            })
            .catch(() => {
                // showToast(error);
            });
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
