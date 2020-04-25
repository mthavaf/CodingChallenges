import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { GameDetail } from '../models/game-detail.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gamesData: GameDetail[];
  displayedColumns: string[] = ['title', 'platform', 'score', 'genre', 'editorsChoice', 'releaseYear', 'url'];
  dataSource: MatTableDataSource<GameDetail>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private ds: DashboardService) { }

  ngOnInit(): void {
    this.ds.getGameDeatils().subscribe((res: GameDetail[]) => {
      this.gamesData = res;
      this.dataSource = new MatTableDataSource(this.gamesData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(`Error retieving data : ${err.status}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
