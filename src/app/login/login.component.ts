import * as application from "tns-core-modules/application";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { EventData } from "tns-core-modules/data/observable";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { Router , NavigationExtras} from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { connectionType, getConnectionType, startMonitoring, stopMonitoring }from "tns-core-modules/connectivity";
import { Label } from "tns-core-modules/ui/label";
import { User} from "../shared/user.model";
import { LoginService } from "../shared/login.service";
import * as fileSystem from "tns-core-modules/file-system";
import { getFile, getImage, getJSON, getString, request, HttpResponse } from "tns-core-modules/http";
import { path, knownFolders, File } from "tns-core-modules/file-system";
import { exit } from "nativescript-exit";
import {setCurrentOrientation , orientationCleanup} from 'nativescript-screen-orientation';
var Sqlite = require("nativescript-sqlite");


import * as firebase from "nativescript-plugin-firebase";

import { firestore } from "nativescript-plugin-firebase";
import { collectExternalReferences } from "@angular/compiler";
import { Transition } from "tns-core-modules/ui/transition/transition";

@Component({
  selector: 'login',
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  database: any;
  credentials: User;
  logintitle;
  logintots;
  loginid;
  datainjson;
  firebaseinit;
  public isLoading = false;
  count:number = 1;
  board=false;
  
  constructor(private page: Page,private router : Router,private loginobj : LoginService){
	
	  
	setCurrentOrientation("portrait",function(){
		console.log("portrait orientation");
		});
page.actionBarHidden = true;
this.credentials = new User();
// OPENING CONNECTION WITH SQLITE
		(new Sqlite("csdstudent.db")).then(db => {
			console.log("SQLite connected.");
			// CREATE TABLE - IF NOT EXIST
			db.execSQL("CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, studentId TEXT, password TEXT)").then(id => {
				this.database = db;
				this.fetchUserData();
			}, (error) => {
				console.log("CREATE TABLE ERROR", error);
			});
			// END OF CREATION TABLE
		}, (error) => {
			console.log("OPEN DB ERROR", error);
		});
		// END OF CONNECTION 
	}
	
	ngOnInit(): void {
		if(getConnectionType() == connectionType.none)
		{
		 console.log("ngoninit starts da---------");
		  this.board=false;		
          this.checkNetwork();
		}
		else
		{
			this.loadfirebase();
		}
		
	} 
	
	 checkNetwork()
	 {
		startMonitoring((newConnectionType) => {
			switch (newConnectionType) {
				case connectionType.none:
					console.log("Connection type changed to none.");
					break;
				case connectionType.wifi:
				case connectionType.mobile:
				case connectionType.ethernet:
					 this.loadfirebase();
					 break;
			}
		});    
	 }
	 
	 loadfirebase()
	 {
		console.log("\n\n\n-------------firebase.init done--------------------");
		this.firebaseinit = firebase.firestore.collection("csd");
		const citiesCollection = this.firebaseinit.doc("login");
		citiesCollection.get({ source: "server" }).then(doc => {
			if (doc.exists) {
			  this.datainjson = JSON.stringify(doc.data());
			  console.log(this.datainjson);
			  
			  JSON.parse(this.datainjson,(key,value)=>{
				//console.log("key : "+key+"  value : "+value);
				if(key.localeCompare("logintitle") == 0)
				{
					console.log("---------Title-----"+key+"  "+value);
					this.loginobj.setTitle(value);
					console.log(this.loginobj.getTitle());
					this.logintitle = this.loginobj.getTitle();
				}
				if(key.localeCompare("logintots") == 0)
				{
					this.loginobj.setTots(value);
					this.logintots = this.loginobj.getTots();
				}
				if(key.localeCompare("id") == 0)
				{
					this.loginobj.setId(value);
					this.loginid = this.loginobj.getId();
				}
				if(key.localeCompare("drawname") == 0)
				{
					this.loginobj.setDrawName(value);
				}
				if(key.localeCompare("drawicon") == 0)
				{
					this.loginobj.setDrawIcon(value);
				}
				if(key.localeCompare("website") == 0)
				{
					this.loginobj.setWeb(value);
				}
				/*if(key.localeCompare("psgbridge") == 0)
				{
				   this.loginobj.setPsgBridge(value);
				}
				if(key.localeCompare("psgweb") == 0)
				{
					this.loginobj.setPsgWeb(value);
				}
				if(key.localeCompare("psgstud") == 0)
				{
					this.loginobj.setPsgStud(value);
				}*/
			});
			} else {
			  console.log("No such document!");
			}
		  });
		//console.log(citiesCollection);
		this.isLoading=false;
		this.board=true;
	 }
	


	
	
	
	

  arrays: string;
  public submit()
  {
	
    var check:number = 0;
    if(getConnectionType() == connectionType.none)
    {
		 check=1;
              console.log("No connection");
			  alert("Internet is needed");
    }  
    else if (!this.credentials.username || !this.credentials.password) {
	  check=1;	
      alert("Please enter your credentials");
	} 
	else if( this.credentials.username != this.credentials.password)
	{
	  check=1;	
      alert("Please check the id and password");
	}
    else {
		    this.isLoading = true;
			var userid = this.credentials.username;
			var userpass = this.credentials.password;
			var splitid = this.loginid.split(",");
			for(var i = 0; i < splitid.length; i++)
			{
				if(userid.localeCompare(userpass) == 0 && userid.localeCompare(splitid[i]) == 0)
				{
					check = 1;
					console.log(userid+" "+userpass+" "+splitid[i]);
					this.truncateUserTable();
					this.insertUser(userid, userpass);
					const db = firebase.firestore.collection("csd")
					const database = db.doc(splitid[i]);
                     database.get({source:"server"}).then(doc => {
					   if(doc.exists)
					   {
				
                         var jsonfirebase = JSON.stringify(doc.data());
					    console.log("json stringify from doc :"+jsonfirebase);
                    
                       
					   JSON.parse(jsonfirebase,(key,value)=>{
						   /*if(key.localeCompare("semone") == 0)
						   {
							   this.loginobj.setSemOne(value);
							   console.log("login : "+this.loginobj.getSemOne());
								
						   }
						   if(key.localeCompare("semonecredits") == 0)
						   {
							   
							   this.loginobj.setSemCredits(value);
							   console.log(" credits -----------"+this.loginobj.getSemOneCredits());
						   }
						   if(key.localeCompare("syllabus") == 0)
				          {
							
							   console.log("hello world")
							   console.log(JSON.parse(value))
							   const filePath: string = path.join(knownFolders.currentApp().path,"tes.pdf");
							   this.loginobj.setSyllabusPath(filePath)
							   console.log("file has path :"+filePath)
							   console.log("value in syllabus:"+ Object.keys(value) );
							   
							   getFile(value,filePath).then((resultpath:File) => {
									 console.log("File : "+resultpath.path);

							   },(e) => {
                                      console.log("err file"+e);
							   }); 
						   }*/
						   if(key.localeCompare("timetable") == 0)
						   {
                               this.loginobj.setTimeTable(value);
						   }
						   if(key.localeCompare("regulation") == 0)
						   {
							const regulation = db.doc(value);   
							regulation.get({source:"server"}).then(doc => {
								if(doc.exists)
								{
								   var regfirebase = JSON.stringify(doc.data());
								   console.log("json stringify  :"+regfirebase);									
								   JSON.parse(regfirebase,(ke,valu)=>{
								   
									if(ke.localeCompare("syllabus") == 0)
									{
										var filename = "csd"+userid+".pdf";
										const filePath: string = path.join(knownFolders.currentApp().path,filename);
										if(File.exists(filePath) == true)
										{
										   console.log("file exists");	
										   this.loginobj.setSyllabusPath(filePath);
										   this.count = 0;
										}
										else
									    {
											console.log("file not exists");
                                            this.loginobj.setSyllabusPath(filePath)
										    File.exists(filePath)		
										    getFile(valu,filePath).then((resultpath:File) => {
											  console.log("---------------prasnath------------------------");
											  this.isLoading=false;  
									          this.router.navigate(['/home']);
										    },(e) => {
											   console.log("err file"+e);
									 	   });
										}
										
										 
									}
									if(ke.localeCompare("pdfpage") == 0)
									{
										console.log(ke)
										this.loginobj.setPdfPage(valu);
									}
									if(ke.localeCompare("semone") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemOne(valu);
									}   
									if(ke.localeCompare("semonecredits") == 0)
								    {
										console.log(ke)
									   this.loginobj.setSemOneCredits(valu);
									}   
									if(ke.localeCompare("semtwo") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemTwo(valu);
									}   
									if(ke.localeCompare("semtwocredits") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemTwoCredits(valu);
									}   
									if(ke.localeCompare("semthree") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemThree(valu);
									}   
									if(ke.localeCompare("semthreecredits") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemThreeCredits(valu);
									}   
									if(ke.localeCompare("semfour") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemFour(valu);
									}
									if(ke.localeCompare("semfourcredits") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemFourCredits(valu);
									}   
									if(ke.localeCompare("semfive") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemFive(valu);
									}   
									if(ke.localeCompare("semfivecredits") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemFiveCredits(valu);
									}
									if(ke.localeCompare("semsix") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemSix(valu);
									}   
									if(ke.localeCompare("semsixcredits") == 0)
									{
										console.log(ke)
									   this.loginobj.setSemSixCredits(valu);
									}
									 
									 
								   });
								   if(this.count == 0)
								   {
									this.isLoading=false;  
									this.router.navigate(['/home']);

									this.count=1;
								   }
							   }
					  
							   });
							   
						   }
						  
                           
					   });
                        }
					 });
					  
				} 
				
			}
			
		 }
		 if(check == 0)
		 {
				this.isLoading=false;
			   alert("User Not Found");
			   check = 1;
		 }
		 
  }       

  // SQL OPERATIONS
	public truncateUserTable() {
		// TRUNCATE PREVIOUS LOGGED IN USER DATA - REPLACE CURRENT USER
		this.database.execSQL("DELETE FROM student").then(id => {
			console.log("Truncated previous user data.");
		}, (error) => {
			console.log("CREATE TABLE ERROR", error);
		});
		// END OF TRUNCATE OPERATION
	}

  public insertUser(studentId, password) {
		this.database.execSQL("INSERT INTO student (studentId, password) VALUES (?, ?)", [studentId, password]).then(id => {
			console.log(id);
		}, (error) => {
			console.log("INSERT ERROR", error);
		});
	}

  public fetchUserData() {
		this.database.all("SELECT * FROM student").then(rows => {
			if (rows[0]) {
				this.credentials.username = rows[0][1];
				this.credentials.password = rows[0][2];
			}
		}, (error) => {
			console.log("SELECT ERROR", error);
		});
	}
  
}