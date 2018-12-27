import React, { Component } from 'react';
import { View } from 'react-native';
import {
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImagePicker from 'react-native-image-picker';

import * as mineActions from '@app/redux/action/mine.js';
import api from '@app/api/api.js';
import mineApi from '@app/api/mine.js';
import Toast from '@app/component/common/toast';

// 我的
class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            avatarSource: null
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        let { mineAction } = this.props;
        mineAction.getUserInfo(
            res => {
                this.setState({
                    userInfo: res
                });
            },
            error => {
                Toast.showToast(error.data.message);
            }
        );
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            title: '选择图片',
            takePhotoButtonTitle: '相机',
            chooseFromLibraryButtonTitle: '相册'
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                let service = '/v1/api/user/upload_image/';
                let config = {
                    timeout: 6000,
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                let formData = new FormData();
                formData.append('file', source);
                api.post(service, formData, config)
                    .then(res => {
                        this.setState({
                            userInfo: Object.assign({}, this.state.userInfo, {
                                head_img_url: res.url
                            })
                        });
                    })
                    .catch(error => {
                        Toast.showToast(error.data.message);
                    });
                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    render() {
        let { userInfo } = this.state;
        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer]}>
                            {/*{userInfo.head_img_url === null ? (*/}
                            {/*<Text>选择头像</Text>*/}
                            {/*) : (*/}
                            {/*<Image*/}
                            {/*style={styles.avatar}*/}
                            {/*source={{*/}
                            {/*uri: this.state.userInfo.head_img_url*/}
                            {/*}}*/}
                            {/*/>*/}
                            {/*)}*/}
                            {this.state.avatarSource === null ? (
                                <Text>选择头像</Text>
                            ) : (
                                <Image
                                    style={styles.avatar}
                                    source={this.state.avatarSource}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <Text>姓名：{userInfo.name}</Text>
                        <Text style={styles.cellphone}>
                            手机号：{userInfo.cellphone}
                        </Text>
                        <Text style={styles.cellphone}>
                            性别：{userInfo.sex}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default connect(
    state => ({
        // userInfo: state.mine.userInfo
    }),
    dispatch => ({
        mineAction: bindActionCreators(mineActions, dispatch)
    })
)(PersonInfo);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 75,
        height: 75
    },
    info: {
        paddingLeft: 15
    },
    cellphone: {
        paddingTop: 10
    }
});
