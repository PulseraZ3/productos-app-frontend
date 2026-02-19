import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Navbar } from "../../../Components/catalogo/navbar/navbar";

@Component({
  selector: 'app-catalogo-layout',
  imports: [RouterModule, Navbar],
  templateUrl: './catalogo-layout.html',
  styleUrl: './catalogo-layout.css'
})
export class CatalogoLayout {

}
