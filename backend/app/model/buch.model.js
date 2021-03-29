const sql = require("./db.js");

// constructor
const Buch = function(buch) {
    this.foto = buch.foto;
    this.titel = buch.titel;
    this.autor = buch.autor;
    this.seiten = buch.seiten;
    this.kurzbeschreibung = buch.kurzbeschreibung;
    this.monat = buch.monat;
    this.jahr = buch.jahr;

};

Buch.create = (newBuch, result) => {
    sql.query("INSERT INTO buecherliste SET ?", newBuch, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created buch: ", { id: res.insertId, ...newBuch });
        result(null, { id: res.insertId, ...newBuch });
    });
};

Buch.findById = (buchId, result) => {
    sql.query(`SELECT * FROM buecherliste WHERE buch_id = ${buchId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found buch: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Buch with the id
        result({ kind: "not_found" }, null);
    });
};

Buch.getAll = result => {
    sql.query("SELECT * FROM buecherliste", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("buch: ", res);
        result(null, res);
    });
};

Buch.updateById = (id, buch, result) => {
    sql.query(
        "UPDATE buecherliste SET foto = ?, titel = ?, autor = ?, seiten = ?, kurzbeschreibung = ?, monat = ?, jahr = ?  WHERE buch_id = ?",
        [buch.foto, buch.titel, buch.autor, buch.seiten, buch.kurzbeschreibung, buch.monat, buch.jahr, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated buch: ", { id: id, ...buch });
            result(null, { id: id, ...buch });
        }
    );
};

Buch.remove = (id, result) => {
    sql.query("DELETE FROM buecherliste WHERE buch_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Buch with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted buch with id: ", id);
        result(null, res);
    });
};

Buch.removeAll = result => {
    sql.query("DELETE FROM buecherliste", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} buch`);
        result(null, res);
    });
};

module.exports = Buch;