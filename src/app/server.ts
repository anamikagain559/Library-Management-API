import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;
const port = 5000;

async function main() {
  try {

    await mongoose.connect('mongodb+srv://anamikagain8:1xvOREUhSh2qWGyq@cluster0.o6amai6.mongodb.net/MyNoteDB?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');
      server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

main();

