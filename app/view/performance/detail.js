import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as performanceActions from '@app/redux/action/performance.js';
import DetailHeader from './child/detailHeader';
import DetailContent from './child/content';

class PerformanceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.getDetail = this.getDetail.bind(this);
    }
    componentDidMount() {
        this.getDetail();
    }

    getDetail() {
        let { performanceAction, id } = this.props;
        performanceAction.getPerformanceDetail(id);
    }

    render() {
        let { detail, id } = this.props;
        console.log('detail', detail);
        return (
            <View style={{ flex: 1 }}>
                <DetailHeader detail={detail} />
                <DetailContent id={id} />
            </View>
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
