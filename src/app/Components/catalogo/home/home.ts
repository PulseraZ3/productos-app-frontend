import { Component } from '@angular/core';
import { Carrusel } from "../../carrusel/carrusel";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Carrusel, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
