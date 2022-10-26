import { FontAwesome } from '@expo/vector-icons';
import { Box, Button, HStack, Stack, Text } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import content from '../constants/content';
import { removeItem, updateItem } from '../redux/slices/inventory';
import { Category } from '../types/Category';
import { InventoryItem } from '../types/Inventory';
import InputComponent from './Input';

interface AddInventoryProps {
    category: Category;
    inventoryItem: InventoryItem;
}

const AddInventory = ({ category, inventoryItem }: AddInventoryProps) => {
  const { remove } = content.dashboard;
  const dispatch = useDispatch();

  const onFieldChange = (value: string, name: string, index: number) => {
      const payload = { ...inventoryItem, values: { ...inventoryItem.values, [name]: value } };
      dispatch(updateItem(payload));
  };

  const deleteInventoryItem = () => {
    dispatch(removeItem(inventoryItem));
  };

  return (
    <Box p="2" alignItems="center">
      <Box rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
        <Stack p="2" space={1}>
          {category.titleField && <Text>{inventoryItem.values[category.titleField.id] || ""}</Text>}
          {category.fields?.map((field, index) => (
            <HStack
              key={uuid()}
              alignItems={'center'}
              space={2}
              justifyContent={'space-between'}
            >
              <Box w="full">
                <InputComponent
                  value={inventoryItem?.values[field.id]}
                  type={field.type || 'text'}
                  field={field}
                  onValueChange={(value) => onFieldChange(value, field.id, index)}
                />
              </Box>
            </HStack>
          ))}
          <HStack alignItems="center" space={4}>
            <Button
              size={'xs'}
              leftIcon={<FontAwesome name="trash" size={15} />}
              onPress={() => deleteInventoryItem()}
            >
              {remove}
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddInventory;
