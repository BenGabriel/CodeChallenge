import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/dashboard/Home";
import Login from "@screens/auth/Login";
import Register from "@screens/auth/Register";
import SendMoney from "@screens/wallet/SendMoney";
import Onboarding from "@screens/auth/Onboarding";
import CreatePin from "@screens/auth/CreatePin";
import PaymentSuccess from "@screens/wallet/PaymentSuccess";
import AddMoney from "@screens/wallet/AddMoney";
import AppState from "context/AppState";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppState>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="CreatePin" component={CreatePin} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SendMoney" component={SendMoney} />
            <Stack.Screen name="AddMoney" component={AddMoney} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AppState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
