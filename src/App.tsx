import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { currencyByRupee } from './constants';
import CurrencyButton from './components/CurrencyButton';


function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')
  const [action, setAction] = useState('convert')

  const buttonPressed = () => {
    if (!inputValue) {
      // TODO: show snackbar
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
        // TODO: show snackbar
      }
    }
    else {
      // TODO: show snackbar
    }
  }
  const handleClick = () => {
    if (action === "convert") {
      buttonPressed()
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

  return (
    <View>
      <View>
        <View>
          <View>
            <Text>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode='always' //only for iOS
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter amount in Rupees'
              placeholderTextColor="#BCBBBB"
            />
          </View>
          <Pressable onPress={() => handleClick()}>
            <Text>{action}</Text>
          </Pressable>
        </View>
        <View>
          {inputValue && resultValue && (
            <Text>
              {`₹ ${inputValue} = `}{resultValue}
            </Text>
          )}
        </View>
      </View>
      <View>
        <FlatList
          numColumns={2}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <Pressable
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

const styles = StyleSheet.create({});

export default App;
