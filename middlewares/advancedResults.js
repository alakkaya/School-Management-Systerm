//model, populate

const advancedResults = (model, populate) => {
  return (req, res, next) => {
    console.log("advanced results middleware");
    //add user into the res
    res.myData = {
      name: "Emma",
    };
    next();
  };
};
module.exports = advancedResults;
