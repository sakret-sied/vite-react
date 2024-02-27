import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context.jsx';

function JournalList({ items }) {
  const { userId } = useContext(UserContext);

  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  const filterItems = (el) => el.userId === userId;
  const sortItems = (a, b) => (b.date > a.date ? 1 : -1);

  return (
    <>
      {items
        .filter(filterItems)
        .sort(sortItems)
        .map((el) => (
          <CardButton key={el.id}>
            <JournalItem title={el.title} post={el.post} date={el.date} />
          </CardButton>
        ))}
    </>
  );
}

export default JournalList;
