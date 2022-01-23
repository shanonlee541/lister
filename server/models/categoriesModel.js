const { Pool }= require('pg')

const PG_URI = 'postgres://sjluqtng:QWg-s2J-0rtxHf0a5QfPNmGwKN0Y6SAK@fanny.db.elephantsql.com/sjluqtng';

const pool = new Pool({
    connectionString: PG_URI
})

module.exports = {
    query: function (queryString, params, callback) {
        console.log(`Executed query: ${queryString}`);
        return pool.query(queryString, params, callback);
    },

    end: function() {
        pool.end();
    }
}