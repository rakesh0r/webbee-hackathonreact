import { FormControl, HStack, Input, Pressable, Stack, Switch, Text } from 'native-base';
import React, { useRef, useState } from "react";
import { DatePickerModal } from 'react-native-paper-dates';

const InputComponent = ({ field, value, type, onValueChange }) => {
    const inputRef = useRef(null);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    
    if (type === 'text' || type === 'number') {
      return (
        <FormControl>
          <Stack width={'100%'}>
            <Text>{field?.name}</Text>
            <Input
              defaultValue={value}
              placeholder={field?.name || 'Field'}
              //   onChangeText={(text) => {
              //     onValueChange(text);
              //     inputRef.current.focus();
              //   }}
              onBlur={(e) => onValueChange(e.nativeEvent.text)}
              ref={inputRef}
              keyboardType={field?.type === 'number' ? 'numeric' : 'default'}
            />
          </Stack>
        </FormControl>
      );
    } else if (type === 'checkbox') {
      return (
        <FormControl>
          <HStack alignItems="center" space={4}>
            <Text>{field?.name}</Text>
            <Switch size="sm" onValueChange={(v) => onValueChange(v)} value={value}/>
          </HStack>
        </FormControl>
      );
    } else if (type === 'date') {
      return (
        <FormControl>
          <Stack width={'100%'}>
            <Text>
              {field?.name}
            </Text>
            <Pressable onPress={() => setDatePickerOpen(true)}>
              <Input
                onFocus={() => setDatePickerOpen(true)}
                value={value ? new Date(value).toDateString(): ''}
                placeholder={field?.name || 'Field'}
              />
            </Pressable>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={datePickerOpen}
              onDismiss={() => setDatePickerOpen(false)}
              date={new Date(value)}
              onConfirm={({ date }) => {
                onValueChange(date);
                setDatePickerOpen(false);
              }}
            />
          </Stack>
        </FormControl>
      );
    }
    return null;
};

export default InputComponent;