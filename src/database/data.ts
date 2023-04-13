export class DataBase {
  mysql = require('mysql2/promise');
  checkData() {
    this.checkDatabase();
  }

  async checkDatabase() {
    const connection = await this.mysql.createConnection({
      host: '207.154.246.36',
      port: 3306,
      user: 'bartekbartek**',
      password: 'beta**1243**',
      multipleStatements: true,
    });

    try {
      await connection.query('USE kindershop');
      console.log('Database connection established');
    } catch (error) {
      console.error(`Error connecting to database: ${error}`);

      // If connection failed due to database not existing, create it
      if (error.code === 'ER_BAD_DB_ERROR') {
        console.log('Creating database...');

        try {
          await connection.query(
            `CREATE DATABASE kindershop;
              USE kindershop;

              CREATE TABLE IF NOT EXISTS user (
                id INT NOT NULL AUTO_INCREMENT,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                vorname VARCHAR(255) NOT NULL,
                nachname VARCHAR(255) NOT NULL,
                strasse VARCHAR(255) NOT NULL,
                hausnummer VARCHAR(255) NOT NULL,
                plz VARCHAR(255) NOT NULL,
                stadt VARCHAR(255) NOT NULL,
                l_nachname VARCHAR(255),
                l_strasse VARCHAR(255),
                l_hausnummer VARCHAR(255),
                l_plz VARCHAR(255),
                l_stadt VARCHAR(255),
                role VARCHAR(255),
                PRIMARY KEY (id),
                UNIQUE (email)
              );
              `,
          );
          console.log('Database created');
        } catch (error) {
          console.error(`Error creating database: ${error}`);
        }
      }
    }

    await connection.end();
  }
}
