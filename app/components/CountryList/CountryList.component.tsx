import React from 'react';
import { Country } from 'app/models';
import { FlatList, TouchableOpacity, Text } from 'react-native';

import style from './CountryList.style'

interface Props {
    countries: Country[];
}

export const CountryList = (props: Props) => {
    const { countries } = props;


    const _renderItem = (c: Country) => {
        return (
            <TouchableOpacity
                key={c.code}
                style={style.itemContainer}
            >
                <Text style={style.name}>{c.name}</Text>
                <Text style={style.code}>{c.code}</Text>
            </TouchableOpacity>
        )
    }

    const _renderEmptyPlaceholder = () => {
        return <Text style={style.error}>Something went wrong, please try again later!</Text>
    }

    return(
        <FlatList
            data={countries}
            renderItem={({item}) => _renderItem(item)}
            ListEmptyComponent={_renderEmptyPlaceholder}
        />
    )
}