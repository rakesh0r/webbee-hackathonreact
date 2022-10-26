import * as React from 'react';
import { Button, Box, CheckIcon, Heading, HStack, Select, Stack, Input, Menu } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import InputComponent from './Input';
import attributeTypes from '../constants/attributeType';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory, updateCategory } from '../redux/slices/categories';
import { State } from '../redux/store';
import { Category, CategoryField } from '../types/Category';
import uuid from 'react-uuid';
import content from '../constants/content';

const AddCategory = ({ id }) => {
  const dispatch = useDispatch();
  const categoryData: Category = useSelector((state: State) => state.categories[id]);

  const { addNewField: addNewFieldLabel, remove, titleField } = content.manageCategories;

  const deleteCategory = () => {
    dispatch(removeCategory({ id }));
  };

  const updateCategoryData = (payload) => {
    dispatch(updateCategory(payload));
  };
  const addNewField = () => {
    const payload = { ...categoryData, titleField: categoryData.fields[0], fields: [...categoryData.fields, { id: uuid() }] };
    updateCategoryData(payload);
  };

  const updateName = (value: string) => {
    const payload = { ...categoryData, name: value };
    updateCategoryData(payload);
  };

  const removeField = (index: number) => {
    const newFields = categoryData.fields.reduce((acc, curr, i) => {
      if (i !== index) acc.push(curr);
      return acc;
    }, []);

    const titleField = newFields.find(({ id }) => categoryData?.titleField?.id === id);
    updateCategoryData({ ...categoryData, titleField, fields: newFields });
  };

  const onFieldChange = (value: string, name: string, index: number) => {
    const newFields = categoryData.fields.map((field: CategoryField, i: number) => {
      if (index === i) {
        return { ...field, [name]: value };
      }
      return field;
    });

    updateCategoryData({ ...categoryData, fields: newFields });
  };

  const setTitleField = (field) => {
    updateCategoryData({ ...categoryData, titleField: field });
  };

  const getTitleFieldName = () => {
    if(!categoryData.titleField) {
        return "";
    }
    return categoryData.fields.find(({id}) => id === categoryData.titleField.id).name;
  }

  return (
    <Box width="100%" p="1" alignItems="center">
      <Box width="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
        <Stack p="2" space={1}>
          <Stack space={2}>
            {categoryData?.name && (
              <Heading size="md" ml="-1">
                {categoryData.name}
              </Heading>
            )}
            <Input
              size="sm"
              defaultValue={categoryData?.name}
              placeholder="Category Name"
              onChangeText={(value) => updateName(value)}
            />
          </Stack>
          {categoryData.fields?.map((field, index) => (
            <HStack key={uuid()} alignItems={'center'} space={2} justifyContent={'space-between'}>
              <Box width="55%">
                <Input
                  defaultValue={field?.name}
                  placeholder={field?.name || 'Field'}
                  onBlur={(e) => onFieldChange(e.nativeEvent.text, 'name', index)}
                />
              </Box>
              <Box width="35%">
                <Stack width={'100%'}>
                  <Select
                    defaultValue={field.type}
                    accessibilityLabel="Choose Type"
                    placeholder="Choose Type"
                    _selectedItem={{
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => onFieldChange(itemValue, 'type', index)}
                  >
                    {attributeTypes.map(({ label, value }) => (
                      <Select.Item key={uuid()} label={label} value={value} />
                    ))}
                  </Select>
                </Stack>
              </Box>
              <Box width="10%">
                <FontAwesome name="trash" size={25} onPress={() => removeField(index)} />
              </Box>
            </HStack>
          ))}
          <Menu
            shadow={2}
            trigger={(triggerProps) => {
              return (
                <Button {...triggerProps}>
                  {`${titleField} : ${getTitleFieldName() || 'None'}`}
                </Button>
              );
            }}
          >
            {categoryData.fields?.map((field) => (
              <Menu.Item key={`menu-${field.name}`} onPress={() => setTitleField(field)}>
                {field.name}
              </Menu.Item>
            ))}
          </Menu>
          <HStack alignItems="center" space={4}>
            <Button size={'md'} onPress={() => addNewField()}>
              {addNewFieldLabel}
            </Button>
            <Button
              size={'md'}
              leftIcon={<FontAwesome name="trash" size={20} />}
              onPress={() => deleteCategory()}
            >
              {remove}
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddCategory;
