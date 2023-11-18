const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "users"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "users" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data)=>{
    const sql = `INSERT INTO "users"
    ("fullName", "email", "password", "address", "picture", "phoneNumber", "role")
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `
    const values = [data.name, data.email, data.password, data.address, data.picture, data.phoneNumber, data.role]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.updateUser = async (id,name)=>{
    const sql = `UPDATE "users"
    SET "fullName" = $1 WHERE "id" = $2
    RETURNING *`
    const values = [name,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteUser = async (id)=>{
    const sql = `DELETE FROM "users" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}