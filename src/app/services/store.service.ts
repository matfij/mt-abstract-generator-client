import { Injectable } from '@angular/core';

export const AUTH_KEY = 'mtagc-auth-key';
export const GENERATE_ABSTRACT_PARAMS = 'mtagc-generate-abstract-params';
export const ABSTRACT_MODEL = 'mtagc-abstract-model';
export const POLL_PARAMS = 'mtagc-poll-params';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {}

  getSimpleItem(key: string) {
    return localStorage.getItem(key)
  }

  setSimpleItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  getItem(key: string) {
    let item = localStorage.getItem(key);
    return JSON.parse(item);
  }

  setItem(key: string, value: any) {
    value = JSON.stringify(value);
    return localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
