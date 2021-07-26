const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  let sql = "select ??.*, ??.*, ??.* from ?? join ?? on ??.user_id = ??.id join ?? on ??.user_id = ??.id"
  sql = mysql.format(sql, ["users", "usersContact", "usersAddress", "users", "usersContact", "usersContact", "users", "usersAddress", "usersAddress", "users"])

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