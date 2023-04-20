import { useQuery } from 'react-query';
import { getNotes } from './requests';

function App() {
  const result = useQuery('notes', getNotes);

  if (result.isLoading) {
    return <div>loading data</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {notes.map(note => (
        <li
          key={note.id}
          onClick={() => toggleImportance(note)}
        >
          {note.content}
          <strong>{note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </div>
  );

  async function addNote(event) {
    event.preventDefault();
    var content = event.target.note.value;
    event.target.note.value = '';
    console.log(content);
  }

  function toggleImportance(note) {
    console.log('toggle importance of ', note.id);
  }
}

export default App;
