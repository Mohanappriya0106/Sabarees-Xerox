import express from 'express';
import dotenv from 'dotenv';
import { sendContactMessage } from './mailer.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Middleware to parse JSON from requests
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const sent = await sendContactMessage({ name, email, message });

  if (sent) {
    res.status(200).json({ success: 'Message sent successfully!' });
  } else {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import express from 'express';
// import cors from 'cors';

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
// });

// app.post('/contact', (req, res) => {
//   // Your existing contact handler
//   res.json({ success: 'Message received' });
// });

// app.listen(5000, () => console.log('Server running on port 5000'));


