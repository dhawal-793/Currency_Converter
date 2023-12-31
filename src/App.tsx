import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import { currencyByRupee } from './constants';
import CurrencyButton from './components/CurrencyButton';


function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')
  const [action, setAction] = useState('convert')

  const convertCurrency = () => {
    if (!inputValue) {
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }

    const targetValue = currencyByRupee.find((item) => item.name === targetCurrency)

    if (targetValue !== undefined) {
      const inputAmount = parseFloat(inputValue)
      if (!isNaN(inputAmount)) {
        const convertedValue = inputAmount * targetValue.value
        const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
        setResultValue(result)
        setTargetCurrency(targetValue.name)
      }
      else {
        return Snackbar.show({
          text: "Not a valid number to convert",
          backgroundColor: "#F4BE2C",
          textColor: "#000000"
        })
      }
    }
    else {
      return Snackbar.show({
        text: "Choose a currency to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }
  }
  const handleClick = () => {
    if (action === "convert") {
      convertCurrency()
      if ((inputValue && targetCurrency) || resultValue)
        setAction("reset")
    } else {
      reset()
      setAction("convert")
    }
  }
  const reset = () => {
    setInputValue('')
    setResultValue('')
    setTargetCurrency('')
  }

  useEffect(() => {
    if (action === "reset" && inputValue && targetCurrency) {
      convertCurrency();
    }
  }, [targetCurrency, inputValue])

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode='always' //only for iOS
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter amount in Rupees'
              placeholderTextColor="#BCBBBB"
              style={styles.input}
            />
          </View>
          <Pressable
            onPress={() => handleClick()}
            style={[styles.button, { borderColor: action === "convert" ? "#54A051" : "#E4583F" }]}
          >
            <Text style={[styles.buttonText, { color: action === "convert" ? "#54A051" : "#E4583F" }]}>{action}</Text>
          </Pressable>
        </View>
        <View style={styles.resultContainer}>
          {inputValue && resultValue && (
            <Text style={styles.resultTxt} >
              {`₹ ${inputValue} = `}{resultValue}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          numColumns={2}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.currencyCard,
                targetCurrency === item.name && styles.selectedCard
              ]}
              onPress={() => setTargetCurrency(currency => currency === item.name ? "" : item.name)}
            >
              <CurrencyButton {...item} />
            </Pressable>
          )}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: '#51515f',
  },
  topContainer: {
    flex: 1,
    marginTop: 80,
    marginBottom: -80,
    gap: 20,
    paddingHorizontal: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    gap: 20
  },
  rupeesContainer: {
    flex: 1,
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 8,
    width: 'auto',
    paddingHorizontal: 10
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  input: {
    height: 40,
    fontWeight: '600',
    color: '#000000',
    width: '90%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    height: 40,
    width: 80,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderColor: '#ffffff',
    height: 70,
  },
  resultTxt: {
    textAlign: 'center',
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '700',
  },
  bottomContainer: {
    flex: 2,
    paddingHorizontal: 30,
  },
  currencyCard: {
    flex: 1,
    margin: 12,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  selectedCard: {
    backgroundColor: '#58C92D',
  },
});

export default App;
