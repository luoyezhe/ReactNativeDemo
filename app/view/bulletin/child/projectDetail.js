import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardItem } from 'native-base';
import PropTypes from 'prop-types';

import { AppStyles } from '@app/style/index';
import Filters from '@app/filters';

// 招投标详情-项目详情
class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { detail } = this.props;
        return (
            <Card>
                <CardItem>
                    <View style={AppStyles.titleBorderPrimary}>
                        <Text style={[AppStyles.detailItemTitle]}>
                            项目详情
                        </Text>
                    </View>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>业务地区</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {Filters.translation(detail.location, 'locationAll')}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>业务预算</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {detail.budget}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>采购方式</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {Filters.translation(detail.method, 'bulletinMethods')}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>采购编号</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {detail.projectid}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>开标地点</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {detail.open_address || '-'}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>开标时间</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {detail.open_date || '-'}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>购买标书时间</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {detail.purchase_date || '-'}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>投标截止时间</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {detail.deadline_date || '-'}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>发布时间</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {detail.release_date}
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={[AppStyles.normalDescText]}>专家</Text>
                    <Text style={[AppStyles.normalText, { marginLeft: 20 }]}>
                        {detail.expert}
                    </Text>
                </CardItem>
            </Card>
        );
    }
}

ProjectDetail.propTypes = {
    detail: PropTypes.object
};
ProjectDetail.defaultProps = {
    detail: {}
};

export default ProjectDetail;
