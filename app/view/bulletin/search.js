import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'native-base';

import SearchResultList from '../main/child/searchResultList';

// 招投标-搜索
class BulletinSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            inputText: ''
        };
        this.searchAction = this.searchAction.bind(this);
    }

    searchAction() {
        console.log('searchAction');
        console.log(this.input.value);
        this.setState({
            searchInput: this.state.inputText
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.searchContainer]}>
                    <Input
                        ref={ref => {
                            this.input = ref;
                        }}
                        returnKeyType="search"
                        style={[styles.search]}
                        placeholder="输入关键词"
                        clearButtonMode="while-editing"
                        onSubmitEditing={this.searchAction}
                        onChangeText={text =>
                            this.setState({ inputText: text })
                        }
                        value={this.state.inputText}
                    />
                </View>
                <SearchResultList searchInput={this.state.searchInput} />
            </View>
        );
    }
}

export default BulletinSearch;

const styles = StyleSheet.create({
    searchContainer: {
        height: 44,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6
    },
    search: {
        height: 32,
        fontSize: 14,
        backgroundColor: '#F7F7F7'
    }
});
