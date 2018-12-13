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
import ImagePicker from 'react-native-image-picker';

// 我的
export default class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            videoSource: null
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
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
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer]}>
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
                        <Text>姓名：王哲</Text>
                        <Text style={styles.cellphone}>
                            手机号：18518572248
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

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
