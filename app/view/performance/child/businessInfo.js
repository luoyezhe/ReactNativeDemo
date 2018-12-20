import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardItem, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as performanceActions from '@app/redux/action/performance.js';

import { AppStyles, AppSizes } from '@app/style';

class BusinessInfo extends React.Component {
    constructor(props) {
        super(props);
        this.getBusinessInfo = this.getBusinessInfo.bind(this);
    }
    componentDidMount() {
        this.getBusinessInfo();
    }

    getBusinessInfo() {
        let { performanceAction, id } = this.props;
        performanceAction.getBusinessInfo(id);
    }

    render() {
        let { businessInfo } = this.props;
        if (businessInfo && Object.keys(businessInfo).length > 0) {
            return (
                <Content style={styles.container}>
                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>注册号：</Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.reg_code}
                        </Text>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>
                            注册资本：
                        </Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.reg_cap}万元
                        </Text>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>
                            法人代表：
                        </Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.law_per}
                        </Text>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>
                            营业期限：
                        </Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.op_from} ~{' '}
                            {businessInfo.basic.op_to}
                        </Text>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>
                            公司类型：
                        </Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.org_type}
                        </Text>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>
                            统一社会信用代码：
                        </Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.uniform_code}
                        </Text>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>
                            组织机构代码：
                        </Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.org_code}
                        </Text>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>
                            企业地址：
                        </Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.address}
                        </Text>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Text style={[AppStyles.normalDescText]}>
                            经营范围：
                        </Text>
                        <Text style={[AppStyles.normalText]}>
                            {businessInfo.basic.op_scope}
                        </Text>
                    </View>
                </Content>
            );
        } else {
            return <View />;
        }
    }
}

BusinessInfo.propTypes = {
    id: PropTypes.string
};
BusinessInfo.defaultTypes = {
    id: null
};

export default connect(
    state => ({
        businessInfo: state.performance.businessInfo
    }),
    dispatch => ({
        performanceAction: bindActionCreators(performanceActions, dispatch)
    })
)(BusinessInfo);

const styles = StyleSheet.create({
    container: {
        width: AppSizes.screen.width - 20
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    }
});
