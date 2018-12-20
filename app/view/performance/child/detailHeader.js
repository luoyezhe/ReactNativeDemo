import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { AppStyles } from '@app/style';

class DetailHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { detail } = this.props;
        if (detail) {
            return (
                <View style={[styles.container]}>
                    <View>
                        <Text style={[AppStyles.normalTextWhite]}>
                            {detail.org_name}
                        </Text>
                    </View>
                    <View
                        style={[AppStyles.flexDirectionRow, { marginTop: 15 }]}>
                        <Text style={[AppStyles.descTextWhite]}>
                            {detail.law_per}
                        </Text>
                        <Text style={[AppStyles.descTextWhite]}> | </Text>
                        <Text style={[AppStyles.descTextWhite]}>
                            {detail.reg_cap}
                        </Text>
                        <Text style={[AppStyles.descTextWhite]}> | </Text>
                        <Text style={[AppStyles.descTextWhite]}>
                            {detail.est_date}
                        </Text>
                    </View>
                    <View style={[styles.tag]}>
                        <Text style={[AppStyles.descTextWhite]}>
                            {detail.reg_state}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return <View />;
        }
    }
}

DetailHeader.propTypes = {
    detail: PropTypes.object
};

DetailHeader.defaultProps = {
    detail: null
};

export default DetailHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        color: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        height: 130,
        paddingTop: 30,
        paddingBottom: 15
    },
    tag: {
        backgroundColor: '#1AAD1A',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4
    }
});
