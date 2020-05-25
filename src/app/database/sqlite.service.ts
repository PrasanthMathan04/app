import { Injectable } from "@angular/core";

var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DatabaseService {
     
  public getdbConnection() { 
           return new Sqlite('csdstudent');
  }
 
  public closedbConnection() {
         new Sqlite('csdstudent')
         .then((db) => {
         db.close();
         });
    }
}