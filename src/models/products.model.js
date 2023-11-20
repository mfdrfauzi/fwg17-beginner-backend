const db = require('../lib/db.lib')

exports.findAll = async (keyword='',sortBy, orderBy, page=1)=>{
    const column = ["id", "name", "basePrice", "createdAt"]
    const ordering = ["asc","desc"]
    const limit = 10
    const offset = (page - 1) * limit

    sortBy = column.includes(sortBy) ? sortBy : 'id'
    orderBy = ordering.includes(orderBy) ? orderBy : 'asc'

    const sql = `
    SELECT "p"."id" AS "id", 
    "p"."name" AS "productName", 
    "p"."description", 
    "p"."basePrice" AS "price", 
    "pr"."rate" AS "rating",
    COUNT(*) OVER() AS "total_count"
    FROM "products" "p"
    LEFT JOIN "productRatings" "pr" ON "p"."id" = "pr"."productId"
    WHERE "p"."name" ILIKE $1
    ORDER BY ${sortBy} ${orderBy}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = [`%${keyword}%`]
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