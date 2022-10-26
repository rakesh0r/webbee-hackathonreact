import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, Box, AspectRatio, Center, Heading, HStack, Stack, Text, Image, Input } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RootStackParamList } from '../types/RootStackList';
import content from '../constants/content';
import InputComponent from '../components/Input';
import AddCategory from '../components/AddCategory';
import { useDispatch, useSelector } from 'react-redux';
import { persistor, State } from '../redux/store';
import { addCategory } from '../redux/slices/categories';
import uuid from 'react-uuid';
import { Category } from '../types/Category';

type ManageCategoriesScreenProps = DrawerScreenProps<RootStackParamList, 'ManageCategories'>;

const ManageCategoriesScreen: React.ComponentType<ManageCategoriesScreenProps> = ({
  navigation,
}) => {
  const categories = useSelector((state: State) => state.categories);
  const dispatch = useDispatch();

  const { addButton } = content.manageCategories;

  const purgeStore = () => {
    persistor.purge().then();
  }

  const addNewCategory = () => {
    // purgeStore();
    const id = uuid();
    const category = { id, name: '', fields: [{ id: uuid() }] } ;
    dispatch(addCategory({ [id]:  { ...category, titleField: category.fields[0] }}));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {Object.values(categories).map(({ id }: Category) => (
          <AddCategory key={id} id={id} />
        ))}
      </ScrollView>
      <View style={styles.addButton}>
        <Button size="sm" onPress={() => addNewCategory()}>
          {addButton}
        </Button>
      </View>
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
  addButton: {
    height: 40,
    paddingHorizontal: 10,
  },
});

export default ManageCategoriesScreen;
