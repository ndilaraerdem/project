import { Bilgiler } from "./models/IUser";

export class Util  {

    user: Bilgiler ={
        userId: '',
        userName: '',
        userSurname: '',
        userEmail: '',
        userPhone: '',
        face: '',
        faceID: ''
      }
      
     getUserData():Bilgiler {
        const stringUser = sessionStorage.getItem('user')
        this.user = JSON.parse(stringUser!)
        return this.user;
}


}


