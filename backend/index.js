import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ingatlan'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes
app.get('/api/ingatlan', (req, res) => {
    const query = `
SELECT ingatlanok.id AS ing_id, ingatlanok.*, kategoriak.* 
FROM ingatlanok
INNER JOIN kategoriak 
ON ingatlanok.kategoria = kategoriak.id
`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        let ingatlan = [];   

        results.forEach(element => {
            ingatlan.push({
                ingatlanok: { id: element.ing_id },
                kategoriak: {
                    id: element.id,
                    nev: element.nev
                },
                leiras: element.leiras,
                hirdetesDatuma: element.hirdetesDatuma.toISOString().split('T')[0],
                tehermentes: element.tehermentes,
                ar: element.ar,
                kepUrl: element.kepUrl
            });
        });
        res.json(ingatlan)
        
    });
})

app.post('/api/ingatlan', (req, res) => {
    const { kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl } = req.body;
    const query = 'INSERT INTO ingatlanok (kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [kategoria, leiras, hirdetesDatuma, tehermentes, ar, kepUrl], (err, results) => {
        if (err) {
            console.error('Hiba a beillesztésnél:', err);
            res.status(500).json({error: 'Szerver hiba'});
            return;
        }
        res.status(201).json({ message: 'Ingatlan sikeresen hozzáadva', id: results.insertId });
    })
})

app.delete('/api/ingatlan/:id', (req, res) => {
    const {id} = req.params;
    const query = 'DELETE FROM ingatlanok WHERE id=?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Hiba a törlésnél:', err);
            res.status(500).json({error: 'Szerver hiba'});
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({error: 'Ingatlan nem található'});
            return;
        }
        res.json({message: 'Ingatlan sikeresen törölve'});
    })
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});