import React, { PropsWithChildren } from 'react'
import { View, Text, StyleSheet } from 'react-native'

type CurrencyButtonProps = PropsWithChildren<{
    name: string;
    flag: string;
    symbol: string;
}>

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.flag}>{props.flag}</Text>
            <View style={styles.currencyText}>
                <Text style={styles.symbol}>{props.symbol}</Text>
                <Text style={styles.currency}>{props.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'
    },
    flag: {
        fontSize: 42,
        color: "#FFFFFF",
        marginRight: 4
    },
    currencyText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    currency: {
        margin: 3,
        fontSize: 14,
        fontWeight: 'bold',
        color: "#2d3436",
    },
    symbol: {
        margin: 3,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#2d3436",
    }
})

export default CurrencyButton