import React from 'react';
import { User } from 'app/models/User';
import { FlatList, View, Text } from 'react-native';

import style from './UserList.style'

interface Props {
    users: User[]
}

export const UserList = (props: Props) => {
    const { users } = props;

    const _renderItem = (user: User) => {
        return (
            <View
                style={style.item}
            >
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
            </View>
        )
    }

    return (
        <FlatList
            style={style.list}
            data={users}
            renderItem={({ item }) => _renderItem(item)}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#333'}} />}
        />
    );
}