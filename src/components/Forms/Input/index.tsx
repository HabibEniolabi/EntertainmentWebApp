import type { FC, JSX } from 'react';
import type { TextInputProps } from '@mantine/core';
import { TextInput } from '@mantine/core';
import styles from './styles.module.scss';

const Input: FC<TextInputProps> = (props): JSX.Element => (
  <TextInput
    {...props}
    size="lg"
    classNames={{
      required: styles.required,
      input: styles.input,
      error: styles.error,
    }}
  />
);

export default Input;
