const db = require('../lib/db.lib')

exports.totalCount = async (keyword = '', sortBy, orderBy) => {
    const column = ["id", "name", "basePrice", "createdAt"]

    sortBy = column.includes(sortBy) ? sortBy : 'id'
    orderBy = ["asc", "desc"].includes(orderBy) ? orderBy : 'asc'

    const sql = `
        SELECT COUNT(*) as total
        FROM "products"
        WHERE "name" ILIKE $1
    `
    const values = [`%${keyword}%`];

    const result = await db.query(sql, values);
    return result.rows[0].total;
}

exports.findAll = async (keyword='', sortBy, orderBy, page=1)=>{
    const column = ["id", "name", "basePrice", "createdAt","categoryName"]
    const ordering = ["asc","desc"]
    const limit = 10
    const offset = (page - 1) * limit

    sortBy = column.includes(sortBy) ? sortBy : 'id'
    orderBy = ordering.includes(orderBy) ? orderBy : 'asc'
    

    const sortColumn = sortBy === 'categoryName' ? '"c"."name"' : `"p"."${sortBy}"`
    console.log('sortBy:', sortBy)
    const sql = `
    SELECT 
    "p"."id" AS "id", 
    "p"."name" AS "productName", 
    "p"."image" AS "image",
    "p"."description", 
    "p"."basePrice" AS "price", 
    "pr"."rate" AS "rating",
    "c"."name" AS "categoryName",
    "p"."createdAt" AS "createdAt"
    FROM "products" "p"
    LEFT JOIN "productRatings" "pr" ON "p"."id" = "pr"."productId"
    LEFT JOIN "productCategories" "pc" ON "p"."id" = "pc"."productId"
    LEFT JOIN "categories" "c" ON "pc"."categoryId" = "c"."id"
    WHERE "p"."name" ILIKE $1
    ORDER BY ${sortColumn} ${orderBy}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = [`%${keyword}%`]
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id,selectedColumns)=>{
    const column = ["id", "name", "description", "basePrice"]
    selectColumns = selectedColumns || column

    const sql = `
    SELECT ${selectColumns.map(col => `"p"."${col}" AS "${col}"`).join(', ')} , "pr"."rate" AS "rate"
    FROM "products" "p"
    JOIN "productRatings" "pr" ON "p"."id" = "pr"."productId"
    WHERE "p"."id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insert = async (data)=>{
    const columns = []
    const values = []
    for(let item in data){
        values.push(data[item])
        columns.push(`"${item}"`)
    }

    const insertedValues = values.map((value, index) => `$${index + 1}`).join(', ');

    const sql = `
    INSERT INTO "products"
    (${columns.join(', ')})
    VALUES
    (${insertedValues})
    RETURNING *
    `
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.updateProduct = async (id,data)=>{
    const columns = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        columns.push(`"${item}"=$${values.length}`)
    }

    const sql = `UPDATE "products"
    SET ${columns.join(', ')}, "updatedAt" = now() WHERE "id" = $1
    RETURNING *`
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