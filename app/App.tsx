/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost'

import { Country, GraphQLProps } from './models';

import { CountryList } from './components/CountryList'

const QUERY_GET_COUNTRIES = gql`query getCountries {
    countries {
        code
        name
        phone
    }
}`

const App = (response: any) => {
    const { data } = response as GraphQLProps;
    const isLoading: boolean = data.loading
    const countries: Country[] = data.countries || [] as Country[];

    console.log('data', JSON.stringify(data, null, 4));

    const renderLoading = () => {
        return <ActivityIndicator size={"large"} color="green" />;
    }

    const renderItems = (countries: Country[] = []) => {
        return <CountryList countries={countries} />
    }

    const componentToBeRendered = isLoading
        ? renderLoading()
        : renderItems(countries)
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
        backgroundColor: '#e6e6e6'
    },
    listContainer: {
        flex: 1,
        width: '100%'
    },
    item: {
        height: 70,
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8,
        backgroundColor: '#fff'
    }
});

export default graphql(QUERY_GET_COUNTRIES)(App);
