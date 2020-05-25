import { Component, OnInit } from '@angular/core';
import {Page} from "tns-core-modules/ui/page"
import * as application from "tns-core-modules/application";
import {ActivatedRoute} from "@angular/router";
import {LoginService } from "../shared/login.service";
import {orientationCleanup} from "nativescript-screen-orientation";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";

@Component({
  selector: 'web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css'],
  moduleId: module.id,
})
export class WebComponent {
  public webViewSrc: string;
  labelicon;
  webname;
  public linkno;
  drawname;
  drawicon;
  loadpage = true;
  constructor(private page:Page,private route: ActivatedRoute,private loginobj : LoginService){
    
    orientationCleanup();
    application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
      args.cancel = true;});
      this.route.queryParams.subscribe(params => {
        this.linkno = params["linkno"];
        this.drawname = params["drawname"];
        this.drawicon = params["drawicon"];
        this.webViewSrc = params["website"];

        this.labelicon= this.drawicon;
        this.webname=this.drawname;
         
    });
    }
    
    ngOnInit(){
          
    }

    onLoadStarted(args: LoadEventData){
     
     const webView = args.object as WebView;

     if (!args.error) {
         
         console.log("Load Start");
         console.log(`EventName: ${args.eventName}`);
         console.log(`NavigationType: ${args.navigationType}`);
         console.log(`Url: ${args.url}`);
     } else {
         console.log(`EventName: ${args.eventName}`);
         console.log(`Error: ${args.error}`);
     }
    }
    onLoadFinished(args: LoadEventData){
      this.loadpage=false;
      const webView = args.object as WebView;

        if (!args.error) {
            console.log("Load Finished");
            console.log(`EventName: ${args.eventName}`);
            console.log(`NavigationType: ${args.navigationType}`);
            console.log(`Url: ${args.url}`);
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

}
