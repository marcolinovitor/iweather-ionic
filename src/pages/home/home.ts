import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { DadosClima } from '../../app/models/dados.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location: {
    city: string,
    state: string
  }

  img: string = '../assets/imgs/icons/';
  weather: any;

  constructor(
    public navCtrl: NavController,
    private weatherService: WeatherProvider,
    private storage: Storage
  ) {

  }

  ionViewWillEnter() {
    this.storage.get('location').then((value) => {
      // console.log(value);
      if (value != null) {
        this.location = JSON.parse(value);
      } else {
        this.location = {
          city: 'Ribeirão Claro',
          state: 'PR'
        }
      }

      this.weatherService.takeId(this.location.city, this.location.state).subscribe(
        res => {
          const id = res[0].id;
          this.weatherService.takeCurrentForecast(id).subscribe(result => {
            this.weather = result['data'];
            this.getImg(id);
          });
        },
        error => {
          console.log(error.message);
        }
      )
    });
  }

  getImg(id) {
    this.weatherService.takeCurrentForecast(id).subscribe(res => {
      let img = res['data'].condition;
      console.log(img)

      if (img == 'Muitas nuvens' || img == 'Céu encoberto') {
        this.img += 'cloudy.png';
      } else if (img == 'Poucas nuvens' || img == 'Alguma nebulosidade') {
        this.img += 'fair.png';
      } else if (img == 'Pancada de chuva') {
        this.img += 'fair-drizzle.png';
      } else if (img == 'Chuva') {
        this.img += 'rainy.png';
      }
    });
  }


}
