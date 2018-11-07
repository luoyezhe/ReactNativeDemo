import React from 'react';

import {
		Scene,
		Stack,
		Modal,
		Router
} from 'react-native-router-flux';

import Login from '@app/view/account/login'
import Main from '@app/view/main/main'

const router = () => {
		return (
				<Router>
						<Modal hideNavBar>
								<Stack key="root">
										<Scene
												title='登录'
												key="login"
												component={Login}
										/>
										<Scene
												title='首页'
												key="home"
												component={Main}
										/>
								</Stack>
						</Modal>

				</Router>
		);
};

export default router;
