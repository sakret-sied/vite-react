import classNames from 'classnames';
import { useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button.jsx';
import { INITIAL_STATE, formReducer } from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import styles from './JournalForm.module.css';
import inputStyles from '../Input/Input.module.css';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, onSubmit, values]);

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value }
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <Input
          isValid={isValid.title}
          className={inputStyles['input-title']}
          id="title"
          name="title"
          type="text"
          ref={titleRef}
          onChange={onChange}
          value={values.title}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Calendar icon" />
          <span>Date</span>
        </label>
        <Input
          isValid={isValid.date}
          id="date"
          name="date"
          type="date"
          ref={dateRef}
          onChange={onChange}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
          }
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Folder icon" />
          <span>Tags</span>
        </label>
        <Input
          id="tag"
          name="tag"
          type="text"
          onChange={onChange}
          value={values.tag}
        />
      </div>

      <textarea
        className={classNames(styles['input'], {
          [styles['invalid']]: !isValid.post
        })}
        id="post"
        name="post"
        ref={postRef}
        onChange={onChange}
        value={values.post}
        cols="30"
        rows="10"
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
