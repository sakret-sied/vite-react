import { useEffect, useState } from 'react';
import Button from '../Button/Button.jsx';
import styles from './JournalForm.module.css';
import classNames from 'classnames';

const INITIAL_STATE = {
  title: true,
  text: true,
  date: true
};

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState(INITIAL_STATE);

  useEffect(() => {
    let timerId;
    if (!formValidState.date || !formValidState.text || !formValidState.title) {
      timerId = setTimeout(() => {
        setFormValidState(INITIAL_STATE);
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [formValidState]);

  const addJournalItem = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;

    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValidState((state) => ({ ...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }

    onSubmit(formProps);
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={classNames(styles['input-title'], {
            [styles['invalid']]: !formValidState.title
          })}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Calendar icon" />
          <span>Date</span>
        </label>
        <input
          id="date"
          type="date"
          name="date"
          className={classNames(styles['input'], {
            [styles['invalid']]: !formValidState.date
          })}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Folder icon" />
          <span>Tags</span>
        </label>
        <input id="tag" type="text" name="tag" className={styles['input']} />
      </div>

      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        className={classNames(styles['input'], {
          [styles['invalid']]: !formValidState.text
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
