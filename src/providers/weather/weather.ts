import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {

  apiKey = '8ffb577f08e9e8bc991842f3732796fd';
  url = `http://apiadvisor.climatempo.com.br/api/v1/weather/locale/3477/current?token=${this.apiKey}`;

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
  }

  takeId(cidade, estado) {
    return this.http.get(`http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${cidade}&state=${estado}&token=${this.apiKey}`)
      .map(res => res.json());
  }

  takeCurrentForecast(id) {
    return this.http.get(`http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${id}/current?token=${this.apiKey}`)
      .map(res => res.json());
  }

  getEstadoCidades() {
    return this.http.get('../assets/dados/estados-cidades.json').map(res => res.json());
  }

}
