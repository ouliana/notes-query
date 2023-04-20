import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

export async function getNotes() {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createNote(note) {
  try {
    const res = await axios.post(baseUrl, note);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateNote(note) {
  try {
    const res = await axios.put(`${baseUrl}/${note.id}`, note);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
