const db = require('../lib/db.lib')

exports.totalCount = async (keyword = '', sortBy, orderBy) => {
    const column = ["id", "fullName", "role", "createdAt"]

    sortBy = column.includes(sortBy) ? sortBy : 'id'
    orderBy = ["asc", "desc"].includes(orderBy) ? orderBy : 'asc'

    const sql = `
        SELECT COUNT(*) as total
        FROM "users"
        WHERE "fullName" ILIKE $1
    `
    const values = [`%${keyword}%`];

    const result = await db.query(sql, values);
    return result.rows[0].total;
}

exports.findAll = async (keyword='',sortBy, orderBy, page=1)=>{
    const column = ["id", "fullName", "role", "createdAt"]
    const ordering = ["asc","desc"]
    const limit = 5
    const offset = (page - 1) * limit

    sortBy = column.includes(sortBy) ? sortBy : 'id'
    orderBy = ordering.includes(orderBy) ? orderBy : 'asc'

    const sql = `
    SELECT 
    "id", 
    "fullName", 
    "email",
    "password",
    "phoneNumber",
    "role",
    "createdAt"
    FROM "users"
    WHERE "fullName" ILIKE $1
    ORDER BY ${sortBy} ${orderBy}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = [`%${keyword}%`]
    const {rows} = await db.query(sql, values)
    return rows
}

exports.findDetails = async (id,selectedColumns)=>{
    const column = [
        "id", "fullName", "email", 
        "password", "phoneNumber", "role", "createdAt"]
    selectColumns = selectedColumns || column

    const sql = `
    SELECT ${selectColumns.map(col => `"${col}" AS "${col}"`).join(', ')}
    FROM "users" 
    WHERE "id" = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.findOneByEmail = async (email) =>{
    const sql = `SELECT * FROM "users" WHERE "email" = $1`
    const values = [email]
    const {rows} = await db.query(sql,values)
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
    INSERT INTO "users"
    (${columns.join(', ')})
    
    VALUES
    (${insertedValues})
    RETURNING *
    `
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.updateUser = async (id,data)=>{
    const columns = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        columns.push(`"${item}"=$${values.length}`)
    }

    const sql = `UPDATE "users"
    SET ${columns.join(', ')}
    WHERE "id" = $1
    RETURNING *`
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.deleteUser = async (id)=>{
    const sql = `DELETE FROM "users" WHERE "id" = $1
    RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}