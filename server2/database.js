const mysql = require('mysql2/promise');

class PatientDB {
    constructor(adminConfig, readerConfig) {
        this.adminConfig = adminConfig;
        this.readerConfig = readerConfig;
        
        this.defaultPatients = [
            ['Sara Brown', '1901-01-01 00:00:00'],
            ['John Smith', '1941-01-01 00:00:00'],
            ['Jack Ma', '1961-01-30 00:00:00'],
            ['Elon Musk', '1999-01-01 00:00:00']
        ];
    }

    async ensureTableExists() {
        const conn = await mysql.createConnection(this.adminConfig);
        
        const sql = `
            CREATE TABLE IF NOT EXISTS patient (
                patientid INT(11) AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                dateOfBirth DATETIME
            ) ENGINE=InnoDB;
        `;
        await conn.execute(sql);
        await conn.end();
    }

    async insertDefaultData() {
        await this.ensureTableExists();
        const conn = await mysql.createConnection(this.adminConfig);
        const sql = "INSERT INTO patient (name, dateOfBirth) VALUES ?";
        const [result] = await conn.query(sql, [this.defaultPatients]);
        await conn.end();
        return result;
    }

    async secureRead(sqlQuery) {
        const conn = await mysql.createConnection(this.readerConfig);
        const [rows] = await conn.execute(sqlQuery);
        await conn.end();
        return rows;
    }
}

module.exports = PatientDB;
