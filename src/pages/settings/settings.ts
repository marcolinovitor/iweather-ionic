import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string;
  state: string;

  cidades = [];
  estados = [];
  todosDados = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private getDados: WeatherProvider,
    private storage: Storage 
  ) {
    this.storage.get('location').then((value) => {
      if (value != null) {
        let location = JSON.parse(value);
        this.city = location.city;
        this.state = location.state;
      } else {
        this.city = 'Selecione a cidade',
        this.state = 'Selecione o estado'
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.getDados.getEstadoCidades().subscribe(dados => {
      let estados = dados['estados'].map(res => res.sigla);
      let todosDados = dados['estados'];
      this.estados = estados;
      this.todosDados = todosDados;
    });
    this.cidades = [];
  }

  getCidades(valor) {
    for (let i = 0; i < this.estados.length; i++) {
      if (valor == this.todosDados[i].sigla) {
        console.log(this.todosDados[i]);
        this.cidades = this.todosDados[i].cidades;
      }
    }
  }

  saveChange() {
    let location = {
      city: this.city,
      state: this.state
    }
    this.storage.set('location', JSON.stringify(location));
    this.navCtrl.push(HomePage);
    
  }

  // getTodosElementos() {
  //   this.getDados.getEstadoCidades().subscribe(res => {
  //     let tudo = res['estados'];
  //     this.todosDados = tudo;
  //   })
  // }

}
