import { env } from 'environments/environments';
export class DataBase {
    mysql = require('mysql2/promise');
    env = env;
    checkData() {
        console.log(env);
        this.checkDatabase();
    }
    async checkDatabase() {
        const connection = await this.mysql.createConnection({
            host: env.ENV_HOST,
            port: env.ENV_PORT,
            user: env.ENV_USER,
            password: env.ENV_PASS,
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
                
              USE ${env.ENV_DATABASE};

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
                mwst TINYINT DEFAULT 0,
                brand varchar(255) NOT NULL,
                model varchar(255) NOT NULL,
                sku varchar(255) NOT NULL,
                ean varchar(255) NOT NULL,
                availability varchar(255) NOT NULL,
                weight DECIMAL(10,2) NOT NULL,
                menge INTEGER NOT NULL DEFAULT 0,
                dimensions varchar(255) NOT NULL,
                liferant INT NOT NULL DEFAULT 0,
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

              CREATE TABLE IF NOT EXISTS bestellung (
                id INT NOT NULL AUTO_INCREMENT,
                email VARCHAR(255) NOT NULL,
                vorname VARCHAR(255) NOT NULL,
                nachname VARCHAR(255) NOT NULL,
                strasse VARCHAR(255) NOT NULL,
                hausnummer VARCHAR(255) NOT NULL,
                plz MEDIUMINT NOT NULL,
                stadt VARCHAR(255) NOT NULL,
                l_nachname VARCHAR(255),
                l_strasse VARCHAR(255),
                l_hausnummer VARCHAR(255),
                l_plz MEDIUMINT,
                l_stadt VARCHAR(255),
                bestellung_status TINYTEXT NOT NULL,
                total_price DECIMAL(10,2),
                steuer DECIMAL(10,2),
                artikels_list VARCHAR(10000) NOT NULL,
                einkaufs_datum DATETIME,
                versand_datum DATETIME,
                bazahlt_am DATETIME,
                payart TINYTEXT NOT NULL,
                paypalOrderId VARCHAR(255) NOT NULL,
                PRIMARY KEY (id),
                INDEX (email)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
             
              CREATE TABLE IF NOT EXISTS kreditoren (
                id int NOT NULL AUTO_INCREMENT,
                kreditorennummer varchar(255) NOT NULL UNIQUE,
                kreditorenname varchar(255) NOT NULL,
                anschrift varchar(255) NOT NULL,
                telefonnummer varchar(255) DEFAULT NULL,
                faxnummer varchar(255) DEFAULT NULL,
                email varchar(255) DEFAULT NULL,
                bankname varchar(255) NOT NULL,
                iban varchar(255) NOT NULL,
                bic varchar(255) NOT NULL,
                zahlungsbedingungen varchar(255) DEFAULT NULL,
                steuernummer varchar(255) DEFAULT NULL,
                ust_idnr varchar(255) DEFAULT NULL,
                land tinytext NOT NULL,
                PRIMARY KEY (id)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
              
              CREATE TABLE IF NOT EXISTS waren_buchung (
                buchung_id INT AUTO_INCREMENT PRIMARY KEY,
                lieferschein_id TINYTEXT NOT NULL,
                liefer_date DATE NOT NULL,
                buchung_date DATE NOT NULL,
                gebucht TINYINT NOT NULL DEFAULT 0,
                korrigiertes_nr INT,
                korrigiertes_grund TEXT,
                kreditor_id INT,
                CONSTRAINT FK_kreditor FOREIGN KEY (kreditor_id) REFERENCES kreditoren(id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
           
            CREATE TABLE IF NOT EXISTS buchung_artikel (
                id INT AUTO_INCREMENT PRIMARY KEY,
                artikels_id INT NOT NULL,
                buchung_id INT NOT NULL,
                liferantid int NOT NULL,
                price DECIMAL(10,2),
                mwst DECIMAL(10,2),
                menge INT NOT NULL,
                CONSTRAINT FK_buchung FOREIGN KEY (buchung_id) REFERENCES waren_buchung(buchung_id)
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
