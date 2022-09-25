import Cookies from 'universal-cookie';

class Stores {
  constructor() {
    this.cookies = new Cookies();
    this.language = this.cookies.get('language') || 'en';
  }
}

export const stores = new Stores();

export default {
  cookies: stores.cookies,
  language: stores.language,
}