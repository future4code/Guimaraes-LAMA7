import connection from "./connection";
import users from "./tables/users.json"
import bands from "./tables/bands.json"
import shows from "./tables/shows.json"



const printError = (error: any) => { console.log(error.sqlMessage || error.message) };

const createTables = () => connection
   .raw(`
   CREATE TABLE IF NOT EXISTS LAMA_users(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL
   );
   
   CREATE TABLE IF NOT EXISTS LAMA_bands(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      genre VARCHAR(255) NOT NULL,
      responsible VARCHAR(255) NOT NULL
   );

   CREATE TABLE IF NOT EXISTS LAMA_shows(
      id VARCHAR(255) PRIMARY KEY,
      week_day VARCHAR(255) NOT NULL,
      start_time INT NOT NULL,
      end_time INT NOT NULL,
      band_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(band_id) REFERENCES LAMA_bands(id)
   );
   
   `)
   .then(() => { console.log("As 3 tabelas foram criadas!") })
   .catch(printError);

const insertUsers = () => connection("LAMA_users")
   .insert(users)
   .then(() => { console.log("Tabela users foi populada com sucesso!!") })
   .catch(printError);

const insertBands = () => connection("LAMA_bands")
.insert(bands)
.then(() => { console.log("Tabela bands foi populada com sucesso!!") })
.catch(printError);

const insertShows = () => connection("LAMA_shows")
.insert(shows)
.then(() => { console.log("Tabela shows foi populada com sucesso!!") })
.catch(printError);



const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertUsers)
   .then(insertBands)
   .then(insertShows)
   .finally(closeConnection);
