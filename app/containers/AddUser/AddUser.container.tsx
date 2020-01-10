import React, {useState} from 'react';

import {View, Button, TextInput, ActivityIndicator} from 'react-native';

import {gql} from 'apollo-boost';
import {Mutation} from 'react-apollo';

import styles from './AddUser.styles';

const MUTATION_ADD_USER = gql`
  mutation addUser($user: CreateUserInput!) {
    createUser(input: $user) {
      id
      name
      email
    }
  }
`;

interface AddEditScreenProps {
  cancel: () => void;
}
export const AddUser = (props: AddEditScreenProps) => {
  const {cancel} = props;

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const renderLoading = () => {
    return <ActivityIndicator size={'large'} color="green" />;
  };

  return (
    <Mutation mutation={MUTATION_ADD_USER}>
      {(addUser: any, {loading, error, data}: any) => {
        console.log('error', error);
        if (data) {
          cancel();
        }
        if (loading) {
          return renderLoading();
        }
        return (
          <View style={styles.container}>
            <Button title="Back" onPress={cancel} />
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
                      email,
                    },
                  },
                };
                addUser(payload);
              }}
              title="Add"
            />
          </View>
        );
      }}
    </Mutation>
  );
};
