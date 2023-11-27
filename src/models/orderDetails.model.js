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
    const columns = []
    const values = []

    for (let item in data) {
        values.push(data[item])
        columns.push(`"${item}"`)
    }

    const insertedValues = values.map((value, index) => `$${index + 1}`).join(', ')

    const sql = `
        INSERT INTO "orderDetails"
        (${columns.join(', ')})
        VALUES
        (${insertedValues})
        RETURNING *
    `

    const { rows } = await db.query(sql, values)
    return rows[0]
}

exports.updateOrderDetails = async (id,data)=>{
    const columns = []
    const values = []

    for (let item in data) {
        values.push(data[item])
        columns.push(`"${item}" = $${values.length}`)
    }

    const sql = `
        UPDATE "orderDetails"
        SET ${columns.join(', ')}
        WHERE "id" = $${values.length + 1}
        RETURNING *
    `

    values.push(id)

    const { rows } = await db.query(sql, values)
    return rows[0]
}

exports.deleteOrderDetails = async (id)=>{
    const sql = `DELETE FROM "orderDetails" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}