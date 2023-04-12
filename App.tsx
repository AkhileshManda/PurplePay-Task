import {
  ConnectWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
  useAddress,
  useContract,
  Web3Button,
} from '@thirdweb-dev/react-native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppBar, Snackbar } from '@react-native-material/core';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'specialid12345', // (required)
        channelName: 'Special messasge', // (required)
        channelDescription: 'Notification for special message', // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created: any) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  createChannel();
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      supportedWallets={[metamaskWallet(), rainbowWallet()]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  let abi = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'initialSupply',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'subtractedValue',
          type: 'uint256',
        },
      ],
      name: 'decreaseAllowance',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'addedValue',
          type: 'uint256',
        },
      ],
      name: 'increaseAllowance',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const handleNotification = () => {
    console.log('NOTIFICATION');
    PushNotification.localNotification({
      channelId: 'specialid12345',
      title: 'Payment completed successfully',
      message: 'Niecly Done!',
    });
  };

  const [numTokens, setNumTokens] = useState('');
  const [recieverAddress, setRecieverAddress] = useState('');

  const [approvingTransaction, setApprovingTransaction] = useState(false);
  const [completingTransaction, setCompletingTransaction] = useState(false);

  let contractAddress = '0x057fc153A60370453362459Bcc67bE357451ACe4';
  const { contract } = useContract(contractAddress);

  const address = useAddress();
  return address ? (
    <SafeAreaView style={backgroundStyle}>
      <AppBar
        title="Purple Pay Task"
        style={{ backgroundColor: 'transparent' }}
      />
      <View style={styles.view}>
        <View style={styles.userContainer}>
          <Text style={styles.titleHi}>Hi!</Text>
          <ConnectWallet />
        </View>
        <Text style={styles.title}>Let's Transfer Some Purple Pay Tokens</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setNumTokens}
            value={numTokens}
            keyboardType="numeric"
            placeholder="Number of tokens"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            onChangeText={setRecieverAddress}
            value={recieverAddress}
            placeholder="Reciever Address"
            placeholderTextColor="black"
          />
          <View style={styles.buttonContainer}>
            <Web3Button
              contractAddress={contractAddress} // Your smart contract address
              contractAbi={abi}
              action={_ => {
                console.log('wait');
                setApprovingTransaction(true);
                contract!
                  .call('approve', [address, parseInt(numTokens)])
                  .then(() => {
                    console.log('Approved');
                    // setApprovingTransaction(false);
                    // setCompletingTransaction(true);
                    console.log('NEXT');
                    contract!
                      .call('transferFrom', [
                        address,
                        recieverAddress,
                        parseInt(numTokens),
                      ])
                      .then(val => {
                        // setCompletingTransaction(false);
                        console.log('Transfered');
                        console.log(val);
                        setNumTokens('');
                        setRecieverAddress('');
                        handleNotification();
                      })
                      .catch(error => {
                        //TODO: Display using react-native snack bar
                        console.log(error);
                        <Snackbar
                          message="An error occured in completing the transaction"
                          style={{
                            position: 'absolute',
                            start: 16,
                            end: 16,
                            bottom: 16,
                          }}
                        />;
                      })
                      .finally(() => {
                        // setCompletingTransaction(false);
                        console.log('REACHED');
                      });
                  })
                  .catch(error => {
                    <Snackbar
                      message="An error occured in approving the transaction"
                      style={{
                        position: 'absolute',
                        start: 16,
                        end: 16,
                        bottom: 16,
                      }}
                    />;
                  })
                  .finally(() => {
                    // setApprovingTransaction(false);
                  });
              }}
              onSuccess={result => console.log('Success!')}
              //TODO: Display using react-native snack bar
              onError={error => (
                <Snackbar
                  message="Something went wrong try again"
                  style={{
                    position: 'absolute',
                    start: 16,
                    end: 16,
                    bottom: 16,
                  }}
                />
              )}>
              Transfer funds to other account
            </Web3Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <AppBar
        title="Purple Pay Task"
        style={{ backgroundColor: 'transparent' }}
      />
      <View style={styles.view}>
        <ConnectWallet />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    // borderColor: 'blue',
    marginTop: 12,
    // marginHorizontal: 20,
    marginBottom: 10,
    height: 60,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    width: '100%',
  },
  buttonContainer: {
    margin: 12,
  },
  formContainer: {
    // backgroundColor: 'blue',
    width: '100%',
    padding: 20,
    margin: 20,
  },
  title: {
    color: 'white',
    marginTop: 30,
    fontSize: 17,
    fontWeight: '800',
  },
  titleHi: {
    color: 'white',
    // marginTop: 30,
    fontSize: 30,
    fontWeight: '800',
  },
  userContainer: {
    // backgroundColor: 'blue',
    width: '100%',
    display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignContent: 'center',
    alignItems: 'center',
  },
});

export default App;
function getBalance() {
  throw new Error('Function not implemented.');
}
