const db = require('./db.js'); // Importovanje Sequelize konekcije i modela

// Sinhronizacija baze i inicijalizacija podataka
db.sequelize.sync({ force: true }).then(function () {
  inicializacija().then(function () {
    console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
    process.exit();
  });
});

function inicializacija() {
  return new Promise(function (resolve, reject) {
    const korisniciListaPromisea = [];
    const nekretnineListaPromisea = [];
    const upitiListaPromisea = [];

    // Dodavanje korisnika
    const korisniciPodaci = [
      {
        id: 1,
        ime: "Neko",
        prezime: "Nekic",
        username: "username1",
        password: "$2b$10$OFykzLMWv.wpDk2dXT5C8ObIgy8tlZYbm0ZPN0VTe8I/jXosIX1EG",
      },
      {
        id: 2,
        ime: "Neko2",
        prezime: "Nekic2",
        username: "username2",
        password: "$2b$10$eN2a0Ii0mkjvpSUU.6.S4uASuULIlAspWFc2LkJTmIYPZszB8oyXC",
      },
      {
        "id": 3,
        "ime": "Ismar",
        "prezime": "Muslić",
        "username": "imuslic1",
        "password": "$2b$10$XT28eJbWux2bWpB1B9rUhumRtirUV1Kp2wMFSN0bVygGhHuZp7kyi"
      },
      {
        id: 4,
        ime: "admin",
        prezime: "admin",
        username: "admin",
        password: "$2b$10$jZUkGiHI/FrIV8JKfNIc5umh83NBd.mox8ASyOnSf2.gmfETVq0/S", // sifra: admin
        admin: true
      },
      {
        id: 5,
        ime: "user",
        prezime: "user",
        username: "user",
        password: "$2b$10$iTPTTHRQINzsUhE5lc5wjOFjSfrdAl7QIHt/lXIk5CHSlo6u6Q5D6" // sifra: user

      }
    ];

    korisniciPodaci.forEach((korisnik) => {
      korisniciListaPromisea.push(db.korisnik.create(korisnik));
    });

    Promise.all(korisniciListaPromisea).then(function (korisnici) {
      const nekretninePodaci = [
        {
          "id": 1,
          "tip_nekretnine": "Stan",
          "naziv": "Useljiv stan Sarajevo",
          "kvadratura": 58,
          "cijena": 232000,
          "tip_grijanja": "plin",
          "lokacija": "Novo Sarajevo",
          "godina_izgradnje": 2019,
          "datum_objave": "01.10.2023.",
          "opis": "Sociis natoque penatibus.",
          "upiti": [
            {
              "korisnik_id": 3,
              "tekst_upita": "1"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "2"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "3"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "4"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "5"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "6"
            },
            {
              "korisnik_id": 1,
              "tekst_upita": "7"
            },
            {
              "korisnik_id": 2,
              "tekst_upita": "8"
            },
            {
              "korisnik_id": 1,
              "tekst_upita": "9"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "10"
            },
            {
              "korisnik_id": 1,
              "tekst_upita": "11"
            }
          ]
        },
        {
          "id": 2,
          "tip_nekretnine": "Poslovni prostor",
          "naziv": "Mali poslovni prostor",
          "kvadratura": 20,
          "cijena": 70000,
          "tip_grijanja": "struja",
          "lokacija": "Centar",
          "godina_izgradnje": 2005,
          "datum_objave": "20.08.2020.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 2,
              "tekst_upita": "Integer tincidunt."
            }
          ]
        },
        {
          "id": 3,
          "tip_nekretnine": "Poslovni prostor",
          "naziv": "Mali poslovni prostor",
          "kvadratura": 20,
          "cijena": 70000,
          "tip_grijanja": "struja",
          "lokacija": "Centar",
          "godina_izgradnje": 2005,
          "datum_objave": "20.08.2022.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 2,
              "tekst_upita": "Integer tincidunt."
            },
            {
              "korisnik_id": 1,
              "tekst_upita": "testiramNaNekretnini 2"
            }
          ]
        },
        {
          "id": 4,
          "tip_nekretnine": "Poslovni prostor",
          "naziv": "Mali poslovni prostor",
          "kvadratura": 20,
          "cijena": 70000,
          "tip_grijanja": "struja",
          "lokacija": "Centar",
          "godina_izgradnje": 2005,
          "datum_objave": "20.08.2021.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 2,
              "tekst_upita": "Integer tincidunt."
            }
          ]
        },
        {
          "id": 5,
          "tip_nekretnine": "Poslovni prostor",
          "naziv": "Mali poslovni prostor",
          "kvadratura": 20,
          "cijena": 70000,
          "tip_grijanja": "struja",
          "lokacija": "Centar",
          "godina_izgradnje": 2005,
          "datum_objave": "20.08.2019.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 2,
              "tekst_upita": "Integer tincidunt."
            }, 
            {
              "korisnik_id": 2,
              "tekst_upita": "testiramNaNekretnini 2"
            }
          ]
        },
        {
          "id": 6,
          "tip_nekretnine": "Kuća",
          "naziv": "Kuća Pofalići",
          "kvadratura": 140,
          "cijena": 70000,
          "tip_grijanja": "plin",
          "lokacija": "Novo Sarajevo",
          "godina_izgradnje": 2005,
          "datum_objave": "20.08.2019.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 2,
              "tekst_upita": "Integer tincidunt."
            }, 
            {
              "korisnik_id": 1,
              "tekst_upita": "testiramNaNekretnini 2"
            },
            {
              "korisnik_id": 2,
              "tekst_upita": "testiramNaNekretnini 2"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "testiramNaNekretnini 2"
            }
          ]
        },
        {
          "id": 7,
          "tip_nekretnine": "Kuća",
          "naziv": "Vikendica Bjelašnica",
          "kvadratura": 45,
          "cijena": 270000,
          "tip_grijanja": "struja",
          "lokacija": "Bjelašnica",
          "godina_izgradnje": 2012,
          "datum_objave": "20.08.2018.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 3,
              "tekst_upita": "Integer tincidunt."
            }, 
            {
              "korisnik_id": 1,
              "tekst_upita": "testiramNaNekretnini 7"
            }
          ]
        },
        {
          "id": 8,
          "tip_nekretnine": "Kuća",
          "naziv": "Kuća Vogošća",
          "kvadratura": 20,
          "cijena": 370000,
          "tip_grijanja": "struja",
          "lokacija": "Vogošća",
          "godina_izgradnje": 2004,
          "datum_objave": "20.08.2017.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 1,
              "tekst_upita": "Integer tincidunt."
            }, 
            {
              "korisnik_id": 2,
              "tekst_upita": "testiramNaNekretnini 2"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "testiramNaNekretnini 2"
            },
            {
              "korisnik_id": 2,
              "tekst_upita": "testiramNaNekretnini 2"
            }
          ]
        },
        {
          "id": 9,
          "tip_nekretnine": "Kuća",
          "naziv": "Kuća Vogošća",
          "kvadratura": 200,
          "cijena": 400000,
          "tip_grijanja": "struja",
          "lokacija": "Vogošća",
          "godina_izgradnje": 2004,
          "datum_objave": "20.08.2017.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 1,
              "tekst_upita": "Integer tincidunt."
            }, 
            {
              "korisnik_id": 2,
              "tekst_upita": "testiramNaNekretnini 2"
            }
          ]
        },
        {
          "id": 10,
          "tip_nekretnine": "Kuća",
          "naziv": "Stan Sarajevo Centar",
          "kvadratura": 70,
          "cijena": 450000,
          "tip_grijanja": "struja",
          "lokacija": "Centar",
          "godina_izgradnje": 1913,
          "datum_objave": "20.08.2017.",
          "opis": "Magnis dis parturient montes.",
          "upiti": [
            {
              "korisnik_id": 1,
              "tekst_upita": "Integer tincidunt."
            }, 
            {
              "korisnik_id": 2,
              "tekst_upita": "testiramNaNekretnini 2"
            },
            {
              "korisnik_id": 3,
              "tekst_upita": "testiramNaNekretnini 2"
            },
            {
              "korisnik_id": 2,
              "tekst_upita": "testiramNaNekretnini 2"
            }
          ]
        }
      ];

      nekretninePodaci.forEach((nekretnina) => {
        nekretnineListaPromisea.push(
          db.nekretnina
            .create({
              id: nekretnina.id,
              tip_nekretnine: nekretnina.tip_nekretnine,
              naziv: nekretnina.naziv,
              kvadratura: nekretnina.kvadratura,
              cijena: nekretnina.cijena,
              tip_grijanja: nekretnina.tip_grijanja,
              lokacija: nekretnina.lokacija,
              godina_izgradnje: nekretnina.godina_izgradnje,
              datum_objave: nekretnina.datum_objave,
              opis: nekretnina.opis,
            })
            .then(function (kreiranaNekretnina) {
              const upiti = nekretnina.upiti.map((upit) => ({
                korisnikId: upit.korisnik_id,
                tekst: upit.tekst_upita,
                nekretninaId: kreiranaNekretnina.id,
              }));

              upiti.forEach((upit) => {
                upitiListaPromisea.push(db.upit.create(upit));
              });

              return kreiranaNekretnina;
            })
        );
      });

      Promise.all(nekretnineListaPromisea)
        .then(() => Promise.all(upitiListaPromisea))
        .then(() => resolve())
        .catch((err) => {
          console.error("Greška prilikom kreiranja nekretnina ili upita:", err);
          reject(err);
        });
    });
  });
}