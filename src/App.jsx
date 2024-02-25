import './App.css';
import Header from './components/Header/Header.jsx';
import JournalAddItem from './components/JournalAddItem/JournalAddItem.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import { mapItems } from './helpers/map.helper.js';
import { useLocalStorage } from './hooks/useLocalStorage.hook.js';
import Body from './layouts/Body/Body.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';

function App() {
  const [items, setItems] = useLocalStorage('data');

  const addItem = (item) => {
    setItems([
      ...mapItems(items),
      {
        id: Math.max(...items.map((i) => i.id), 0) + 1,
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
        <JournalList items={mapItems(items)} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
