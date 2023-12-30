//model, populate

const advancedResults = (model, populate) => {
  return (req, res, next) => {
    console.log("advanced results middleware");
    next();
  };
};
module.exports = advancedResults;
