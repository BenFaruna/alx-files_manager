import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || '27017';
    this.database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${this.host}:${this.port}`;

    this.mongoClient = new MongoClient(url);
    this.mongoClient.connect();
  }

  isAlive() {
    console.log(this.mongoClient);
  }
}

const dbClient = new DBClient;

export default dbClient;
