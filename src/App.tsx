import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')
  const [action, setAction] = useState('convert')

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
