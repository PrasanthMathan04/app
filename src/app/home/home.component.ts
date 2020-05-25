import { Component, OnInit } from "@angular/core";
import { Label } from "tns-core-modules/ui/label"
import { ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer} from 'nativescript-ui-sidedrawer';
import * as Toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { PDFViewNg } from 'nativescript-pdfview-ng';
import { registerElement } from 'nativescript-angular';
import {setCurrentOrientation , orientationCleanup} from 'nativescript-screen-orientation';
import { Router ,NavigationExtras} from "@angular/router";
import { LoginService } from "../shared/login.service";
import * as application from "tns-core-modules/application";
import { Input } from '@angular/core';
import { ParseError } from "@angular/compiler";
import { ControlContainer } from "@angular/forms";
import { TitleCasePipe } from "@angular/common";
registerElement('PDFViewNg', () => PDFViewNg);
registerElement('ImageZoom', () => require('nativescript-image-zoom').ImageZoom); 


let semprefered = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6'];


let semOne :any = new Array();
let semonecredits:any = new Array();
let semTwo :any = new Array();
let semtwocredits:any = new Array();
let semThree : any = new Array();
let semthreecredits:any = new Array();
let semFour : any = new Array();
let semfourcredits : any = new Array();
let semFive : any = new Array();
let semfivecredits : any = new Array();
let semSix : any = new Array();
let semsixcredits: any = new Array();
let pdfpage : any = new Array();
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit, OnInit {

    
    private _mainContentText: string;
    name: string = "";
    count: number = 0;
    src;
    reg:any=/^(?:[0-9]|10)$/;
    regcgpa:any=/^(?:([0-9]|10{1})(|[.][0-9]{1,2}))$/;
    view: PDFViewNg;
    selected_sem: string;
    userentercgpa = new Array();
    totalcgpa: number = 0;
    totalgpa: number =0;
    displaycgpa: number;
    displaygpa: number;
    add = new Array();
    semOptions = new Array();
    list_of_subjects = new Array();
    entercgpa = new Array();
    entergpa = new Array();
    i:number;
    j;
    k:number;
    countvalid:number;
    total: number = 0;
    timetable;
    syllabus;
    drawicon = new Array();
    drawname = new Array();
    website = new Array();

    constructor(private _changeDetectionRef: ChangeDetectorRef, private page: Page,private router : Router,private loginobj : LoginService) {
        console.log("---------i am Home component constructor");
        this.syllabus = loginobj.getSyllabusPath();
        console.log("--------Sylabus : "+this.syllabus); 
        page.on("navigatedTo",function(){
            setCurrentOrientation("portrait",function(){
            console.log("portrait orientation");
            });
            application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
                args.cancel = true;});  
         });
         
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }


    ngOnInit() {
        console.log("it is ng on init in home");
        semOne = this.loginobj.getSemOne();
        semTwo = this.loginobj.getSemTwo();
        semThree = this.loginobj.getSemThree();
        semFour = this.loginobj.getSemFour();
        semFive = this.loginobj.getSemFive();
        semSix = this.loginobj.getSemSix();
        semonecredits = this.loginobj.getSemOneCredits();
        semtwocredits = this.loginobj.getSemTwoCredits();
        semthreecredits = this.loginobj.getSemThreeCredits();
        semfourcredits = this.loginobj.getSemFourCredits();
        semfivecredits = this.loginobj.getSemFiveCredits();
        semsixcredits = this.loginobj.getSemSixCredits();
        pdfpage = this.loginobj.getPdfPage();  
            
            
        semprefered.forEach(element => {
            this.semOptions.push(element);
            console.log("semOption for pust");
        });
        this.displaycgpa=0;
        this.selected_sem = "Semester 1";
       //semOne.forEach(element => {
        //    console.log(element);
        //    this.list_of_subjects.push(element);
        //});
        var a = this.loginobj.getSemOne();
        var splitsem = a.split(",");
        console.log(splitsem);
        for(var i =0 ; i< splitsem.length ; i++)
        {
            this.list_of_subjects.push(splitsem[i]);
        }
        // var b= this.loginobj.getSemOneCredits()
        // var splitsem = b.split(",")
        // for(var i=0;i<splitsem.length;i++)
        // {
        //     semonecredits.push(splitsem[i])
        // }
        var b = this.loginobj.getDrawName();
        var c = this.loginobj.getDrawIcon();
        var d = this.loginobj.getWeb();
        var splitdraw = b.split(",");
        var spliticon = c.split(",");
        var splitweb = d.split(",");
        for(var i=0;i<splitdraw.length;i++ )
        {
            this.drawname.push(splitdraw[i]);
            this.drawicon.push(String.fromCharCode(parseInt(spliticon[i],16)));
            this.website.push(splitweb[i]);
        }
        this.timetable= this.loginobj.getTimeTable();
    
        this.displaygpa=0;
        
    }

   

    get mainContentText() {
        return this._mainContentText;

    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }


    pdfChange(args) {
        var pdf = pdfpage.split(",");
        let view: PDFViewNg = this.page.getViewById('pdfview');
        console.log("in function");
        console.log(args);
        if (view) {
            console.log("inside if");
            switch (args) {
                case '1': view.goToPage(parseInt(pdf[0]));
                    this.toastFunction("Semester 1");
                    break;
                case '2': view.goToPage(parseInt(pdf[1]));
                    this.toastFunction("Semester 2");
                    break;
                case '3': view.goToPage(parseInt(pdf[2]));
                    this.toastFunction("Semester 3");
                    break;
                case '4': view.goToPage(parseInt(pdf[3]));
                    this.toastFunction("Semester 4");
                    break;
                case '5': view.goToPage(parseInt(pdf[4]));
                    this.toastFunction("Semester 5");
                    break;
                case '6': view.goToPage(parseInt(pdf[5]));
                    this.toastFunction("Semester 6");
                    break;
                case 'elective': view.goToPage(parseInt(pdf[6]));
                    this.toastFunction("ELECTIVE");
                    break;
            }
        }
    }
    toastFunction(args) {
        Toast.makeText(args).show();
    }

    listOfSubjects(args) {
        switch (args) {
            case '1': this.selected_sem = "Semester 1";
                      this.list_of_subjects = [];
                      this.entergpa = [];
                      var splitsem = semOne.split(",");
                      for(var i =0 ; i< splitsem.length ; i++)
                         this.list_of_subjects.push(splitsem[i]);
                      this.displaygpa=0;
                      this.toastFunction("Semester 1");
                      break;
            case '2': this.selected_sem = "Semester 2";
                      this.list_of_subjects = [];
                      this.entergpa = [];
                      var splitsem = semTwo.split(",");
                      for(var i =0 ; i< splitsem.length ; i++)
                         this.list_of_subjects.push(splitsem[i]);
                      this.displaygpa=0;
                      this.toastFunction("Semester 2");
                      break;
            case '3': this.selected_sem = "Semester 3";
                      this.list_of_subjects = [];
                      this.entergpa = [];
                      var splitsem = semThree.split(",");
                      for(var i =0 ; i< splitsem.length ; i++)
                         this.list_of_subjects.push(splitsem[i]);
                      this.displaygpa=0;
                      this.toastFunction("Semester 3");
                      break;
            case '4': this.selected_sem = "Semester 4";
                      this.list_of_subjects = [];
                      this.entergpa = [];
                      var splitsem = semFour.split(",");
                      for(var i =0 ; i< splitsem.length ; i++)
                         this.list_of_subjects.push(splitsem[i]);
                      this.displaygpa=0;
                      this.toastFunction("Semester 4");
                      break;
            case '5': this.selected_sem = "Semester 5";
                      this.list_of_subjects = [];
                      this.entergpa = [];
                      var splitsem = semFive.split(",");
                      for(var i =0 ; i< splitsem.length ; i++)
                         this.list_of_subjects.push(splitsem[i]);
                      this.displaygpa=0;
                      this.toastFunction("Semester 5");
                      break;
            case '6': this.selected_sem = "Semester 6";
                      this.list_of_subjects = [];
                      this.entergpa = [];
                      var splitsem = semSix.split(",");
                      for(var i =0 ; i< splitsem.length ; i++)
                         this.list_of_subjects.push(splitsem[i]);
                      this.displaygpa=0;
                      this.toastFunction("Semester 6");
                      break;
        }
    }

    public openDrawer(label: Label) {
        if (this.count == 0) {
            this.drawer.showDrawer();
            this.count = 1;
        }
        else {
            this.drawer.closeDrawer();
            this.count = 0;
        }
    }

    getValue(args) {
        console.log("user value" + args);
    }

    calculateCgpa() {
        this.totalcgpa = 0;
        this.count=0;
        console.log("calculate");
        for (this.i = 0; this.i < 6; this.i++) {
            console.log(this.entercgpa[this.i]);
            if (this.entercgpa[this.i] == 0.0 || this.entercgpa[this.i] == 0.00) {
                this.userentercgpa[this.i] = 0;
                console.log("set to undefined" +this.entercgpa[this.i]);
            }
            else {
                this.userentercgpa[this.i] = this.entercgpa[this.i];
                this.count++
            }
        }
        for (this.i = 0; this.i < 6; this.i++) {
            this.totalcgpa = this.totalcgpa + parseFloat(this.userentercgpa[this.i]);
        }
        console.log("total : "+this.totalcgpa);
        console.log("count : "+this.count);
        this.totalcgpa = this.totalcgpa / this.count;
        console.log("final:"+this.totalcgpa);
        this.displaycgpa = parseFloat(this.totalcgpa.toFixed(3));

    }


    addArray(arg)
    {
        console.log("argument : "+arg);
        var sum = 0;
        for(var i=0;i<arg.length;i++)
        {
           sum = sum + parseInt(arg[i]);
        }
        console.log("summ in add array :"+sum)
        return sum;
    }
    calculateGpa(args) {
        /*this.total=0;
        console.log("caltry : "+args);
        for(this.i=0;this.i<=7;this.i++){
           this.add[this.i]=this.entertry[this.i];
        }
        for(this.i=0;this.i<=7;this.i++){
            this.total=this.total+parseInt(this.add[this.i]);
         }
         console.log("total:"+this.total);*/
        this.totalgpa = 0;
        this.add = [];
        switch (args) {
            case 'Semester 1': for (this.i = 0; this.i <= 7; this.i++)
                                 this.add[this.i] = this.entergpa[this.i];
                               var splitcredits = semonecredits.split(",");  
                               for (this.i = 0; this.i <= 7; this.i++)
                                 this.totalgpa = this.totalgpa + (this.add[this.i] * parseInt(splitcredits[this.i]));
                               console.log("parse int in credits :"+this.totalgpa)  
                               this.totalgpa = this.totalgpa / this.addArray(splitcredits);
                               this.displaygpa = parseFloat(this.totalgpa.toFixed(2));
                               break;
            case 'Semester 2': for (this.i = 0; this.i <= 7; this.i++)
                                 this.add[this.i] = this.entergpa[this.i];
                               var splitcredits = semtwocredits.split(","); 
                               for (this.i = 0; this.i <= 7; this.i++) 
                                  this.totalgpa = this.totalgpa + (this.add[this.i] * parseInt(splitcredits[this.i]));
                                this.totalgpa = this.totalgpa / this.addArray(splitcredits);
                                this.displaygpa = parseFloat(this.totalgpa.toFixed(2));
                                break;
            case 'Semester 3':  for (this.i = 0; this.i <= 7; this.i++)
                                   this.add[this.i] = this.entergpa[this.i];
                                var splitcredits = semthreecredits.split(",");   
                                for (this.i = 0; this.i <= 7; this.i++)
                                   this.totalgpa = this.totalgpa + (this.add[this.i] * parseInt(splitcredits[this.i]));
                                this.totalgpa = this.totalgpa / this.addArray(splitcredits);
                                this.displaygpa = parseFloat(this.totalgpa.toFixed(2));
                                break;
            case 'Semester 4':  for (this.i = 0; this.i <= 7; this.i++)
                                 this.add[this.i] = this.entergpa[this.i];
                                var splitcredits = semfourcredits.split(","); 
                                for (this.i = 0; this.i <= 7; this.i++) 
                                  this.totalgpa = this.totalgpa + (this.add[this.i] * parseInt(splitcredits[this.i]));
                                this.totalgpa = this.totalgpa / this.addArray(splitcredits);
                                this.displaygpa = parseFloat(this.totalgpa.toFixed(2));
                                break;
            case 'Semester 5':  for (this.i = 0; this.i <= 7; this.i++)
                                 this.add[this.i] = this.entergpa[this.i];
                                var splitcredits = semfivecredits.split(",");
                                for (this.i = 0; this.i <= 7; this.i++)
                                 this.totalgpa = this.totalgpa + (this.add[this.i] * parseInt(splitcredits[this.i]));
                                this.totalgpa = this.totalgpa / this.addArray(splitcredits);
                                this.displaygpa = parseFloat(this.totalgpa.toFixed(2));
                                break;
            case 'Semester 6':  for (this.i = 0; this.i <= 7; this.i++)
                                 this.add[this.i] = this.entergpa[this.i];
                                var splitcredits = semsixcredits.split(","); 
                                for (this.i = 0; this.i <= 4; this.i++) 
                                  this.totalgpa = this.totalgpa + (this.add[this.i] * parseInt(splitcredits[this.i]));
                                this.totalgpa = this.totalgpa / this.addArray(splitcredits);
                                this.displaygpa = parseFloat(this.totalgpa.toFixed(2));
                                break;

        }
    }
    validation()
    {
            
            var entrycount=0;
            this.countvalid=0;
            var l;
            if(this.entercgpa[0] == null )
            {
                console.log("Empty : "+this.i+1);
                dialogs.alert("Fill Semester 1");
                return;
            }
            else
            {
                for(this.i=0;this.i<6;this.i++){
                    if(this.entercgpa[this.i] == null || this.entercgpa[this.i] == ""){
                        dialogs.alert("Fill Empty Entries With 0");
                        return;
                    }
                }
                for(this.i=0;this.i<6;this.i++){
                       if(this.entercgpa[this.i].match(this.regcgpa)){
                          console.log("valid:"+this.entercgpa[this.i]);
                         console.log("entrycount :"+entrycount);
                        }
                       else{
                        dialogs.alert("Invalid input");
                        return;
                       }    
                    }
                    this.calculateCgpa();
            }
                    /*console.log("in else  ");
                    for(this.j = 1;this.j <= 2;this.j++){
                    this.k=parseInt(this.j)+1;
                    console.log("in for");
                    if(this.entercgpa[this.j] != null || this.entercgpa[this.j] != "" && this.entercgpa[this.k] == null || this.entercgpa[this.k] == "") 
                    {
                        console.log("k :"+this.k);
                        console.log("k+:"+this.k+1);
                        l=this.k+1;
                        console.log(" l :"+l);
                        if(this.entercgpa[l] == null || this.entercgpa[l] == "" )
                        {
                            console.log("in if");
                            dialogs.alert("Continuity Missing");
                            return;  
                        }     
                    }
                }*/
           }
                 /*console.log("count : "+this.countvalid);
                 if(this.countvalid == 4){
                     console.log("passed");
                     for(this.i=0;this.i<6;this.i++){
                         if(this.entercgpa[this.i] == null || this.entercgpa[this.i] == ''){
                             entrycount++;
                         }
                    }
                    for(this.i=0;this.i<1;this.i++){
                        if(this.entercgpa[this.i].match(this.regcgpa)){
                          console.log("valid:"+this.entercgpa[this.i]);
                          console.log("entrycount :"+entrycount);}
                        else{
                            dialogs.alert("Invalid input");
                            return;
                        }  
                    }
                     this.calculateCgpa();*/
        

    

    validationGpa(args){
        var gpacount:number;
        if (args == 'Semester 6')
          gpacount=5;
        else
          gpacount=8; 
       for(this.i=0;this.i<gpacount;this.i++){
           if(this.entergpa[this.i] == null || this.entergpa[this.i] == ''){
               dialogs.alert("Fill The Entry");
               this.displaygpa=0;
               return;
           }
        }
        for(this.i=0;this.i<gpacount;this.i++)
        {
              if(this.entergpa[this.i].match(this.reg))
                console.log("valid : "+this.entergpa[this.i]);
              else{
                  dialogs.alert("Input should be 1 to 10");
                  return;
              }  
       }
        this.calculateGpa(args);
    }
    
    public changePage(args)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "linkno": args,
          "drawname" : this.drawname[args],
          "drawicon" : this.drawicon[args],
          "website" : this.website[args]
      }
  };
    this.router.navigate(['/web'],navigationExtras);
    
  }

  
     
}





