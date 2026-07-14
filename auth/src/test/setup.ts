/*
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

to this  

mongo = await MongoMemoryServer.create();
const mongoUri = mongo.getUri();

await mongoose.connect(mongoUri, {});


afterAll hook

afterAll(async () => {
    if(mongo){
        await mongo.stop()
        await mongoose.connection.close();
    }
})

beforeEach(async () => {
    if(mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();
        
        for(let collection of collections) {
            await collection.deleteMany({});
        }
    }
})

*/
