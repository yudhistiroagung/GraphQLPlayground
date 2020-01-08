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

const QUERY_GET_COUNTRIES = gql`query getCountries {
    countries {
        code
        name
        phone
    }
}`

const App = (response: any) => {
    console.log('response', JSON.stringify(response, null, 4))
    const { data } = response;
    const isLoading: boolean = data.loading as boolean
    const countries: any[] = data.countries || [];
    
    // console.log('total', countries.length);

    const renderLoading = () => {
        return <ActivityIndicator size={"large"} color="green" />;
    }

    const renderItems = (countries: any[] = []) => {
        return (
            <ScrollView style={styles.listContainer}>
                {
                    countries.map((c, idx) => {
                        return (
                            <View
                                key={idx}
                                style={styles.item}>
                                <Text>{c.name}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        );
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
