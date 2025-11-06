import type { FC, JSX } from 'react';
import type { PasswordInputProps } from '@mantine/core';
import { PasswordInput } from '@mantine/core';
import styles from './styles.module.scss';

const Password: FC<PasswordInputProps> = (props): JSX.Element => (
  <PasswordInput
    {...props}
    size="lg"
    withAsterisk
    classNames={{ 
        // label: styles.label, 
        required: styles.required, 
        input: styles.input, 
        error: styles.error, 
        innerInput: styles.innerInput, 
        visibilityToggle: styles.visibilityToggle 
    }}
  />
);

export default Password;
