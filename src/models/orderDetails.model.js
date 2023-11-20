const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "orderDetails"`
    // const sql = `
    // SELECT "o"."orderNumber", 
    // "p"."name" AS "productName", 
    // "ps"."size", "pv"."name" AS "variant",
    // "od"."quantity"
    // FROM "orderDetails" "od"
    // JOIN "products" "p" ON "od"."productId" = "p"."id"
    // JOIN "productSize" "ps" ON "od"."productSizeId" = "ps"."id"
    // JOIN "productVariant" "pv" ON "od"."productVariantId" = "pv"."id"
    // JOIN "orders" "o" ON "od"."orderId" = "o"."id"
    // `
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "orderDetails" WHERE "id" = $1`
    // const sql = `
    // SELECT "o"."orderNumber", 
    // "p"."name" AS "productName", 
    // "ps"."size", "pv"."name" AS "variant",
    // "od"."quantity"
    // FROM "orderDetails" "od"
    // JOIN "products" "p" ON "od"."productId" = "p"."id"
    // JOIN "productSize" "ps" ON "od"."productSizeId" = "ps"."id"
    // JOIN "productVariant" "pv" ON "od"."productVariantId" = "pv"."id"
    // JOIN "orders" "o" ON "od"."orderId" = "o"."id"
    // WHERE "od"."id" = $1
    // `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "orderDetails" ("productId", "productVariantId", "productSizeId", "quantity", "orderId")
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `

    const values = [data.productId, data.productVariantId,data.productSizeId, data.quantity, data.orderId]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updateOrderDetails = async (id,variant,size)=>{
    const sql = `UPDATE "orderDetails"
    SET "productVariantId" = $1,"productSizeId" = $2 WHERE "id" = $3
    RETURNING *`

    const values = [variant,size,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteOrderDetails = async (id)=>{
    const sql = `DELETE FROM "orderDetails" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}