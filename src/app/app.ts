import express,{Application, Request, Response,} from 'express';
import { Schema,model } from 'mongoose';  
const app:Application = express()
app.use(express.json());
const noteSchema = new Schema({
  title: String, 
  content: String,
 });

const Note = model('Note', noteSchema);


app.post('/create-note', async (req: Request, res: Response) => {
  try {
    const myNote = new Note({
      title: 'My First Note',
      content: 'This is the content of my first note.',
    });

    await myNote.save(); 

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      note: myNote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create note', error });
  }
});

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;