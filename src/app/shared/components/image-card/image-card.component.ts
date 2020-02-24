import { Component, OnInit, Input } from '@angular/core';

export interface ImageCard {
  title: string;
  img: string;
  link: string;
}

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent{

  @Input() cardContent: ImageCard;
}
