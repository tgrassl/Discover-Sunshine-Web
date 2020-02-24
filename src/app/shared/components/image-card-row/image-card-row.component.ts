import { Component, Input } from '@angular/core';
import { ImageCard } from './../image-card/image-card.component';

@Component({
  selector: 'app-image-card-row',
  templateUrl: './image-card-row.component.html',
  styleUrls: ['./image-card-row.component.scss']
})
export class ImageCardRowComponent {

  @Input() cards: ImageCard[];
  @Input() title: string;

  constructor() { }
}
