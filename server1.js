import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

const apiKey = process.env.MOVIE_APP_API_KEY;

// Movies route (default movie listing)
app.get('/movies', async (req, res) => {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&api_key=${apiKey}&page=1`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching data from TMDB");
    }
});

// Search route (for searching movies by query)
app.get('/search', async (req, res) => {
    const query = req.query.query; // Extract the search query from the request
    if (!query) {
        return res.status(400).send("Search query is missing");
    }

    const searchUrl = `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error searching for movies on TMDB");
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
