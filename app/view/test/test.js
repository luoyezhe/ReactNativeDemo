import React from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    ItemSeparatorComponent,
    TouchableHighlight
} from 'react-native';

import BaseView from '@app/component/BaseView';

// demo页面
export default class Test extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            isRefresh: false
        };
        this._onPress = this._onPress.bind(this);
        this._refresh = this._refresh.bind(this);
    }
    _onPress() {
        console.log('item click');
    }
    _refresh() {
        this.setState({
            isRefresh: true
        });
        console.log('_refresh');
    }
    render() {
        let data = [
            { title: 'Title Text', key: 'item1' },
            { title: 'Title Text', key: 'item1' }
        ];
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item, separators }) => (
                        <TouchableHighlight
                            onPress={() => this._onPress(item)}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={{ backgroundColor: 'white' }}>
                                <Text>{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    onRefresh={this._refresh}
                    refreshing={this.state.isRefresh}
                />
            </View>
        );
    }
}
