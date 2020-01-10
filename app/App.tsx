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

import { graphql, Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import { } from 'apollo-client'

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

const MUTATION_ADD_USER = gql`mutation addUser($user: CreatUserInput) {
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
        ? <ListScreen toAddUser={toAddUser} />
        : <AddEditScreen user={user} cancel={toList} />

    return (
        <SafeAreaView style={styles.container}>
            {componentToBeRendered}
        </SafeAreaView>
    );
};

// List screen
interface ListScreenProps {
    toAddUser: () => void;
}
const ListScreen = (props: ListScreenProps) => {
    const { toAddUser } = props;

    return (
        <Query query={QUERY_GET_USERS}>
            {(response: any) => {
                const { data, loading, error } = response as GraphQLProps;
                const users: User[] = data && data.users ? data.users.data : [];
                if (loading) return renderLoadingIndicator()
                return (
                    <View style={styles.screen}>
                        <UserList users={users} />
                        <Button
                            title={'Add New User'}
                            onPress={toAddUser}
                        />
                    </View>
                )
            }}
        </Query>
    )
}

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
