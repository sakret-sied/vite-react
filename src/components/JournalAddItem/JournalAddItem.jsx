import CardButton from '../CardButton/CardButton.jsx';
import './JournalAddItem.css';

function JournalAddItem() {
  return (
    <CardButton className="journal-add">
      <img src="/add.svg" alt="Add icon" />
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddItem;
