import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import { UserContext } from '../../context/user.context.jsx';

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);

  const formattedItems = useMemo(() => {
    const filterItems = (el) => el.userId === userId;
    const sortItems = (a, b) => (b.date > a.date ? 1 : -1);
    return items.filter(filterItems).sort(sortItems);
  }, [items, userId]);

  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  return (
    <>
      {formattedItems.map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem title={el.title} post={el.post} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
