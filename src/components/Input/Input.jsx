import classNames from 'classnames';
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <input
      className={classNames(className, styles['input'], {
        [styles['invalid']]: !isValid
      })}
      {...props}
      ref={ref}
    />
  );
});

export default Input;
