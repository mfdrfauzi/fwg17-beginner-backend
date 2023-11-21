const db = require('../lib/db.lib')

exports.findAll = async (keyword='',searchBy, sortBy, orderBy, page=1)=>{
    const column = ["id", "name", "basePrice", "created_at"]
    const search = ["name", "basePrice"]
    const ordering = ["asc","desc"]
    const limit = 10
    const offset = (page - 1) * limit

    searchBy = search.includes(searchBy) ? searchBy : 'name'
    sortBy = column.includes(sortBy) ? sortBy : 'id'
    orderBy = ordering.includes(orderBy) ? orderBy : 'asc'
    const sql = `
    SELECT "p"."id" AS "id", 
    "p"."name" AS "productName", 
    "p"."description", 
    "p"."basePrice" AS "price", 
    "pr"."rate" AS "rating",
    TO_CHAR("p"."created_at", 'YYYY/MM/DD') AS "createdAt",
    COUNT(*) OVER() AS "total_count"
    FROM "products" "p"
    LEFT JOIN "productRatings" "pr" ON "p"."id" = "pr"."productId"
    WHERE ${searchBy === 'basePrice' ? `"p"."${searchBy}" = $1` : `"p"."${searchBy}" ILIKE $1`}
    ORDER BY ${sortBy === 'created_at' ? `"p"."${sortBy}"::date` : `"p"."${sortBy}"`} ${orderBy}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = [searchBy === 'basePrice' ? keyword : `%${keyword}%`]
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id,selectedColumns)=>{
    const column = ["id", "name", "description", "basePrice", "rate"]
    selectColumns = selectedColumns || column

    const sql = `
    SELECT ${selectColumns.map(col => `"p"."${col}" AS "${col}"`).join(', ')}
    FROM "products" "p"
    LEFT JOIN "productRatings" "pr" ON "p"."id" = "pr"."productId"
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
    SET ${columns.join(', ')} WHERE "id" = $1
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