const db = require('../lib/db.lib')

exports.totalCount = async () => {
    
    const sql = `
        SELECT COUNT(*) as total
        FROM "productSize"
    `
    const values = []

    const result = await db.query(sql, values)
    return result.rows[0].total
}

exports.findAll = async ()=>{
    const sql = `SELECT "id", "size","additionalPrice","createdAt"
    FROM "productSize"`

    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id)=>{
    const sql = `SELECT * FROM "productSize" WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data) => {
    const insertSql = `
    INSERT INTO "productSize" ("size", "additionalPrice") 
        VALUES ($1, $2) 
        RETURNING *
    `
    const addEnumSql = `ALTER TYPE "sizeProduct" ADD VALUE IF NOT EXISTS '${data.size}'`

    await db.query(addEnumSql)

    const values = [data.size, data.additionalPrice]
    const { rows } = await db.query(insertSql, values)
    return rows[0]
};

exports.updateSize = async (id,size)=>{
    const sql = `UPDATE "productSize"
    SET "size" = $1 WHERE "id" = $2
    RETURNING *`

    const addEnumSql = `ALTER TYPE "sizeProduct" ADD VALUE IF NOT EXISTS '${size}'`

    await db.query(addEnumSql)

    const values = [size,id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteSize = async (id)=>{
    const sql = `DELETE FROM "productSize" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}