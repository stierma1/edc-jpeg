"use strict"

var Worker = require("basic-distributed-computation").Worker;
var jpeg = require("jpeg-js");

class JPEGWorker extends Worker {
  constructor(parent){
    super("jpeg", parent);
  }

  work(req){
    try{
      req.body.imageData = jpeg.decode(req.body.imageData);
      req.body.imageDataFormat = "jpg";
    } catch(err){
      req.status(err);
    } finally{
      req.next();
    }
  }

}

module.exports = JPEGWorker;
