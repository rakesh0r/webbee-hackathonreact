import { FontAwesome } from '@expo/vector-icons';
import { Button, HStack, Heading } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import content from '../constants/content';
import { addItem } from '../redux/slices/inventory';

const InventoryHeader = ({ category }) => {
  const { addNewItem } = content.dashboard;
  const dispatch = useDispatch();

  const addNewInventoryItem = () => {
    dispatch(addItem({id: uuid(), categoryId: category.id, values: {}}))
  };

  return (
    <HStack padding="20px" alignItems="center" space={4} justifyContent="space-between">
      <Heading>{category.name}</Heading>
      <Button
        size={'xs'}
        leftIcon={<FontAwesome name="plus" size={15} />}
        onPress={() => addNewInventoryItem()}
      >
        {addNewItem}
      </Button>
    </HStack>
  );
};

export default InventoryHeader;
