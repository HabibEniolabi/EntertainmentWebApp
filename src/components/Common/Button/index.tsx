import type { ButtonProps, ElementProps } from '@mantine/core';
import { Button } from '@mantine/core';
import type { FC } from 'react';

import styles from './styles.module.scss';

interface BeyondButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  labelColor?: string;
  title: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

const BeyondButton: FC<BeyondButtonProps> = ({
  labelColor,
  title,
  type,
  ...props
}) => (
  <Button
    {...props}
    type={type}
    classNames={{
      root: styles.root,
      label: `${styles.label} ${labelColor}`,
    }}
  >
    {title}
  </Button>
);

export default BeyondButton;
