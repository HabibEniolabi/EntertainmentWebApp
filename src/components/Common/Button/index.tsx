import type { ButtonProps, ElementProps } from '@mantine/core';
import { Button } from '@mantine/core';
import type { FC } from 'react';

import styles from './styles.module.scss';
import Link from 'next/link';

interface BeyondButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
      href?: string;
  labelColor?: string;
  title: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

const BeyondButton: FC<BeyondButtonProps> = ({
  href,
  labelColor,
  title,
  type = "button",
  ...props
}) => {
  const buttonElement = (
    <Button
      {...props}
      type={type}
      classNames={{
        root: styles.root,
        label: `${styles.label} ${labelColor || ""}`,
      }}
    >
      {title?.trim()}
    </Button>
  );

  return href ? <Link href={href} className={styles.link}>{buttonElement}</Link> : buttonElement;
};

export default BeyondButton;
