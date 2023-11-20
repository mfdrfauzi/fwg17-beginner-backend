const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "tags"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "tags" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "tags" ("name") 
        VALUES ($1) 
        RETURNING *
    `

    const values = [data.name]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updateTags = async (id,name)=>{
    const sql = `UPDATE "tags"
    SET "name" = $1 WHERE "id" = $2
    RETURNING *`

    const values = [name,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteTags = async (id)=>{
    const sql = `DELETE FROM "tags" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}