const { text } = require('express')
const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "messages"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "messages" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "messages" ("receipentId","senderId","text") 
        VALUES ($1,$2,$3) 
        RETURNING *
    `

    const values = [data.receipentId,data.senderId,data.text]
    const { rows } = await db.query(sql, values)
    return rows[0]
}

exports.updateMessages = async (id,receipentId,senderId)=>{
    const sql = `UPDATE "messages"
    SET "receipentId" = $1, "senderId" = $2 WHERE "id" = $3
    RETURNING *`

    const values = [receipentId,senderId,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteMessages = async (id)=>{
    const sql = `DELETE FROM "messages" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}