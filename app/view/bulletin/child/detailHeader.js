import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Left, Right, Content } from 'native-base';

import { AppStyles } from '@app/style/index';
import Filters from '@app/filters';

// 招投标详情头部
class DetailHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Card>
                    <CardItem>
                        <Text style={[AppStyles.detailTitleText]}>
                            {this.props.detail.title}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text style={AppStyles.descText}>
                                {this.props.detail.release_date}
                            </Text>
                            <Text> | </Text>
                            <Text style={AppStyles.descText}>
                                {Filters.translation(
                                    this.props.detail.location,
                                    'locationAll'
                                )}
                            </Text>
                        </Left>
                        <Right>
                            <Text style={AppStyles.descText}>
                                {this.props.detail.deadline_date}
                            </Text>
                        </Right>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

DetailHeader.propTypes = {
    detail: PropTypes.object
};
DetailHeader.defaultProps = {
    detail: {}
};

export default DetailHeader;
