import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterModule],
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {

}
