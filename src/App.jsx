import { useEffect, useState } from 'react';
import Header from './components/Header/Header.jsx';
import JournalAddItem from './components/JournalAddItem/JournalAddItem.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import Body from './layouts/Body/Body.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setItems(
        data.map((item) => ({
          ...item,
          date: new Date(item.date)
        }))
      );
    }
  }, []);

  useEffect(() => {
    items.length && localStorage.setItem('data', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        id: Math.max(...oldItems.map((i) => i.id), 0) + 1,
        title: item.title,
        date: new Date(item.date),
        post: item.post,
        tag: item.tag
      }
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddItem />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
