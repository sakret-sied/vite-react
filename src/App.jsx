import './App.css';
import JournalItem from './components/JournalItem/JournalItem.jsx';
import CardButton from './components/CardButton/CardButton.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddItem from './components/JournalAddItem/JournalAddItem.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';

function App() {
  const data = [
    {
      title: 'Title',
      post: 'Post',
      date: new Date()
    }
  ];

  return (
    <div className="app">
      <LeftPanel>
        <Header/>
        <JournalAddItem/>
        <JournalList>
          <CardButton>
            <JournalItem
              title={data[0].title}
              post={data[0].post}
              date={data[0].date}
            />
          </CardButton>
          <CardButton>
            <JournalItem
              title={data[0].title}
              post={data[0].post}
              date={data[0].date}
            />
          </CardButton>
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm/>
      </Body>
    </div>
  );
}

export default App;
