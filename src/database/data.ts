export class DataBase {
    mysql = require('mysql2/promise');
    checkData() {
        this.checkDatabase();
    }

    async checkDatabase() {
        const connection = await this.mysql.createConnection({
            host: '192.168.0.11',
            port: 3306,
            user: 'root',
            password: 'beta1243',
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
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

              CREATE TABLE IF NOT EXISTS artikel (
                id int NOT NULL AUTO_INCREMENT,
                name varchar(255) NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                brand varchar(255) NOT NULL,
                model varchar(255) NOT NULL,
                sku varchar(255) NOT NULL,
                ean varchar(255) NOT NULL,
                availability varchar(255) NOT NULL,
                weight DECIMAL(10,2) NOT NULL,
                menge INTEGER NOT NULL DEFAULT 0,
                dimensions varchar(255) NOT NULL,
                images varchar(255) NOT NULL,
                relatedProducts TEXT NOT NULL,
                reviews TEXT NOT NULL,
                rating DECIMAL(10,2) NOT NULL,
                PRIMARY KEY (id)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

              CREATE TABLE IF NOT EXISTS artikel_category (
                id int NOT NULL AUTO_INCREMENT,
                name varchar(255) NOT NULL,
                PRIMARY KEY (id)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

              CREATE TABLE IF NOT EXISTS artikel_categories_artikel_category (
                artikelId int NOT NULL,
                artikelCategoryId int NOT NULL,
                PRIMARY KEY (artikelId, artikelCategoryId),
                CONSTRAINT FK_artikel_categories_artikels_artikel_artikel_id FOREIGN KEY (artikelId) REFERENCES artikel(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT FK_artikel_categories_artikels_artikel_artikel_category_id FOREIGN KEY (artikelCategoryId) REFERENCES artikel_category(id) ON DELETE CASCADE ON UPDATE CASCADE
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
