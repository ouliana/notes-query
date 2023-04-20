import axios from 'axios';

export async function getNotes() {
  try {
    const res = await axios.get('http://localhost:3001/notes');
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
