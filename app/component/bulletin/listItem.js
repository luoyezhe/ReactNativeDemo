import React, { Component, PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Text, Body } from 'native-base';

import { AppStyles } from '@app/style';

class BulletinItem extends PureComponent {
    constructor(props) {
        super(props);
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
                        <Body>
                        <Text>{item.is_collect ? '已收藏' : '收藏'}</Text>
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
