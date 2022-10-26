import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardScreen, ManageCategoriesScreen } from "../screens";
import { RootStackParamList } from "../types/RootStackList";
import DrawerContent from "./DrawerComponent";

const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerNavigator: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} 
      initialRouteName="Dashboard">
        <Drawer.Screen  name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen options={{ title: 'Manage Categories' }} name="ManageCategories" component={ManageCategoriesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
