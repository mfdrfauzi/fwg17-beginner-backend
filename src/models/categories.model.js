const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "categories"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "categories" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "categories" ("name") 
        VALUES ($1) 
        RETURNING *
    `

    const values = [data.name]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updateCategories = async (id,name)=>{
    const sql = `UPDATE "categories"
    SET "name" = $1 WHERE "id" = $2
    RETURNING *`

    const values = [name,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteCategories = async (id)=>{
    const sql = `DELETE FROM "categories" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}