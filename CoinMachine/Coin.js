import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';

const denominations = [
  {
    currency : '£2',
    value : 0,
    amount:2.00
  },
  {
    currency : '£1',
    value : 0,
    amount:1.00
  },
  {
    currency : '50p',
    value : 0,
    amount:0.50
  },
  {
    currency : '20p',
    value : 0,
    amount:0.20
  },
  {
    currency : '10p',
    value : 0,
    amount:0.10
  },
  {
    currency : '5p',
    value : 0,
    amount:0.05
  },
  {
    currency : '2p',
    value : 0,
    amount:0.02
  },
  {
    currency : '1p',
    value : 0,
    amount:0.01
  }
];

const Coin = () => {
  const [amount, setAmount] = useState(null);
  const [displayCoins, setDisplayCoins] = useState([])

  const FindingChange = (denominationsArr, amount) => {

    if(!amount) return;

    let currency = denominationsArr.map((item) => {
      return {...item, value: 0}
    });

    let helperObjt = {};
    let cashLeftover = amount.replace('£','');
  
    //We are checking from the highest bill first to the lowest
    for (let key in currency)
    {
      //While amount leftover is greater than our current bill
      //we take and subtract it based on the bill's value
      while (cashLeftover >= currency[key].amount)
      {
        //Checking to see if the bill type already exist in our return hash.
        if (helperObjt[key]){   //If it does, we increment the bill by one.
          helperObjt[key] += 1;
          currency[key].value += 1;
        }   
        else{
          //if it doesn't, we add the new key/value pair into the hash.
          helperObjt[key] = 1;
          currency[key].value = 1;
        }
        //Then we subtract the value from the leftover cash.
        //toFixed(2), this is for fixing any float point errors that JavaScript have.
        //The 2 is to fix it for 2 decimal point.
        cashLeftover = (cashLeftover - currency[key].amount).toFixed(2)
      }
    }

    setDisplayCoins([...currency]);
  }

  // it behaves like the componentDidUpdate.
  useEffect(() => {

    setDisplayCoins([])

    if (amount) {
      const currencySymbol = amount.match(/[$£]/);

      if( currencySymbol && currencySymbol[0] == '$' ) {
        if(amount.indexOf('$') > 0){
          Alert.alert('Error', 'Please enter correct amount.');
          return;
        }
        Alert.alert('Error', 'Please enter the correct currency.');
        return;
      }

      if( currencySymbol && currencySymbol[0] == '£' ){
        console.log('Pounds');
        if(amount.indexOf('£') > 0){
          Alert.alert('Error', 'Please enter correct amount.');
          return;
        }
      }

      FindingChange(denominations, amount)
    }
    
  }, [amount]);

  return (
    <SafeAreaView>
      <View style={{flexDirection:'column', alignItems:'center'}}>
        <Text style={{fontSize:25, marginTop:20, }}>
          Coin Change
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={val => setAmount(val) }
          value={amount}
          returnKeyType={'done'}
          keyboardType={'numbers-and-punctuation'}
          autoFocus={true}
          placeholder={'Enter Coin(s)'}
        />
      </View>
      <View style={{flexDirection:'column', alignItems:'center'}}>
        {displayCoins.map((data, i) => {
          if(data.value > 0){ 
            return(
              <Text style={{fontSize:18}} key={i}>
                {data.value} x {data.currency}
              </Text>
          )
        }
      })
    }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical:15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor:'#d3d3d3',
    borderRadius:8,
    padding: 10,
    fontSize:15
  },
});

export default Coin;
