import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardItem } from 'native-base';
import PropTypes from 'prop-types';

import { AppStyles } from '@app/style/index';
import Filters from '@app/filters';

// 招投标详情-资质详情
class Qualification extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { detail } = this.props;
        if (detail.info_qualification) {
            return (
                <Card>
                    <CardItem>
                        <View style={AppStyles.titleBorderPrimary}>
                            <Text style={[AppStyles.detailItemTitle]}>
                                资质详情
                            </Text>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Text style={[AppStyles.normalText]}>
                            {detail.info_qualification}
                        </Text>
                    </CardItem>
                </Card>
            );
        } else {
            return <View />;
        }
    }
}

Qualification.propTypes = {
    detail: PropTypes.object
};
Qualification.defaultProps = {
    detail: {}
};

export default Qualification;
