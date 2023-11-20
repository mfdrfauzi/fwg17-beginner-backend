const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "promos"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "promos" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "promos" ("name", "code", "description", "percentage", "isExpired", "maximumPromo", "minimumAmount")
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `

    const values = [data.name,data.code,data.description,data.percentage,data.isExpired,data.maximumPromo,data.minimumAmount]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updatePromos = async (id,name)=>{
    const sql = `UPDATE "promos"
    SET "name" = $1 WHERE "id" = $2
    RETURNING *`

    const values = [name,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deletePromos = async (id)=>{
    const sql = `DELETE FROM "promos" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}