import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getNotes, createNote, updateNote } from './requests';

function App() {
  const result = useQuery('notes', getNotes, {
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(createNote, {
    onSuccess: function (newNote) {
      const notes = queryClient.getQueryData('notes');
      queryClient.setQueryData('notes', notes.concat(newNote));
    },
  });

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: function () {
      return queryClient.invalidateQueries('notes');
    },
  });

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
    newNoteMutation.mutate({ content, important: true });
  }

  function toggleImportance(note) {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  }
}

export default App;
