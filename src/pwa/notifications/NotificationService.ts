export class NotificationService {
  static async show(title:string, body:string){
    if(Notification.permission!=='granted') return;
    new Notification(title,{ body });
  }
}
