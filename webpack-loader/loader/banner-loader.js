
const fs = require("fs");
const path = require("path");
const { getOptions } = require("loader-utils");


function loader (source, map) {
  const options = getOptions(this);
  console.log(source);
  return source;
}


module.exports = loader;
