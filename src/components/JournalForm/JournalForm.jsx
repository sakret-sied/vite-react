import './JournalForm.css';
import Button from '../Button/Button.jsx';

function JournalForm() {
  const addJournalItem = (e) => {
    e.preventDefault();
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title"/>
      <input type="date" name="date"/>
      <input type="text" name="tag"/>
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <Button text="Сохранить"/>
    </form>
  );
}

export default JournalForm;
