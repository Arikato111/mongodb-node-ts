import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

class Database {
  #Cliant;
  #dbname;
  constructor() {
    const user: string = process.env["USER"] ?? "";
    const password: string = process.env["PASSWORD"] ?? "";
    this.#dbname = process.env["DB_NAME"] ?? "";

    const url: string = `mongodb+srv://${user}:${password}@cluster0.n8oex.mongodb.net/?retryWrites=true&w=majority`;
    this.#Cliant = new MongoClient(url);
  }

  async getData() {
    await this.#Cliant.connect();
    console.log("connect successfuly");
    const db = this.#Cliant.db(this.#dbname);
    const collection = db.collection("transaction");
    const data = await collection.find().toArray();
    return data;
  }

  async insertData(name: string, age: number) {
    await this.#Cliant.connect();
    const db = this.#Cliant.db(this.#dbname);
    const collection = db.collection("transaction");

    await collection.insertOne({ name, age });
  }
  close() {
    this.#Cliant.close();
  }
}

export default Database;
