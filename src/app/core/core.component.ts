import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.menu-item a').click(function(){
      $(this).addClass('active').siblings().removeClass('active');
      });
  }

}
