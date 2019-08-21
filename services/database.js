const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

async function initialize() {
    const pool = await oracledb.createPool(dbConfig.hrPool);
}

async function close() {
    await oracledb.getPool().close();
}

async function simpleExecute(statement, binds = [], opts = {}) {
    
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
        conn = await oracledb.getConnection();

        return await conn.execute(statement, binds, opts);

    } catch (err) {
        console.error(err);
    } finally {
        if (conn) { // conn assignment worked, need to close
            try {
            await conn.close();
            } catch (err) {
            console.log(err);
            }
        }
    }
    
}

module.exports.simpleExecute = simpleExecute;
module.exports.close = close;
module.exports.initialize = initialize;