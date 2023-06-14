const mysql = require("mysql2");
require("dotenv").config();

// // Connection Pool
let pool
if (process.env.JAWSDB_URL) {
    pool = mysql.createPool(process.env.JAWSDB_URL)
} else {
    pool = mysql.createPool({
        connectionLimit : 100,
        host : process.env.JAWSDB_URL,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}

// let db;
// if (process.env.JAWSDB_URL) {
//     console.log('hello patrick')
//     db = mysql.createConnection(process.env.JAWSDB_URL)
// } else {
//     console.log('hi pat')
//     db = mysql.createConnection(
//         {
//           host: 'localhost',
//           user: process.env.DB_USER,
//           password: process.env.DB_PASSWORD,
//           database: process.env.DB_NAME
//         },
//         console.log(`Connected to the movies_db database.`)
//       );
// }

// View Users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connect
        console.log("connected as ID " + connection.threadId);

        connection.query('SELECT * FROM Users WHERE status = "active"', (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                let removedUser = req.query.removed;
                res.render("home", { rows, removedUser });
            } else {
                res.send(err)
            }
            console.log("User table data: \n", rows)
        })
    })
};

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connect
        console.log("connected as ID " + connection.threadId);

        let searchTerm = req.body.search //search comes from the name of the <form> in main.hbs

        connection.query('SELECT * FROM Users WHERE first_name LIKE ? OR last_name LIKE ?', ["%" + searchTerm + "%", "%" + searchTerm + "%"], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render("home", { rows });
            } else {
                res.send(err)
            }

            console.log("User table data: \n", rows)
        })
    })
}

exports.form = (req, res) => {
    res.render("add-user");
};


exports.create = (req, res) => {
    //res.render("add-user");
    const { first_name, last_name, email, phone, comments } = req.body

    pool.getConnection((err, connection) => {
        if(err) throw err; //not connect
        console.log("connected as ID " + connection.threadId);

        let searchTerm = req.body.search //search comes from the name of the <form> in main.hbs

        connection.query('INSERT INTO Users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render("add-user", { alert: 'User added successfully' });
            } else {
                res.send(err)
            }

            console.log("User table data: \n", rows)
        })
    })
};

exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connect
        console.log("connected as ID " + connection.threadId);

        connection.query('SELECT * FROM Users WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render("edit-user", { rows });
            } else {
                res.send(err)
            }

            console.log("User table data: \n", rows)
        })
    })
};

exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body

    pool.getConnection((err, connection) => {
        if(err) throw err; //not connect
        console.log("connected as ID " + connection.threadId);

        let searchTerm = req.body.search //search comes from the name of the <form> in main.hbs

        connection.query('UPDATE Users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                pool.getConnection((err, connection) => {
                    if(err) throw err; //not connect
                    console.log("connected as ID " + connection.threadId);
            
                    connection.query('SELECT * FROM Users WHERE id = ?', [req.params.id], (err, rows) => {
                        //when done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render("edit-user", { rows, alert: `${first_name} has been updated!` });
                        } else {
                            res.send(err)
                        }
            
                        console.log("User table data: \n", rows)
                    })
                })
            
            } else {
                res.send(err)
            }

            console.log("User table data: \n", rows)
        })
    })
};

exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connect
        console.log("connected as ID " + connection.threadId);

        connection.query('DELETE FROM Users WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                let removedUser = encodeURIComponent("User successfully removed.");
                res.redirect("/?removed=" + removedUser);
            } else {
                res.send(err)
            }

            console.log("User table data: \n", rows)
        })
    })
};

exports.viewAll = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connect
        console.log("connected as ID " + connection.threadId);

        connection.query('SELECT * FROM Users WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the connection, release it
            connection.release();
            if(!err) {
                res.render("view-user", { rows });
            } else {
                res.send(err)
            }
            console.log("User table data: \n", rows)
        })
    })
};