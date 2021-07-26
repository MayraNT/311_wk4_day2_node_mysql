const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  let sql = "select * from ??, ??, ?? where ??.user_id = ??.id and ??.user_id = ??.id"
  sql = mysql.format(sql, ["users", "usersContact", "usersAddress", "usersContact", "users", "usersAddress", "users"])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = "select * from ?? where ?? = ?"
  sql = mysql.format(sql, ["users", "id", req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME
  let sql = "insert into ?? (??, ??) values (?, ?)"
  sql = mysql.format(sql, ["users", "first_name", "last_name", req.body.first_name, req.body.last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })

  // I couldn't figure out insert into multiple tables. Below is my best attempt...
  
  // let sqlUser = "insert into ?? (??, ??) values (?, ?)"
  // let sqlContact = "insert into ?? (??, ??, ??) values (?, ?, ?)"
  // let sqlAddress = "insert into ?? (??, ??, ??, ??, ??) values (?, ?, ?, ?, ?)"
  
  // let valuesUser = ["users", "first_name", "last_name", req.body.first_name, req.body.last_name]
  // let valuesContact = ["usersContact", "phone1", "phone2", "email", req.body.phone1, req.body.phone2, req.body.email]
  // let valuesAddress = ["usersAddress", "address", "city", "county", "state", "zip", req.body.address, req.body.city, req.body.county, req.body.state, req.body.zip]

  // sqlUser = mysql.format(sqlUser, valuesUser)
  // sqlContact = mysql.format(sqlContact, valuesContact)
  // sqlAddress = mysql.format(sqlAddress, valuesAddress)
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "update ?? set ?? = ?, ?? = ? where ?? = ?"
  sql = mysql.format(sql, ["users", "first_name", req.body.first_name, "last_name", req.body.last_name, "id", req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "delete from ?? where ?? = ?"
  sql = mysql.format(sql, ["users", "first_name", req.params.first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}