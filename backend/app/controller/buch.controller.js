const Buch = require("../model/buch.model.js");

// Create and save a new book
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a book
    const buch = new Buch({
        foto: req.body.foto,
        titel: req.body.titel,
        autor: req.body.autor,
        seiten: req.body.seiten,
        kurzbeschreibung: req.body.kurzbeschreibung,
        monat: req.body.monat,
        jahr: req.body.jahr
    });

    // Save book in the database
    Buch.create(buch, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Member."
            });
        else res.send(data);
    });
};

// Retrieve all books from the database.
exports.findAll = (req, res) => {
    Buch.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        else res.send(data);
    });
};

// Find a single book with a buchId
exports.findOne = (req, res) => {
    Buch.findById(req.params.buchId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Book with id ${req.params.buchId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Book with id " + req.params.buchId
                });
            }
        } else res.send(data);
    });
};

// Update a book identified by the buchId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Buch.updateById(
        req.params.buchId,
        new Buch(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Book with id ${req.params.buchId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Book with id " + req.params.buchId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a book with the specified buchId in the request
exports.delete = (req, res) => {
    Buch.remove(req.params.buchId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Book with id ${req.params.buchId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Book with id " + req.params.buchId
                });
            }
        } else res.send({ message: `Book was deleted successfully!` });
    });
};

// Delete all books from the database.
exports.deleteAll = (req, res) => {
    Buch.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all books."
            });
        else res.send({ message: `All Books were deleted successfully!` });
    });
};