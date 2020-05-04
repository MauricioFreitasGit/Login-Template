import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';
import { useField } from '@unform/core'
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}
interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFild, setIsFild] = useState(false);

  const hadleInputFocus = useCallback(() => {
    setIsFocused(true);
  },[])

  const hadleInputBlur= useCallback(() => {
    setIsFocused(false);
    setIsFild(!!inputValueRef.current.value);

  },[])
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();

      }
    })

  }, [fieldName, registerField])
  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon name={icon} size={20} color={isFocused || isFild?'#2893c1':'#666360'} />
      <TextInput
      onFocus={hadleInputFocus}
      onBlur={hadleInputBlur}
        ref={inputElementRef}
        placeholderTextColor='#666360'
        keyboardAppearance='dark'
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
