import * as SQLite from "expo-sqlite";

const DATABASENAME = "locations.db";
const COORDINATESTABLE = "coordinates";
const db = SQLite.openDatabaseSync(DATABASENAME);

type Coordinate = {
  id: number;
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;
};

export const initializeDatabase = async () => {
  try {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS ${COORDINATESTABLE} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          startLat FLOAT NOT NULL,
          startLong FLOAT NOT NULL,
          endLat FLOAT NOT NULL,
          endLong FLOAT NOT NULL
        );
      `);
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export const getLastLocation = async (): Promise<Coordinate | null> => {
  try {
    const location = await db.getAllAsync<Coordinate>(
      `SELECT * FROM ${COORDINATESTABLE} ORDER BY id DESC LIMIT 1`
    );
    if (location.length == 1) {
      return location[0];
    }
  } catch (error) {
    console.error("Error fetching last location:", error);
    return null;
  }
  return null;
};

export const insertLocation = async (
  startLat: number,
  startLong: number,
  endLat: number,
  endLong: number
) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO ${COORDINATESTABLE} (startLat, startLong, endLat, endLong ) VALUES (?, ?, ?, ?)`,
      startLat,
      startLong,
      endLat,
      endLong
    );
    return result;
  } catch (error) {
    console.error("Error inserting location:", error);
  }
};
