import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Left, Right, Content } from 'native-base';

import { AppStyles } from '@app/style/index';
import styles from '@app/style/styles';
import Filters from '@app/filters';

// 招投标详情-主体联系人
class DetailContact extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.renderItemSeparator = this.renderItemSeparator.bind(this);
        this.showMore = this.showMore.bind(this);
        this.state = {
            showMore: false
        };
    }

    showMore() {
        this.setState({
            showMore: !this.state.showMore
        });
    }

    renderRow(rowData) {
        if (rowData) {
            let { item, index } = rowData;
            if (!item) {
                item = rowData;
            }
            let _contacts = item.contacts_free.map((contact, contactIndex) => {
                if (index < 2 || this.state.showMore) {
                    return (
                        <CardItem key={contactIndex}>
                            <Left>
                                <Text>{contact.per_name}</Text>
                            </Left>
                            <Right>
                                <Text>{contact.phone}</Text>
                            </Right>
                        </CardItem>
                    );
                }
            });
            let _more = null;
            if (index > 2) {
                _more = (
                    <CardItem onpress={this.showMore}>
                        <Text>查看更多关联主体</Text>
                    </CardItem>
                );
            }
            return (
                <View>
                    <CardItem>
                        <Text>{item.org_role.text}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>{item.org_name}</Text>
                    </CardItem>
                    {_contacts}
                    {_more}
                </View>
            );
        }
    }

    renderItemSeparator() {
        return <View style={[styles.listSeprator]} />;
    }

    render() {
        let { detail } = this.props;
        let _child = null;
        if (detail.related_orgs && detail.related_orgs.length > 0) {
            _child = (
                <Card>
                    <CardItem>
                        <View style={AppStyles.titleBorderPrimary}>
                            <Text style={[AppStyles.detailItemTitle]}>
                                主体联系人
                            </Text>
                        </View>
                    </CardItem>
                    <FlatList
                        data={detail.related_orgs}
                        renderItem={(item, index) => this.renderRow(item)}
                        ItemSeparatorComponent={this.renderItemSeparator}
                    />
                </Card>
            );
        }
        return <View>{_child}</View>;
    }
}

DetailContact.propTypes = {
    detail: PropTypes.object
};
DetailContact.defaultProps = {
    detail: {}
};

export default DetailContact;
