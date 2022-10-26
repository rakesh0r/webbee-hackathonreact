import * as React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View } from 'react-native';
import { RootStackParamList } from '../types/RootStackList';
import { Button, Center, HStack, Text, useBreakpointValue } from 'native-base';
import { useSelector } from 'react-redux';
import { State } from '../redux/store';
import { Category } from '../types/Category';
import InventoryHeader from '../components/InventoryHeader';
import { groupBy } from '../utils/groupBy';
import content from '../constants/content';
import AddInventory from '../components/AddInventory';
import { InventoryItem } from '../types/Inventory';
import uuid from 'react-uuid';

type DashboardScreenProps = DrawerScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.ComponentType<DashboardScreenProps> = ({
  route,
  navigation,
}: DashboardScreenProps) => {
  const { name: categoryName, id: categoryId } = route.params || {};
  const { noCategory, noItems } = content.dashboard;
    const flexDir = useBreakpointValue({
    base: 'column',
    lg: 'row',
    });
  React.useEffect(() => {
    navigation.setOptions({ headerTitle: categoryName || 'Dashboard' });
  }, [categoryName]);

  const { categories = {}, inventoryItems } = useSelector((state: State) => state);
  const groupedInventories = groupBy(inventoryItems, 'categoryId');

  const categoryValues = Object.values(categories);

  const itemsRender = (category) => (
    <>
      <InventoryHeader key={uuid()} category={category} />
      {!groupedInventories.get(category.id) && (
        <Center>
          <Text fontSize="xs">{noItems}</Text>
        </Center>
      )}
      <View
        style={{
          flexDirection: flexDir,
        }}
      >
        {groupedInventories.get(category.id) &&
          groupedInventories
            .get(category.id)
            .map((item: InventoryItem) => (
              <AddInventory key={category.id + item.id} category={category} inventoryItem={item} />
            ))}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {categoryValues.map((category: Category) => (
          <>
            {!categoryId && itemsRender(category)}
            {categoryId === category.id && itemsRender(category)}
          </>
        ))}
        {!categoryValues.length && (
          <Center p={4}>
            <Text fontSize="xs">{noCategory}</Text>
          </Center>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
  },
});

export default DashboardScreen;
