const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "orders"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "orders" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const columns = []
    const values = []
    const productId = data.productId

    for (let item in data) {
        if (item !== 'productId') { 
            values.push(data[item])
            columns.push(`"${item}"`)
        }
    }

    const total = `(SELECT SUM("basePrice") FROM "products" WHERE "id" IN (${productId.map((_, index) => `$${values.length + index + 1}`).join(', ')}))`

    values.push(...productId)

    const insertedValues = values.map((value, index) => `$${index + 1}`).join(', ')

    const sql = `
        INSERT INTO "orders"
        (${columns.join(', ')}, "total")
        VALUES
        (${insertedValues}, ${total})
        RETURNING *
    `

    const { rows } = await db.query(sql, values)
    return rows[0]
}

exports.updateOrders = async (id, data)=>{
    const columns = []
    const values = []
    const productId = data.productId

    for (let item in data) {
        if (item !== 'productId') {
            values.push(data[item])
            columns.push(`"${item}" = $${values.length}`)
        }
    }
    const total = `(SELECT SUM("basePrice") FROM "products" WHERE "id" IN (${productId.map((_, index) => `$${values.length + index + 1}`).join(', ')}))`

    values.push(id)

    const sql = `
        UPDATE "orders"
        SET ${columns.join(', ')}, "total" = ${total}
        WHERE "id" = $${values.length + 1}
        RETURNING *
    `

    const { rows } = await db.query(sql, values);
    return rows[0];
}

exports.deleteOrders = async (id)=>{
    const sql = `DELETE FROM "orders" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}