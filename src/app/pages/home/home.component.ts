// tslint:disable: max-line-length
import { ImageCard } from './../../shared/components/image-card/image-card.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  topDestinations: ImageCard[] = [
    { title: 'Spanien', img: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80', link: '' },
    { title: 'Kroatien', img: 'https://images.unsplash.com/photo-1414862625453-d87604a607e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80', link: '' },
    { title: 'Island', img: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', link: '' }
  ];

  propertyTypes: ImageCard[] = [
    { title: 'Ferienwohnung', img: 'https://images.unsplash.com/photo-1558882224-dda166733046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80', link: '' },
    { title: 'Villa', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', link: '' },
    { title: 'Ferienhaus', img: 'https://images.unsplash.com/photo-1540393941896-255c66854aaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', link: '' }
  ];
}
