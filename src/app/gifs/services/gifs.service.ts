import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'S6SFoBtCYec5k4pRbTLc8HakiOHr6MMe'
  private _historial: string[] = [];
  private servicioURl: string = 'https://api.giphy.com/v1/gifs';

  public resultado: Gif[] = [];
  
  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultado = JSON.parse(localStorage.getItem('resultadoIMG')!) || [];
  }

  buscarGifs( query: string ){

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial));

    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '50')
          .set('q', query )

    this.http.get<SearchGifsResponse>(`${this.servicioURl}/search`, { params })
    .subscribe( ( resp ) => {
      this.resultado = resp.data;

      localStorage.setItem('resultadoIMG', JSON.stringify(this.resultado));
    } )

  }
}
