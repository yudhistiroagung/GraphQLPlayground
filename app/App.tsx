/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useReducer } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
    ScrollView,
    SafeAreaView,
    Button,
    TextInput,
} from 'react-native';

import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost'

import { Country, GraphQLProps } from './models';
import { User } from './models/User';
import { UserList } from './components/UserList/UserList.component';

const QUERY_GET_USERS = gql`query getUsers {
    users {
        data {
            id
            email
            name
        }
    }
}`

const LIST = 'LIST'
const ADD_EDIT = 'ADD_EDIT'

const App = (response: any) => {

    console.log('data', JSON.stringify(response, null, 4))

    const [screen, setScreen] = useState(LIST)
    const [user, setUser] = useState(undefined)

    const { data } = response as GraphQLProps;
    const isLoading: boolean = data.loading
    const users: User[] = data.users && data.users.data || [] as User[];

    const renderLoading = () => {
        return <ActivityIndicator size={"large"} color="green" />;
    }

    const toAddUser = () => {
        setScreen(ADD_EDIT)
    }

    const toList = () => {
        setScreen(LIST)
    }

    const componentToBeRendered = isLoading
        ? renderLoading()
        : screen === LIST
            ? <ListScreen users={users} toAddUser={toAddUser} />
            : <AddEditScreen user={user} cancel={toList} />

    return (
        <SafeAreaView style={styles.container}>
            {componentToBeRendered}
        </SafeAreaView>
    );
};

// List screen
interface ListScreenProps {
    users: User[];
    toAddUser: () => void;
}
const ListScreen = (props: ListScreenProps) => {
    const { users, toAddUser } = props;
    return (
        <View style={styles.screen}>
            <UserList users={users} />
            <Button
                title={'Add New User'}
                onPress={toAddUser}
            />
        </View>
    )
}

// Add edit screen
interface AddEditScreenProps {
    user?: User;
    cancel: () => void;
}
const AddEditScreen = (props: AddEditScreenProps) => {
    const { user, cancel } = props;

    const [name, setName] = useState(user ? user.name : '')
    const [email, setEmail] = useState(user ? user.email : '')

    return (
        <View style={styles.screen}>
            <Button
                title="Back"
                onPress={cancel}
            />
            <TextInput
                style={styles.inputText}
                value={name}
                placeholder="Input user name"
                onChangeText={(value: string) => setName(value)}
            />
            <TextInput
                style={styles.inputText}
                value={email}
                placeholder="Input user email"
                onChangeText={(value: string) => setEmail(value)}
            />
        </View>
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

export default graphql(QUERY_GET_USERS)(App);
