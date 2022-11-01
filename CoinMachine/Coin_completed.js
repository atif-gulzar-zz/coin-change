import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const coin_change_arr = [
  {
    currency : '£2',
    value : 0,
    name:'twoPounds'
  },
  {
    currency : '£1',
    value : 0,
    name:'onePound'
  },
  {
    currency : '50p',
    value : 0,
    name:'halfPound'
  },
  {
    currency : '20p',
    value : 0,
    name:'twentypence'
  },
  {
    currency : '10p',
    value : 0,
    name:'tenpence'
  },
  {
    currency : '5p',
    value : 0,
    name:'fivepence'
  },
  {
    currency : '2p',
    value : 0,
    name:'twopence'
  },
  {
    currency : '1p',
    value : 0,
    name:'onepence'
  }

];

const Coin = () => {
  const [amount, setAmount] = useState(null);
  const [coinsArr, setCoinsArr] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  // const [coins, setCoins] = useState(null);

  // All denominations of Pounds
let denominations = {
	twoPounds: 2.00,
	onePound: 1.00,
	halfPound: 0.50,
  twentypence: 0.20,
	tenpence: 0.10,
	fivepence: 0.05,
  twopence: 0.02,
	onepence: 0.01
}


  const FindingChange = (currency, amount) => {

    //ResultBill is all the bill types and amount of bills we are returning
    let resultBills = {};
    let cashLeftover = amount;
  
    //We are checking from the highest bill first to the lowest
    for (let key in currency)
    {
      //While amount leftover is greater than our current bill
      //we take and subtract it based on the bill's value
      // console.log('key', key)
      // console.log('cashLeftover', cashLeftover)
      // console.log('currency[key]', currency[key])
      while (cashLeftover >= currency[key])
      {
        //Checking to see if the bill type already exist in our return hash.
        if (resultBills[key]){   //If it does, we increment the bill by one.
          console.log('');
          console.log('IF resultBills[key]', resultBills[key])
          resultBills[key] += 1;
          console.log('IF After resultBills[key]', resultBills[key])
        }   
        else{
          //if it doesn't, we add the new key/value pair into the hash.
          resultBills[key] = 1;
          console.log('');
          console.log('ELSE resultBills[key]', resultBills[key])
        }
        //Then we subtract the value from the leftover cash.
        //toFixed(2), this is for fixing any float point errors that JavaScript have.
        //The 2 is to fix it for 2 decimal point.
        cashLeftover = (cashLeftover - currency[key]).toFixed(2)
      }
    }
    console.log('')
    console.log('resultBills')
    console.log(resultBills)

    coin_change_arr.map(() => {

    })

    // let tempArr = [];
    // tempArr.push(resultBills)
    // console.log('')
    // console.log(tempArr)
    // setCoinsArr(tempArr)
    // console.log('')
    // console.log(coinsArr)
    // return resultBills;
  }



  // it behaves like the componentDidUpdate.
  useEffect(() => {
    if (amount) {
      const currencySymbol = amount.match(/[$£]/);

      if( currencySymbol && currencySymbol[0] == '$' ) {
        setErrorMsg('Doller is found');
        return;
      }

      if( currencySymbol && currencySymbol[0] == '£' ){
        console.log('Pounds');
      }

      // if (coinsArr.length == 0) {
      //   setCoinsArr([text]);
      // }
      // else{
      //   setCoinsArr(oldArray => [...oldArray, text]);
      // }
    }
  }, [amount]);


  return (
    <SafeAreaView>
      <View>
        <Text>
          Coming for Coins.js
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={val =>
            setAmount(val)
          }
          value={amount}
          returnKeyType={'done'}
          keyboardType={'numbers-and-punctuation'}
          onSubmitEditing={() => FindingChange(denominations, amount)}
          autoFocus={true}
          placeholder={'Enter Coins'}
        />
      </View>
      <View style={{flexDirection:'column', alignItems:'center'}}>
        {coin_change_arr.map((data, index) => {

          if(data.value > 0 ){
            return(
              <Text key={index}>
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Coin;
