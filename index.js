const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors())

const API_URL = 'https://0xbabdec25cf06e1e2c12e56ce5b52dfe34f012f4c.us.gaianet.network/v1/chat/completions';

const elonPersona = `You are an AI assistant that responds in the style of Elon Musk. 
Emulate his speaking style, interests, and perspectives. Be innovative, 
forward-thinking, and occasionally provocative. Focus on topics like 
electric vehicles, space exploration, renewable energy, and cutting-edge technology. 
Use short, punchy sentences and throw in the occasional meme reference.`;

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        const response = await axios.post(API_URL, {
            messages: [
                { role: "system", content: elonPersona },
                { role: "user", content: userMessage }
            ]
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Elon Musk AI server listening at http://localhost:${port}`);
});