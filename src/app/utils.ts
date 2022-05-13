import { Bilgiler } from "./models/IUser";
import * as crypto from 'crypto-js';
import { environment } from "src/environments/environment";

export const getUser = () => {
    const stringUser = sessionStorage.getItem('user')
    if (stringUser) {
        try {
            const userData: Bilgiler = JSON.parse(decrypt(stringUser));
            return userData;
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
}
export const dateConvert = (stDate: string) => {

    let stReturn = ''
    const date = new Date( stDate )

    stReturn += date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
    stReturn += ":"+ (date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes());
    stReturn += ":"+(date.getHours() < 10 ? "0"+date.getHours() : date.getHours() );
    stReturn += " ";
    
    stReturn += date.getDate() < 10 ? "0"+date.getDate() : date.getDate()  // ayın kaçıncı günü
    stReturn += "-"+( (date.getMonth() + 1) < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1)) // kaçında ay
    stReturn += "-"+date.getFullYear() // yıl

    if ( stReturn.includes("NaN") ) {
        return stDate;
    }

    return stReturn;
}
export const encrypt = (plainText: string) => {
    var ciphertext = crypto.AES.encrypt(plainText, environment.privateKey).toString();
    return ciphertext;
}
export const decrypt = (ciphertext: string) => {
    var bytes = crypto.AES.decrypt(ciphertext, environment.privateKey);
    var plainText = bytes.toString(crypto.enc.Utf8);
    return plainText;
}
export const rememberControl = () =>{
    //local storage'a bak
    const stringUser = localStorage.getItem('user')
    if (stringUser) {
        sessionStorage.setItem('user', stringUser)
        return true;
    } else {
        return false;
    }    
}