import {InjectionToken} from "@angular/core";

import {LocalStorageInterface} from "../types/localStorage.interface";
import {LocalStorageService} from "./localStorage.service";


export const LOCAL_STORAGE_TOKEN = new InjectionToken<LocalStorageInterface>("Password", {
  factory: () => new LocalStorageService()
})
