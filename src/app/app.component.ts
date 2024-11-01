import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ClarityIcons, usersIcon, bookIcon, bookmarkIcon } from '@cds/core/icon';

ClarityIcons.addIcons(usersIcon, bookIcon, bookmarkIcon)

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ClarityModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'libreborr';
}
