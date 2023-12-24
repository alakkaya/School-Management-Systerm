const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

//delete all data's in collections to start again.
const deleteAllData = async () => {
  try {
    // Takes all collectionNames
    const modelNames = mongoose.modelNames();

    // Delete all datas for each collection
    for (const modelName of modelNames) {
      const Model = mongoose.model(modelName);
      await Model.deleteMany({});
      console.log(`Veriler silindi: ${modelName}`);
    }
  } catch (error) {
    console.error("The datas couldn't delete", error);
  } finally {
    mongoose.connection.close();
  }
};
//to delete all datas use deleteAllData()

//connect the db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Couldn't connect to DB" + err);
  });
