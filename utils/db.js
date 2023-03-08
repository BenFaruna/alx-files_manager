import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || '27017';
    this.database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${this.host}:${this.port}/${this.database}`;

    this.mongoClient = new MongoClient(url, { useUnifiedTopology: true });
    this.mongoClient.connect();
  }

  isAlive() {
    return this.mongoClient.isConnected();
  }

  async nbUsers() {
    return this.mongoClient.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.mongoClient.db().collection('files').countDocuments()
  }
}

const dbClient = new DBClient();

export default dbClient;