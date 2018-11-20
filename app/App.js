/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import Router from './router/Router';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Router />;
    }
}
