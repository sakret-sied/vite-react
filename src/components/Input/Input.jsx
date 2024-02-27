import classNames from 'classnames';
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <input
      {...props}
      className={classNames(styles['input'], className, {
        [styles['invalid']]: !isValid
      })}
      ref={ref}
    />
  );
});

export default Input;
