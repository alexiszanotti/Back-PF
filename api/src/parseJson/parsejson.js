"use strict";

const path = require("path");

const fs = require("fs");

let rawdata = fs.readFileSync(path.join(__dirname, "../../Assets/ADIDAS.json"));
let adidasinfo = JSON.parse(rawdata);
adidasinfo = adidasinfo.AdidasFinal;
console.log(adidasinfo[0].ProductName);

module.exports = adidasinfo;
