import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, signal } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-testsorting',
  templateUrl: './testsorting.component.html',
  styleUrl: './testsorting.component.css'
})
export class TestsortingComponent implements AfterViewInit {
  readonly panelOpenState = signal(false);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  users!: User[];
  dataSource= ELEMENT_DATA
  size: number;
  pageIndex: number;
  totalElements: number;
  isActive = false;

  constructor(private _liveAnnouncer: LiveAnnouncer, private userService: UserService) {
    this.size = 10;
    this.pageIndex = 0;
    this.userService.getUsers(this.size, this.pageIndex).subscribe(({content, page}) => {
      this.pageIndex = page.number;
      this.size = page.size;
      this.totalElements = page.totalElements
      this.users = content;

    });
   }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {

  }
}
