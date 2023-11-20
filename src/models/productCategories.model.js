const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `
    SELECT "pc"."id", "p"."name" AS "productName", "c"."name" AS "category"
    FROM "products" "p"
    JOIN "productCategories" "pc" ON "p"."id" = "pc"."productId"
    JOIN "categories" "c" ON "pc"."categoryId" = "c"."id"
    `
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `
    SELECT "pc"."id", "p"."name" AS "productName", "c"."name" AS "category"
    FROM "products" "p"
    JOIN "productCategories" "pc" ON "p"."id" = "pc"."productId"
    JOIN "categories" "c" ON "pc"."categoryId" = "c"."id"
    WHERE "pc"."id" = $1;
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const sql = `
    INSERT INTO "productCategories"("productId","categoryId") 
        VALUES ($1, $2)     
        RETURNING *
    `
    const values = [data.productId, data.categoryId]
    const { rows } = await db.query(sql, values)
    return rows[0]
};

exports.updateProductCategories = async (id,productId,categoryId)=>{
    const sql = `UPDATE "productCategories"
    SET "productId" = $1, "categoryId" = $2 WHERE "id" = $3
    RETURNING *`

    const values = [productId,categoryId,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteProductCategories = async (id)=>{
    const sql = `DELETE FROM "productCategories" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}