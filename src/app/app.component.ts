import { Component } from "@angular/core";
import { connectionType, getConnectionType, startMonitoring, stopMonitoring }from "tns-core-modules/connectivity";
import * as firebase from "nativescript-plugin-firebase";
import { LoginService } from "./shared/login.service";
@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {


    constructor(){
      firebase.init({
        // Optionally pass in properties for database, authentication and cloud messaging,
        // see their respective docs.
        showNotifications: true,
      showNotificationsWhenInForeground: true,

      onPushTokenReceivedCallback: (token) => {
        console.log('[Firebase] onPushTokenReceivedCallback:', { token });
      },

      onMessageReceivedCallback: (message: firebase.Message) => {
        console.log('[Firebase] onMessageReceivedCallback:', { message });
      }
        }).then(
        () => {
             
        },
        error => {
          console.log("firebase.init error:"+error);
          
        }
        );
		  
		}
	
            
    }
   
    
		
  

 
