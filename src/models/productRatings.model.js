const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `
    SELECT "pr"."id", "p"."name" AS "productName", "pr"."rate" AS "ratings", "u"."fullName" AS "userName", "pr"."reviewMessage" AS "reviewMessage"
    FROM "products" "p"
    JOIN "productRatings" "pr" ON "p"."id" = "pr"."productId"
    JOIN "users" "u" ON "pr"."userId" = "u"."id"
    `
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `
    SELECT "pr"."id", "p"."name" AS "productName", "pr"."rate" AS "ratings", "u"."fullName" AS "userName", "pr"."reviewMessage" AS "reviewMessage"
    FROM "products" "p"
    JOIN "productRatings" "pr" ON "p"."id" = "pr"."productId"
    JOIN "users" "u" ON "pr"."userId" = "u"."id"
    WHERE "pr"."id" = $1;
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "productRatings"("productId","rate","reviewMessage","userId") 
        VALUES ($1, $2, $3, $4)     
        RETURNING *
    `
    const values = [data.productId, data.rate, data.reviewMessage, data.userId]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updateProductRatings = async (id,rate,reviewMessage)=>{
    const sql = `UPDATE "productRatings"
    SET "rate" = $1, "reviewMessage" = $2 WHERE "id" = $3
    RETURNING *`

    const values = [rate,reviewMessage,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteProductRatings = async (id)=>{
    const sql = `DELETE FROM "productRatings" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}