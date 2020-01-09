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
    Text,
    ScrollView,
    SafeAreaView,
    Button,
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
    return (
        <View style={styles.screen}>
            <Button
                title="Back"
                onPress={cancel}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6e6'
    },
    screen: {
        flex: 1,
        width: '100%',
    },
    buttonAdd: {
        height: 48,
        backgroundColor: 'blue',
        margin: 8
    }
});

export default graphql(QUERY_GET_USERS)(App);
