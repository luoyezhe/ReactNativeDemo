import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs, Tab, Container, Header, Content } from 'native-base';
import PropTypes from 'prop-types';

import { AppStyles } from '@app/style';
import DynamicList from './dynamicList';
import BusinessInfo from './businessInfo';

class DetailContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id } = this.props;
        if (id) {
            return (
                <View style={{ flex: 1 }}>
                    <Tabs tabBarPosition="overlayTop">
                        <Tab heading="业绩动态">
                            <DynamicList id={id} />
                        </Tab>
                        <Tab heading="工商信息">
                            <BusinessInfo id={id} />
                        </Tab>
                    </Tabs>
                </View>
            );
        } else {
            return <View />;
        }
    }
}

DetailContent.propTypes = {
    id: PropTypes.string
};

DetailContent.defaultProps = {
    id: null
};

export default DetailContent;

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
