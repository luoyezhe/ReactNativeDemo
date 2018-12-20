import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardItem } from 'native-base';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import { AppStyles } from '@app/style/index';
import Filters from '@app/filters';
import api from '@app/api/bulletin';
import Toast from '@app/component/common/toast';

// 招投标详情-公告正文
class DetailContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
        this.getContent = this.getContent.bind(this);
    }
    componentDidMount() {
        this.getContent();
    }

    getContent() {
        const { id } = this.props;
        console.log('id', id);
        if (!id) {
            return;
        }
        api.getBulletinContent(id)
            .then(res => {
                console.log('content', res);
                this.setState({
                    content: res.info_content
                });
            })
            .catch(error => {
                Toast.showToast(error.data.message);
            });
    }

    render() {
        return (
            <View>
                <Card>
                    <CardItem>
                        <View style={AppStyles.titleBorderPrimary}>
                            <Text style={[AppStyles.detailItemTitle]}>
                                公告正文
                            </Text>
                        </View>
                    </CardItem>
                </Card>
                <WebView
                    source={{ html: this.state.content }}
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mixedContentMode={'always'}
                    automaticallyAdjustContentInsets={true}
                    allowUniversalAccessFromFileURLs={true}
                    startInLoadingState={true}
                    style={{ height: 400, paddingBottom: 20 }}
                    onLoadProgress={e => console.log(e.nativeEvent.progress)}
                />
            </View>
        );
    }
}

DetailContent.propTypes = {
    id: PropTypes.string
};

export default DetailContent;
