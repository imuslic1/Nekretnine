const express = require('express');
const session = require("express-session");
const path = require('path');
const fs = require('fs').promises; // Using asynchronus API for file read and write
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const db = require('./db/db.js');

app.use(session({
  secret: 'tajna sifra',
  resave: true,
  saveUninitialized: true,
}));

app.use(express.static(__dirname + '/public'));

// Enable JSON parsing without body-parser
app.use(express.json());
app.use(bodyParser.json());

/* ---------------- SERVING HTML -------------------- */

// Async function for serving html files
async function serveHTMLFile(req, res, fileName) {
  const htmlPath = path.join(__dirname, 'public/html', fileName);
  try {
    const content = await fs.readFile(htmlPath, 'utf-8');
    res.send(content);
  } catch (error) {
    console.error('Error serving HTML file:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
}

// Array of HTML files and their routes
const routes = [
  { route: '/nekretnine.html', file: 'nekretnine.html' },
  { route: '/detalji.html', file: 'detalji.html' },
  { route: '/meni.html', file: 'meni.html' },
  { route: '/prijava.html', file: 'prijava.html' },
  { route: '/profil.html', file: 'profil.html' },
  { route: '/statistika.html', file: 'statistika.html'},
  { route: '/vijesti.html', file: 'vijesti.html'},
  { route: '/mojiUpiti.html', file: 'mojiUpiti.html'},
  // Practical for adding more .html files as the project grows
];

// Loop through the array so HTML can be served
routes.forEach(({ route, file }) => {
  app.get(route, async (req, res) => {
    await serveHTMLFile(req, res, file);
  });
});

/* ----------- SERVING OTHER ROUTES --------------- */

// Async function for reading json data from data folder 
async function readJsonFile(filename) {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  try {
    const rawdata = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(rawdata);
  } catch (error) {
    console.log("Error reading JSON file:", error);
    throw error;
  }
}

// Async function for reading json data from data folder 
async function saveJsonFile(filename, data) {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    throw error;
  }
}

/*
Checks if the user exists and if the password is correct based on korisnici.json data. 
If the data is correct, the username is saved in the session and a success message is sent.
*/

app.post('/login', async (req, res) => {
  const jsonObj = req.body;
  console.log(jsonObj);
  const now = new Date(new Date().getTime() + 60*60*1000); // +1h jer je vrijeme na serveru UTC
  const datumVrijeme = "["+ now.toISOString().split('T')[0] + "_" + now.toISOString().split('T')[1] + "]";

  if(!req.session.loginAttempts) {
    req.session.loginAttempts = 0;
  }
  if(!req.session.lockoutUntil) {
    req.session.lockoutUntil = null;
  }
  var sada = new Date()
  
  // MORA SE IZ req.session VRATITI U DATUM JER MAGIČNO NAKON MAGIJE NIJE VIŠE DATUM NEGO STRING KOJI SE DESERIJALIZIRA
  // TYPESCRIPT JE BOLJI
  // ALL MY HOMIES HATE JAVASCRIPT
  // ALL MY HOMIES HATE NON STATIC TYPING

  if(req.session.lockoutUntil && sada < new Date(req.session.lockoutUntil)) {                                                  
    const remainingTime = Math.ceil((new Date(req.session.lockoutUntil) - new Date()) / 1000); 
    
    let novaLinija = datumVrijeme + " - username: " + jsonObj.username + " - status: " + "neuspješno";

    await fs.appendFile('./data/prijave.txt', novaLinija + "\r\n", function(err){
        if(err) 
            throw err;
    });
    
    
    res.status(429).json({ greska: `Previse neuspjesnih pokusaja. Pokusajte ponovo za ${remainingTime} sekundi.` }); 
    

    return;
  }

  try {
    //const data = await fs.readFile(path.join(__dirname, 'data', 'korisnici.json'), 'utf-8');
    //const korisnici = JSON.parse(data);

    const korisnik = await db.korisnik.findOne({ where: { username: jsonObj.username } });
    let found = false;

    if (korisnik.username == jsonObj.username) {
      const isPasswordMatched = await bcrypt.compare(jsonObj.password, korisnik.password);

      if (isPasswordMatched) {
        req.session.username = korisnik.username;
        console.log(req.session.username, "je ulogovan");
        req.session.loginAttempts = 0;
        found = true;
      }
    }


    if (found) {
      res.json({ poruka: 'Uspješna prijava' });
    } 
    else {
      req.session.loginAttempts++;
      if(req.session.loginAttempts >= 3) {

        req.session.lockoutUntil = new Date(new Date().getTime() + 60000);
        req.session.loginAttempts = 0;
        res.status(429).json({ greska: "Previse neuspjesnih pokusaja. Pokusajte ponovo za 1 minutu." });
      } else {
        res.status(401).json({ poruka: 'Neuspješna prijava' });
      }
    }

    //spremanje u ../data/prijava.txt
    //[datum_vrijeme] - username: "username" - status: "uspješno" ili "neuspješno"
    let novaLinija = datumVrijeme + " - username: " + jsonObj.username + " - status: " + (found ? "uspješno" : "neuspješno");

    await fs.appendFile('./data/prijave.txt', novaLinija + "\r\n", function(err){
        if(err) 
            throw err;
    });


  } 
  catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

/*
Delete everything from the session.
*/
app.post('/logout', (req, res) => {
  // Check if the user is authenticated
  if (!req.session.username) {
    // User is not logged in
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }

  // Clear all information from the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      res.status(500).json({ greska: 'Internal Server Error' });
    } else {
      res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
    }
  });
});

/*
Returns currently logged user data. First takes the username from the session and grabs other data
from the .json file.
*/
app.get('/korisnik', async (req, res) => {
  // Check if the username is present in the session
  if (!req.session.username) {
    // User is not logged in
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }

  // User is logged in, fetch additional user data
  const username = req.session.username;

  try {
    // Read user data from the JSON file
    //const users = await readJsonFile('korisnici');

    // Find the user by username
    //const user = users.find((u) => u.username === username);

    const user = await db.korisnik.findOne({ where: { username: username } });

    if (!user) {
      // User not found (should not happen if users are correctly managed)
      return res.status(401).json({ greska: 'Neautorizovan pristup' });
    }

    // Send user data
    const userData = {
      id: user.id,
      ime: user.ime,
      prezime: user.prezime,
      username: user.username,
      password: user.password // Should exclude the password for security reasons
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

/*
Allows logged user to make a request for a property
*/
app.post('/upit', async (req, res) => {
  if (!req.session.username) { //username umjesto .user
    // User is not logged in
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
  
  const { nekretnina_id, tekst_upita } = req.body;

  try {
    const loggedInUser = await db.korisnik.findOne({ where: { username: req.session.username } });
    const nekretnina = await db.nekretnina.findOne({ where: { id: nekretnina_id } });

    if (!nekretnina) {
      return res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
    }

    let upiti = await db.upit.findAll({where: {korisnikId : loggedInUser.id, nekretninaId : nekretnina_id}});
    console.log(upiti.length);
    
    if(upiti.length >= 3) {
      res.status(429).json({ greska: 'Previse upita za istu nekretninu' });
      return;
    }
    
    await db.upit.create({
      korisnikId: loggedInUser.id,
      nekretninaId: nekretnina.id,
      tekst: tekst_upita
    });

    res.status(200).json({ poruka: 'Upit je uspješno dodan' });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

/*
Updates any user field
*/
app.put('/korisnik', async (req, res) => {
  if (!req.session.username) {
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }

  const { ime, prezime, username, password } = req.body;

  try {
    const loggedInUser = await db.korisnik.findOne({ where: { username: req.session.username } });

    if (!loggedInUser) {
      return res.status(401).json({ greska: 'Neautorizovan pristup' });
    }

    if (ime) loggedInUser.ime = ime;
    if (prezime) loggedInUser.prezime = prezime;
    if (username) loggedInUser.username = username;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      loggedInUser.password = hashedPassword;
    }

    loggedInUser.save();
    res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
  } 
  catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

/*
Returns all properties from the file.
*/
app.get('/nekretnine', async (req, res) => {
  try {
    const nekretnineData = await db.nekretnina.findAll();
    res.json(nekretnineData);
  } catch (error) {
    console.error('Error fetching properties data:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

/**
 * Returns top 5 properties based on the date of publication
 * in the location provided in the query
 */
app.get('/nekretnine/top5', async (req, res) => {
  try {
    const top5 = await db.nekretnina.findAll(
        { 
          where: { lokacija: req.query.lokacija },
          order: [['datum_objave', 'DESC']],
          limit: 5
        }
      );
    res.status(200).json(top5);
  } catch (error) {
    console.error('Error fetching properties data:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

/**
 * Returns all queries for the user that is currently logged in
 */
app.get('/upiti/moji', async (req, res) => {
  if (!req.session.username) {
    // User is not logged in
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }

  try {
    const loggedInUser = await db.korisnik.findOne({ where: { username: req.session.username } });
    const listaUpita = await db.upit.findAll({ where: { korisnikId: loggedInUser.id } });
    
    if(listaUpita.length == 0) {
      res.status(404).json(listaUpita);
      return;
    }

    res.status(200).json(listaUpita);
  } catch (error) {
    console.error('Error fetching queries:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

/**
 * Returns the property with the provided id
 */
app.get('/nekretnina/:id', async (req, res) => {
  try {
    const nekretninaSaID = await db.nekretnina.findOne({ where: { id: req.params.id } });
    const upiti = await db.upit.findAll(
      { 
        where: { nekretninaId: req.params.id },
        order: [['createdAt', 'DESC']],
        limit: 3
      }
    );

    if(nekretninaSaID) {
      nekretninaSaID.dataValues.upiti = upiti;
      res.status(200).json(nekretninaSaID);
    } else {
      res.status(404).json({ greska: 'Nekretnina sa tim ID-jem ne postoji' });
      return;
    }
  } 
  catch (error) {
    console.error('Error fetching properties data:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});

/**
 * Cycles three by three queries through pages, for the property with the provided id
 */
app.get('/next/upiti/nekretnina/:id', async (req, res) => {
  try {
    //const nekretnineData = await readJsonFile('nekretnine');
    //let nekretninaSaID = nekretnineData.find((nekretnina) => nekretnina.id === Number(req.params.id));

    const nekretninaSaID = await db.nekretnina.findOne({ where: { id: req.params.id } });

    if(nekretninaSaID) {
      let listaUpita = await db.upit.findAll({ where: { nekretninaId: req.params.id } });
      if(req.query.page < 0){
        res.status(404).json([]);
        return;
      }
      else if(req.query.page == 0) {
        listaUpita = await db.upit.findAll({ where: { nekretninaId: req.params.id }, order: [['createdAt', 'DESC']], limit: 3 });
        if(nekretninaSaID.upiti.length == 0) {
          res.status(404).json([]); // moze i json(listaUpita) ali je ovako citljivije
          return;
        }
        
        res.status(200).json(listaUpita);
        return;
      }
      else if(req.query.page >= 1) {
        //listaUpita = nekretninaSaID.upiti.reverse().slice(req.query.page * 3 , req.query.page * 3 + 3);
        listaUpita = await db.upit.findAll({ where: { nekretninaId: req.params.id }, order: [['createdAt', 'DESC']], limit: 3, offset: req.query.page * 3 });
        if(listaUpita.length == 0) {
          res.status(404).json(listaUpita);
          return;
        }

        res.status(200).json(listaUpita);
        return;
      }
      else {
        res.status(404).json({ greska: 'Nekretnina sa tim ID-jem ne postoji' });
        return;
      }
    }
  } 
    catch (error) {
    console.error('Error fetching properties data:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});



/* ----------------- MARKETING ROUTES ----------------- */

// Route that increments value of pretrage for one based on list of ids in nizNekretnina
app.post('/marketing/nekretnine', async (req, res) => {
  const { nizNekretnina } = req.body;

  try {
    // Load JSON data
    let preferencije = await readJsonFile('preferencije');

    // Check format
    if (!preferencije || !Array.isArray(preferencije)) {
      console.error('Neispravan format podataka u preferencije.json.');
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Init object for search
    preferencije = preferencije.map((nekretnina) => {
      nekretnina.pretrage = nekretnina.pretrage || 0;
      return nekretnina;
    });

    // Update atribute pretraga
    nizNekretnina.forEach((id) => {
      const nekretnina = preferencije.find((item) => item.id === id);
      if (nekretnina) {
        nekretnina.pretrage += 1;
      }
    });

    // Save JSON file
    await saveJsonFile('preferencije', preferencije);

    res.status(200).json({});
  } catch (error) {
    console.error('Greška prilikom čitanja ili pisanja JSON datoteke:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/marketing/nekretnina/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Read JSON 
    console.log("usao u zahtjev post na serveru");
    const preferencije = await readJsonFile('preferencije');
    
    // Finding the needed objects based on id
    const nekretninaData = preferencije.find((item) => item.id === parseInt(id, 10));

    if (nekretninaData) {
      // Update clicks
      nekretninaData.klikovi = (nekretninaData.klikovi || 0) + 1;

      // Save JSON file
      await saveJsonFile('preferencije', preferencije);

      res.status(200).json({ success: true, message: 'Broj klikova ažuriran.' });
    } else {
      res.status(404).json({ error: 'Nekretnina nije pronađena.' });
    }
  } catch (error) {
    console.error('Greška prilikom čitanja ili pisanja JSON datoteke:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/marketing/osvjezi/pretrage', async (req, res) => {
  const { nizNekretnina } = req.body || { nizNekretnina: [] };

  try {
    // Read JSON 
    const preferencije = await readJsonFile('preferencije');

    // Finding the needed objects based on id
    const promjene = nizNekretnina.map((id) => {
      const nekretninaData = preferencije.find((item) => item.id === id);
      return { id, pretrage: nekretninaData ? nekretninaData.pretrage : 0 };
    });

    res.status(200).json({ nizNekretnina: promjene });
  } catch (error) {
    console.error('Greška prilikom čitanja ili pisanja JSON datoteke:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/marketing/osvjezi/klikovi', async (req, res) => {
  const { nizNekretnina } = req.body || { nizNekretnina: [] };

  try {
    // Read JSON 
    const preferencije = await readJsonFile('preferencije');

    // Finding the needed objects based on id
    const promjene = nizNekretnina.map((id) => {
      const nekretninaData = preferencije.find((item) => item.id === id);
      return { id, klikovi: nekretninaData ? nekretninaData.klikovi : 0 };
    });

    res.status(200).json({ nizNekretnina: promjene });
  } catch (error) {
    console.error('Greška prilikom čitanja ili pisanja JSON datoteke:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
