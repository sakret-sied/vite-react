import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddItem from './components/JournalAddItem/JournalAddItem.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useState } from 'react';

const INITIAL_DATA = [];

function App() {
  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        id: Math.max(...oldItems.map((i) => i.id), 0) + 1,
        title: item.title,
        text: item.text,
        date: new Date(item.date)
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
