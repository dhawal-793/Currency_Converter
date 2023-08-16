import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { currencyByRupee } from './constants';


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
    <SafeAreaView>
      <View>
        <Text>Currency Converter</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
