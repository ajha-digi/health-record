import { connect, connection } from "mongoose";

const URI = process.env.MONGODB_URI;

const conn = {
  isConnected: false,
};

export async function connectToDatabase() {
  if (conn.isConnected) {
    return;
  }

  const db = await connect(URI);
  const {databaseName} = db.connection.db;
  console.log(`${databaseName} connected !!`);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Mongodb connected to db"));

connection.on("error", (err) => console.error("Mongodb Errro:", err.message));
