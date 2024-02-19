import './JournalAddItem.css';
import CardButton from '../CardButton/CardButton.jsx';

function JournalAddItem() {
  return (
    <CardButton className="journal-add">
      <img src="/add.svg" alt="Add icon" />
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddItem;
