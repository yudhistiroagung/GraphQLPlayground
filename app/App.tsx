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
    View,
    ActivityIndicator,
    SafeAreaView,
    Button,
    TextInput,
} from 'react-native';

import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'

import { User } from './models/User';

import { UserListContainer } from './containers'

const MUTATION_ADD_USER = gql`mutation addUser($user: CreateUserInput!) {
    createUser(input: $user) {
        id
        name
        email
    }
}`

const LIST = 'LIST'
const ADD_EDIT = 'ADD_EDIT'

const App = () => {

    const [screen, setScreen] = useState(LIST)
    const [user, setUser] = useState(undefined)

    const toAddUser = () => {
        setScreen(ADD_EDIT)
    }

    const toList = () => {
        setScreen(LIST)
    }

    const componentToBeRendered = screen === LIST
        ? <UserListContainer toAddUser={toAddUser} />
        : <AddEditScreen user={user} cancel={toList} />

    return (
        <SafeAreaView style={styles.container}>
            {componentToBeRendered}
        </SafeAreaView>
    );
};

const renderLoadingIndicator = () => {
    return <ActivityIndicator size={"large"} color="green" />;
}

// Add edit screen
interface AddEditScreenProps {
    user?: User;
    cancel: () => void;
}
const AddEditScreen = (props: AddEditScreenProps) => {
    const { user, cancel } = props;

    const [name, setName] = useState(user ? user.name : '')
    const [username, setUsername] = useState(user ? user.username : '')
    const [email, setEmail] = useState(user ? user.email : '')

    return (
        <Mutation mutation={MUTATION_ADD_USER}>
            {(addUser: any, { loading, error, data }: any) => {
                console.log('error', error);
                if (!!data) cancel()
                if (loading) return renderLoadingIndicator()
                return (
                    <View style={styles.screen}>
                        <Button
                            title="Back"
                            onPress={cancel}
                        />
                        <TextInput
                            style={styles.inputText}
                            value={name}
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="Input user name"
                            onChangeText={(value: string) => setName(value)}
                        />
                        <TextInput
                            style={styles.inputText}
                            value={username}
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="Input user username"
                            onChangeText={(value: string) => setUsername(value)}
                        />
                        <TextInput
                            style={styles.inputText}
                            value={email}
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            placeholder="Input user email"
                            onChangeText={(value: string) => setEmail(value)}
                        />
                        <Button
                            onPress={() => {
                                const payload = {
                                    variables: {
                                        user: {
                                            name,
                                            username,
                                            email
                                        },
                                    }
                                };
                                addUser(payload)
                            }}
                            title="Add"
                        />
                    </View>
                )
            }}
        </Mutation>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    screen: {
        flex: 1,
        width: '100%',
    },
    buttonAdd: {
        height: 48,
        backgroundColor: 'blue',
        margin: 8
    },
    inputText: {
        height: 40,
        margin: 8,
        paddingLeft: 4,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        borderRadius: 4
    }
});

export default App;
