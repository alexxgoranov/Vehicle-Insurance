import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-loader',
  templateUrl: './app-card-loader.component.html',
  styleUrls: ['./app-card-loader.component.scss']
})
export class AppCardLoaderComponent implements OnInit {

  @Input() show: boolean;
  constructor() { }

  ngOnInit(): void {
  }


}
