import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const MongoClient = mongodb.MongoClient

let db

async function connectDB() {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI)

        db = client.db(process.env.DB_NAME)

        console.log("MongoDB connected locally")
    } catch (e) {
        console.error(e)
    }
}

export { connectDB, db }