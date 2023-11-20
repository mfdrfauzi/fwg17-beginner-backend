const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `
    SELECT "pt"."id", "p"."name" AS "productName", "t"."name" AS "tag" 
    FROM "products" "p"
    JOIN "productTags" "pt" ON "p"."id" = "pt"."productId"
    JOIN "tags" "t" ON "pt"."tagId" = "t"."id";
    `
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `
    SELECT "pt"."id", "p"."name" AS "productName", "t"."name" AS "tag"
    FROM "products" "p"
    JOIN "productTags" "pt" ON "p"."id" = "pt"."productId" 
    JOIN "tags" "t" ON "pt"."tagId" = "t"."id"
    WHERE "pt"."id" = $1;
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "productTags"("productId","tagId") 
        VALUES ($1, $2) 
        RETURNING *
    `
    const values = [data.productId, data.tagId]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updateProductTags = async (id,productId,tagId)=>{
    const sql = `UPDATE "productTags"
    SET "productId" = $1, "tagId" = $2 WHERE "id" = $3
    RETURNING *`

    const values = [productId,tagId,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteProductTags = async (id)=>{
    const sql = `DELETE FROM "productTags" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}