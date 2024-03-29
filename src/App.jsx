import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import { UserContextProvider } from './context/user.context.jsx';
import { mapData } from './helpers/data.helper.js';
import { useLocalStorage } from './hooks/useLocalStorage.hook.js';
import Body from './layouts/Body/Body.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';

function App() {
  const [items, setItems] = useLocalStorage('data', mapData);
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapData(items),
        {
          ...item,
          date: new Date(item.date),
          id: Math.max(...items.map((i) => i.id), 0) + 1
        }
      ]);
      return;
    }

    setItems([
      ...mapData(items).map((i) => {
        if (i.id === item.id) {
          return {
            ...item
          };
        }
        return i;
      })
    ]);
  };

  const deleteItem = (id) => {
    setItems([...items.filter((i) => i.id !== id)]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={() => setSelectedItem(null)} />
          <JournalList items={mapData(items)} setItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm
            data={selectedItem}
            setData={setSelectedItem}
            onSubmit={addItem}
            onDelete={deleteItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
