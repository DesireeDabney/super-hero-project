// Main Express server(backend)
//set up express server
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;
const DATA_FILE = path

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Helper function to read heroes
async function readHeroes(){
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; //Return empty array if file doesn't exist
    }
}

// Helper function to write heroes
async function writeHeroes(heroes) {
    await fs.writeFile(DATA_FILE, JSON.stringify(heroes, null, 2));
}

// Initialize empty heroes file
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await writeHeroes([]);
    }
}

initializeDataFile();

//Routes go here...

//create, add new hero
app.post('/heroes', async (req, res) => {
    try {
        const heroes = await readHeroes()

        const newHero = {
            id: Date.now().toString(),
            superName: req.body.superName,
            realName: req.body.realName,
            superPower: req.body.superPower,
            createdAt: new Date().toISOString()
        }

        heroes.push(newHero);
        await writeHeroes(heroes);

        res.status(201).json({
            success: true,
            message: 'Hero created successfully!',
            redirectTo: '/heroes'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
});

//Read method, get all heroes
app.get('/heroes', async (req, res) => {
    try {
        const heroes = await readHeroes();

        if (req.accepts('html')) {
            res.render('heroList', { heroes })
        } else {
            res.json({ success: true, count: heroes.length, data: heroes })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update edit hero
app.put('/heroes/:id', async (req, res) => {
    try {
        const heroes = await readHeroes();
        const heroIndex = heroes.findIndex(h => h.id === req.params.id);

        if (heroIndex === -1) {
            return res.status(404).json({ success: false, error: 'Hero not found' });
        }

        heroes[heroIndex] = {
            ...heroes[heroIndex],
            superName: req.body.superName,
            realName: req.body.realName,
            superPower: req.body.superPower,
            updatedAt: new Date().toISOString()
        };

        await writeHeroes(heroes);
        res.json({ success: true, data: heroes[hereIndex] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE removing a hero
app.delete('/heroes/:id', async (req, res) => {
    try {
        const heroes = await readHeroes();
        const filteredHeroes = heroes.filter(h => h.id !== req.params.id);

        if (heroes.lenght === filteredHeroes.length) {
            return res.status(404).json({ success: false, error: 'Hero not found' });
        }

        await writeHeroes(filteredHeroes);
        res.json({ success: true, message: 'Hero deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// form route

app.get('/', (req, res) => {
    const heroFields = require('./confic/heroInputs.config.js');
    res.render('heroForm', heroFields);
});

//Server listen/run
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

