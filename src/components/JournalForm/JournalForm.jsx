import classNames from 'classnames';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { UserContext } from '../../context/user.context.jsx';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import { INITIAL_STATE, formReducer } from './JournalForm.state.js';
import inputStyles from '../Input/Input.module.css';
import styles from './JournalForm.module.css';

function JournalForm({ data, setData, onSubmit, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

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
    if (!data) {
      dispatchForm({ type: 'CLEAR', payload: { userId } });
    }
    dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
  }, [data, userId]);

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
    if (!isFormReadyToSubmit) {
      return;
    }
    onSubmit(values);
    setData(null);
    dispatchForm({ type: 'CLEAR', payload: { userId } });
  }, [isFormReadyToSubmit, onSubmit, setData, userId, values]);

  useEffect(() => {
    setData(null);
    dispatchForm({ type: 'CLEAR', payload: { userId } });
  }, [setData, userId]);

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

  const deleteJournalItem = (id) => {
    onDelete(id);
    setData(null);
    dispatchForm({ type: 'CLEAR', payload: { userId } });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={styles['form-row']}>
        <Input
          isValid={isValid.title}
          className={inputStyles['input-title']}
          id="title"
          name="title"
          type="text"
          ref={titleRef}
          value={values.title}
          onChange={onChange}
        />
        {data?.id && (
          <button
            className={styles['delete']}
            type="button"
            onClick={() => deleteJournalItem(data.id)}
          >
            <img src="/archive.svg" alt="Archive icon" />
          </button>
        )}
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
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
          }
          onChange={onChange}
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
          value={values.tag}
          onChange={onChange}
        />
      </div>

      <textarea
        className={classNames(styles['input'], {
          [styles['invalid']]: !isValid.post
        })}
        id="post"
        name="post"
        cols="30"
        rows="10"
        ref={postRef}
        value={values.post}
        onChange={onChange}
      ></textarea>
      <Button>Сохранить</Button>
    </form>
  );
}

export default JournalForm;
