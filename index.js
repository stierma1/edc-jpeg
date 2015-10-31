"use strict"

var Worker = require("basic-distributed-computation").Worker;
var jpeg = require("jpeg-js");

class JPEGWorker extends Worker {
  constructor(parent){
    super("jpeg", parent);
  }

  work(req){
    try{
      var data = jpeg.decode(req.body);
      req.body = data;
      req.next();
    } catch(err){
      req.status(err).next();
    }
  }
}

module.exports = JPEGWorker;
