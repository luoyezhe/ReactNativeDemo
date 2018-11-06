import React from 'react';

import {
		Scene,
		Stack,
		Router
} from 'react-native-router-flux';

import Login from '../view/account/login'

const router = () => {
		return (
				<Router>
						<Stack key="root">
								<Scene
										title='登录'
										key="login"
										component={Login}
								/>
						</Stack>
				</Router>
		);
};

export default router;
