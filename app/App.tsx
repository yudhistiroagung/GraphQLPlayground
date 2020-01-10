/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
} from 'react-native';

import { UserListContainer, AddUser } from './containers'

const LIST = 'LIST'
const ADD_EDIT = 'ADD_EDIT'

const App = () => {

    const [screen, setScreen] = useState(LIST)

    const toAddUser = () => {
        setScreen(ADD_EDIT)
    }

    const toList = () => {
        setScreen(LIST)
    }

    const componentToBeRendered = screen === LIST
        ? <UserListContainer toAddUser={toAddUser} />
        : <AddUser cancel={toList} />

    return (
        <SafeAreaView style={styles.container}>
            {componentToBeRendered}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
});

export default App;
