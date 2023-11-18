const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "products"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "products" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data)=>{
    const sql = `INSERT INTO "products"
    ("name", "description", "basePrice", "image", "discount", "isRecommended")
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `
    const values = [data.name, data.description, data.basePrice, data.image, data.discount, data.isRecommended]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.updateProduct = async (id,name)=>{
    const sql = `UPDATE "products"
    SET "name" = $1 WHERE "id" = $2
    RETURNING *`
    const values = [name,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteProduct = async (id)=>{
    const sql = `DELETE FROM "products" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}