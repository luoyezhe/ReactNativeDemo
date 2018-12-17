import React, { Component, PureComponent } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Text, Body } from 'native-base';

import { AppStyles } from '@app/style';
import Filters from '@app/filters';

class BulletinItem extends PureComponent {
    constructor(props) {
        super(props);
        this.getTrendName = this.getTrendName.bind(this);
    }

    getTrendName(arr) {
        let msg = '';
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i].org_role.text === '采购人') {
                msg = arr[i].org_name;
                break;
            }
        }
        return msg;
    }

    render() {
        let { item } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log('list-item-click');
                    this.props.onPressItem && this.props.onPressItem();
                }}>
                <Card>
                    <CardItem header>
                        <Text>{item.title}</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.cardContent}>
                            <Text>
                                {Filters.translation(
                                    item.method,
                                    'bulletinMethods'
                                )}
                            </Text>
                            <Text> | </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ width: 220 }}>
                                {this.getTrendName(item.related_orgs)}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>底部</Text>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}

const propTypes = {
    onPressItem: PropTypes.func,
    item: PropTypes.object
};

BulletinItem.propTypes = propTypes;

export default BulletinItem;

const styles = StyleSheet.create({
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    }
});
