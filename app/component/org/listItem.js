import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Text, Body, Right, Left } from 'native-base';

import Filters from '@app/filters';
import { AppStyles } from '@app/style';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { item } = this.props;
        // console.log('item', item);
        if (item) {
            let _location = null;
            if (item.location) {
                _location = (
                    <Text style={AppStyles.descText}>
                        {Filters.translation(
                            item.location.value,
                            'locationAll'
                        )}
                    </Text>
                );
            }
            return (
                <TouchableOpacity
                    onPress={() => {
                        // console.log('list-item-click');
                        this.props.onPressItem && this.props.onPressItem();
                    }}>
                    <Card>
                        <CardItem header>
                            <Text>{item.org_name}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={[styles.tag]}>{item.recent_date}</Text>
                        </CardItem>
                        <CardItem footer>
                            {_location}
                            <Text style={[AppStyles.descText]}> | </Text>
                            <Text style={[AppStyles.descText]}>
                                {item.reg_cap}万元
                            </Text>
                            <Text style={[AppStyles.descText]}> | </Text>
                            <Text style={[AppStyles.descText]}>
                                {item.est_date}成立
                            </Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            );
        } else {
            return <View />;
        }
    }
}

const propTypes = {
    onPressItem: PropTypes.func,
    item: PropTypes.object
};

ListItem.propTypes = propTypes;

export default ListItem;

const styles = StyleSheet.create({
    tag: {
        color: '#fff',
        backgroundColor: '#4182EB',
        fontSize: 12,
        padding: 3
    }
});
