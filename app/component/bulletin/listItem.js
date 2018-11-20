import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Body
} from 'native-base';

import { AppStyles } from '@app/style';

class BulletinItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { item } = this.props;
        return (
            <Card>
                <CardItem header>
                    <Text>{item.title}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>内容</Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Text>底部</Text>
                </CardItem>
            </Card>
        );
    }
}

const propTypes = {
    onPressItem: PropTypes.func,
    item: PropTypes.object
};

BulletinItem.propTypes = propTypes;

export default BulletinItem;
