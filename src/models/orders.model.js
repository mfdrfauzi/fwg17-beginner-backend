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
    const sql = `
    INSERT INTO "orders" ("userId", "orderNumber", "total", "status", "deliveryAddress", "fullName", "email")
    VALUES($1, $2, (select "basePrice" from "products" where "id" = $3), $4, $5, $6, $7)
    RETURNING *
    `

    const values = [data.userId, data.orderNumber,data.totalByProductId, data.status, data.deliveryAddress, data.fullName, data.email]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updateOrders = async (id,totalByProductId,address)=>{
    const sql = `UPDATE "orders"
    SET "total" = (select "basePrice" from "products" where "id" = $1),"deliveryAddress" = $2 WHERE "id" = $3
    RETURNING *`

    const values = [totalByProductId,address,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteOrders = async (id)=>{
    const sql = `DELETE FROM "orders" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}