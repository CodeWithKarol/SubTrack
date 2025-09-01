import { Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, CurrencyPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  totalCost = input.required<number>();
}
