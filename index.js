"use strict"

var Worker = require("basic-distributed-computation").Worker;
var jpeg = require("jpeg-js");

class JPEGWorker extends Worker {
  constructor(parent){
    super("jpeg", parent);
  }

  work(req, inputKey, outputKey){
    var inVal = req.body;
    if(inputKey){
      inVal = req.body[inputKey];
    }
    try{
      var outObj = {
        imageData: jpeg.decode(inVal),
        imageDataFormat:"jpg"
      }
      if(outputKey){
        req.body[outputKey] = outObj
      } else {
        req.body = outObj;
      }
    } catch(err){
      req.status(err);
    } finally{
      req.next();
    }
  }

}

module.exports = JPEGWorker;
