const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "productVariant"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "productVariant" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "productVariant" ("name", "additionalPrice") 
        VALUES ($1, $2) 
        RETURNING *
    `

    const values = [data.name, data.additionalPrice]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updateVariant = async (id,name,additionalPrice)=>{
    const sql = `UPDATE "productVariant"
    SET "name" = $1 , "additionalPrice" = $2 WHERE "id" = $3
    RETURNING *`

    const values = [name,additionalPrice,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteVariant = async (id)=>{
    const sql = `DELETE FROM "productVariant" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}