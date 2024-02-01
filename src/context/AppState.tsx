import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { TransactionType, UserType, WalletType } from "types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode, walletAction } from "@utils/functions";

type Props = {
  children: React.ReactElement;
};
export type State = {
  user: UserType | null;
  wallet: WalletType | null;
  transaction: TransactionType[];
};

export const Context = createContext(null as any);

const AppState: React.FC<Props> = ({ children }) => {
  const initialState: State = {
    user: null,
    wallet: {
      balance: 0,
    },
    transaction: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  /**
   * The function saves the user details to context
   */

  const setUser = async (value: UserType) => {
    dispatch({
      type: "USER",
      payload: value,
    });
  };

  /**
   * Gets user details from context
   */

  const getUser = async () => {
    const res = await AsyncStorage.getItem("user");
    if (res === null) {
      return;
    }

    dispatch({
      type: "USER",
      payload: decode<UserType>(res),
    });
  };

  /**
   * Gets users transaction from local storage and saves to context
   */
  const fetchTransaction = async () => {
    const res = await AsyncStorage.getItem("transaction");
    if (res === null) {
      return;
    }

    dispatch({
      type: "GET_TRANSACTION",
      payload: decode<TransactionType[]>(res!),
    });
  };

  /**
   * Adds users new transaction to context then
   * it gets the previous transactions, if returns null then adds the new
   * Transaction else it decodes the transaction into a new array
   * and push the new transction to the array then
   * saves it back to local storage
   */
  const addToTransaction = async (value: TransactionType) => {
    dispatch({
      type: "TRANSACTION",
      payload: value,
    });

    const item = JSON.stringify([value]);
    const res = await AsyncStorage.getItem("transaction");
    if (res === null) {
      await AsyncStorage.setItem("transaction", item);
    } else {
      const newData = decode<TransactionType[]>(res);
      newData.push(value);
      await AsyncStorage.setItem("transaction", JSON.stringify(newData));
    }
  };

  // Add the money to the wallet
  const addToWallet = async (value: string) => {
    const res = await walletAction(parseInt(value), "add");
    await AsyncStorage.setItem("wallet", JSON.stringify(res));

    dispatch({
      type: "WALLET",
      payload: res,
    });
  };

  //Subtract the money from the wallet
  const removeFromWallet = async (value: string) => {
    const res = await walletAction(parseInt(value), "sub");
    await AsyncStorage.setItem("wallet", JSON.stringify(res));

    dispatch({
      type: "WALLET",
      payload: res,
    });
  };

  const fetchWallet = async () => {
    const wallet = await AsyncStorage.getItem("wallet");
    dispatch({
      type: "WALLET",
      payload: decode<WalletType>(wallet!),
    });
  };

  return (
    <Context.Provider
      value={{
        user: state.user,
        transaction: state.transaction,
        wallet: state.wallet,
        setUser,
        getUser,
        fetchTransaction,
        addToTransaction,
        addToWallet,
        removeFromWallet,
        fetchWallet,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppState;
