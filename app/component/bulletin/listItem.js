import React, { Component, PureComponent } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Text, Body, Right, Left } from 'native-base';

import { AppStyles } from '@app/style';
import translation from '@app/filters/translation';

class BulletinItem extends React.Component {
    constructor(props) {
        super(props);
        this.getTrendName = this.getTrendName.bind(this);
    }

    getTrendName(arr) {
        let msg = '';
        if (arr) {
            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].org_role.text === '采购人') {
                    msg = arr[i].org_name;
                    break;
                }
            }
        }
        return msg;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.item.info_uuid === this.props.item.info_uuid) {
            return false;
        }
        // console.log(this.props.item.title);
        return true;
    }

    render() {
        let { item } = this.props;
        // console.log(item.title);
        return (
            <TouchableOpacity
                onPress={() => {
                    // console.log('list-item-click');
                    this.props.onPressItem && this.props.onPressItem();
                }}>
                <Card>
                    <CardItem header>
                        <Text>{item.title}</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.cardContent}>
                            <Text>
                                {translation(item.method, 'bulletinMethods')}
                            </Text>
                            <Text> | </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ width: 240 }}>
                                {this.getTrendName(item.related_orgs)}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Left>
                            <Text>
                                {translation(item.location, 'locationAll')}
                            </Text>
                        </Left>
                        <Right>
                            <Text style={{ marginRight: 0 }}>
                                {item.release_date}
                            </Text>
                        </Right>
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
