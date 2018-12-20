import React, { Component } from 'react';
import { Text, View, BackHandler, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { AppSizes, AppStyles, AppColors } from '@app/style/index';
import Spinner from 'react-native-spinkit';
import { Actions } from 'react-native-router-flux';

/**
 * 加载中Modal
 */
class LoadingModal extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        // if (this.loadingModal) {
        //     this.loadingModal.open();
        // }
        // this.handle = BackHandler.addEventListener(
        //     'loaddingBack',
        //     this.onClose
        // );
    }

    componentWillUnmount() {
        // if (this.handle) {
        //     this.handle.remove();
        // }
    }

    onClose() {
        Actions.pop();
        return true;
    }

    render() {
        return (
            <Modal
                ref={c => (this.loadingModal = c)}
                visible={true}
                transparent={true}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <View
                        style={{
                            width: 200,
                            height: 150,
                            backgroundColor: '#000',
                            opacity: 0.3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10
                        }}>
                        <View>
                            <Spinner
                                style={[AppStyles.centered]}
                                isVisible={true}
                                size={50}
                                type="Wave"
                                color="#FFF"
                            />
                            <Text style={AppStyles.normalTextWhite}>
                                {this.props.text}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

LoadingModal.propTypes = {
    text: PropTypes.string,
    backExit: PropTypes.bool
};
LoadingModal.defaultProps = {
    text: '加载中...',
    backExit: true
};

export default LoadingModal;
