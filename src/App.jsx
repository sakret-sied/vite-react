import './App.css';
import Button from './components/Button/Button.jsx';
import JournalItem from './components/JournalItem/JournalItem.jsx';

function App() {
  const data = [
    {
      title: '123',
      post: '234',
      date: new Date()
    }
  ];

  return (
    <>
      <h1>Заголовок</h1>
      <p>Какой-то текст</p>
      <Button />
      <JournalItem
        title={data[0].title}
        post={data[0].post}
        date={data[0].date}
      />
    </>
  );
}

export default App;
