var express = require('express');
var router = express.Router();
var Linkedin = require('node-linkedin')('779kwjelaoff4h', 'MCNrtcMoeACfLFiV', 'http://localhost:3000/formateur/linkedin/callback');


var mongoose = require('mongoose');
var Formateur = mongoose.model('formateur');

var scope = ['r_basicprofile'];

router.get('/linkedin/oauth', function (req, res) {
    Linkedin.auth.authorize(res, scope);
});

router.get("/linkedin/callback", function (req, res, next) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function (err, results) {
        if (err)
            return console.error(err);

        var linkedin = Linkedin.init(results.access_token);


        linkedin.people.me(function (err, me) {
            formateur = new Formateur({
                cin: 0,
                nom: me.firstName,
                prenom: me.lastName,
                specialite: me.headline
            });

            formateur.save(function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.redirect("/");
                }
            });
        });

    });
});

router.get('/', function (req, res, next) {
    Formateur.find({}, function (err, formateurs) {
        if (err) {
            res.json(err);
        } else {
            res.json(formateurs);
        }
    });
});

router.get('/:cin', function (req, res, next) {
    Formateur.findOne({cin: req.params.cin}, function (err, formateur) {
        if (err) {
            res.json(err);
        } else {
            res.json(formateur);
        }
    });
});

router.delete('/:cin', function (req, res, next) {
    var cin = req.params.cin;

    Formateur.remove({cin: cin}, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json("deleted");
        }
    });
});

router.post('/', function (req, res, next) {

    if (req.body.cin
        && req.body.nom
        && req.body.prenom
        && req.body.specialite
    ) {
        formateur = new Formateur({
            cin: req.body.cin,
            nom: req.body.nom,
            prenom: req.body.prenom,
            specialite: req.body.specialite
        });

        formateur.save(function (err) {
            if (err) {
                res.json(err);
            } else {
                res.json("added");
            }
        });
    } else {
        res.json("missing fields");
        res.end();
    }
});

router.put('/', function (req, res, next) {
    if (req.body.cin
        && req.body.nom
        && req.body.prenom
        && req.body.specialite
    ) {
        Formateur.findOne({cin: req.body.cin}, function (err, formateur) {
            if (err) {
                res.json(err);
            } else {
                formateur.nom = req.body.nom;
                formateur.prenom = req.body.prenom;
                formateur.specialite = req.body.specialite;

                formateur.save(function (err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json("edited");
                    }
                });
            }
        });
    } else {
        res.json("missing fields");
        res.end();
    }
});

//TODO: Recherche Avancée

router.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
});

module.exports = router;
