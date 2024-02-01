This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`expo-cli`](https://docs.expo.dev/).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Prerequisites

1. Install [`Expo Go`](https://expo.dev/client) on a physical device.
2. Prepare for development by [`installing the required tools`](https://docs.expo.dev/get-started/installation/#requirements)
3. click on the code icon and clone the git repo

## Step 2: Run the app on your PC

```bash
#Cd into the project directory
cd ctypay

# using npm run
npm start

# OR using Yarn run
yarn start
```
After running the command, click I on your system to open on IOS device or A to open on an android device

## Auth Flow

1. The app consist of the login, sign up, and pin screen for the authentication of the user
2. The values are hard coded and stored in asyncStorage using [`react native asyncStorage`](https://react-native-async-storage.github.io/async-storage/docs)
3. On Creation of account, the user is to fill in their **Name**, **Email** and **Phone number** to get and **OTP** 
4. the OTP is **any 4 digit** number of your choosing
5. Create a 4 digit ***PIN*** for your transaction and login pin then you are navigated to the home screen

## Add Money and Send money

1. The details of the card on the add money are hardcoded and **cannot** be edited
2. The send money account name is auto generated using any account number and bank name, the default is **John Doe**
3. You must use your **Login PIN** to send money

## State Management

1. The app uses [`React Context API`](https://legacy.reactjs.org/docs/context.html) for its state management
2. It also uses [`react native asyncStorage`](https://react-native-async-storage.github.io/async-storage/docs) to save data to the local storage

## Functions

### decode

The decode function is used to parse JSON stringified data to the correct value
```bash
    function decode<T>(value: string): T {
      return JSON.parse(value);
    }
```

### walletAction

The wallet Action performs the balance subtraction and additon action.

it takes 2 parameters (value and action) the value is the amount the user used to make a transaction

the action is of 2 types ***add*** and ***sub*** meaning add and subtract respectively

```bash
    async function walletAction<T extends { balance: number }>( value: number, action: "add" | "sub" ): Promise<T> {
      const wallet = await AsyncStorage.getItem("wallet");

      let data = decode<T>(wallet);
      if (action === "add") {
        data.balance + value;
      } else {
        data.balance - value;
      }
      return data;
    }
```

### Format Amount

This is used to format the amount value in the app

```bash
const formatAmount = (n: number) => {
  const value = n.toString();
  let b = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return b.toString();
};
```

### All other functions used are commented on in the app Codebase

   

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://docs.expo.dev/router/reference/troubleshooting/) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
