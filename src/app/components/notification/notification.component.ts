import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/appstate';
import { notificationSelector } from '../../selectors/movies.selectors';
import { toggleNotification } from 'src/app/actions/movies.actions';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  classList:string | null = 'movie-reviewer-notification movie-reviewer-notification-invisible movie-reviewer-notification-success'
  content: string | undefined;
  iconClass: string | undefined;
  iconLink: string | undefined;
  timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private store: Store<AppState>) {
     this.store.select(notificationSelector).subscribe(state => {
         let {notification: {visible, content, type}} = state;
         this.content = content;
         if(visible){
           if(this.timeout) clearTimeout(this.timeout)

           switch(type){
              case 'error':
                this.iconClass = "slds-icon_container slds-icon-standard-first_non_empty";
                this.iconLink = "first_non_empty";
                break;
            case 'warning':
                this.iconClass = "slds-icon_container slds-icon-standard-campaign";
                this.iconLink = "campaign";
                break;
            case 'success':
                this.iconClass = "slds-icon_container slds-icon-standard-task2";
                this.iconLink = "task2";
                break;
            default: 
                this.iconClass = "slds-icon_container slds-icon-standard-task2";
                this.iconLink = "task2";
                break;
          }
          this.classList = `movie-reviewer-notification movie-reviewer-notification-visible movie-reviewer-notification-${type}`
          this.timeout = setTimeout(() => this.closeNotification(), 3000)

         } else{
           this.classList = 'movie-reviewer-notification movie-reviewer-notification-invisible movie-reviewer-notification-success'
         }
     })
   }


   closeNotification(){
      this.store.dispatch(toggleNotification({notification: {visible: false, type: 'success', content: ''}}))
   }

  ngOnInit(): void {}

}
