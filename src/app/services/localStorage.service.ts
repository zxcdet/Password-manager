import {Injectable} from "@angular/core";

import {LocalStorageInterface} from "../types/localStorage.interface";


@Injectable()
export class LocalStorageService implements LocalStorageInterface{

  public getContacts(key: string) {
    return localStorage.getItem(key)
  }

  public setContacts(key: string, value: string) {
    localStorage.setItem(key , value)
  }
}
