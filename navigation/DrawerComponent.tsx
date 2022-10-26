import * as React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../types/RootStackList";
import { useSelector } from 'react-redux';
import { State } from '../redux/store';
import { Category } from '../types/Category';
import uuid from 'react-uuid';

type ScreenName = keyof RootStackParamList;

const DrawerContent = (props) => {
    const categories = useSelector((state: State) => state.categories);

    const navigation = useNavigation();

    const navigate = (screen: ScreenName, params = {}) => {
      navigation.navigate(screen as ScreenName, params);
    };

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem label="Dashboard" onPress={() => navigate('Dashboard')} />
        {Object.values(categories).map(({ name, id }: Category) => (
          <>
            {name ? (
              <DrawerItem
                key={uuid()}
                label={name}
                onPress={() => navigate('Dashboard', { name, id })}
              />
            ) : null}
          </>
        ))}
        <DrawerItem label="Manage Categories" onPress={() => navigate('ManageCategories')} />
      </DrawerContentScrollView>
    );
}

export default DrawerContent;