import React from 'react';

import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import {User} from 'app/models/User';
import {GraphQLProps} from 'app/models';
import {View, Button, ActivityIndicator} from 'react-native';
import {UserList} from '../../components';

import styles from './UserListContainer.styles';

const QUERY_GET_USERS = gql`
  query getUsers {
    users {
      data {
        id
        email
        name
      }
    }
  }
`;

// List screen
interface UserListContainerProps {
  toAddUser: () => void;
}
export const UserListContainer = (props: UserListContainerProps) => {
  const {toAddUser} = props;

  const renderLoading = () => {
    return <ActivityIndicator size={'large'} color="green" />;
  };

  return (
    <Query query={QUERY_GET_USERS}>
      {(response: any) => {
        const {data, loading} = response as GraphQLProps;
        const users: User[] = data && data.users ? data.users.data : [];
        if (loading) {
          return renderLoading();
        }
        return (
          <View style={styles.container}>
            <UserList users={users} />
            <Button title={'Add New User'} onPress={toAddUser} />
          </View>
        );
      }}
    </Query>
  );
};
