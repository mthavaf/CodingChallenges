import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/';
import { Observable } from 'rxjs';
import { GameDetail } from '../models/game-detail.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  gamesUrl = 'http://starlord.hackerearth.com/gamesext';

  constructor(private http: HttpClient) { }

  getGameDeatils(): Observable<GameDetail[]> {
    return this.http.get(this.gamesUrl).pipe<GameDetail[]>(
      map((data: any[]) => data.map(item => {
        return {
          title: item.title,
          url: item.url,
          platform: item.platform,
          score: item.score,
          genre: item.genre,
          editorsChoice: item.editors_choice,
          releaseYear: item.release_year,
        };
      }))
    );
  }
}
