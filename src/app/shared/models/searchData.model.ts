import { Moment } from 'moment';

export interface SearchData {
    destination?: SearchDataDestination;
    date: SearchDataDate;
    guests: SearchDataGuests;
    bounds?: SearchDataBounds;
}

export interface SearchDataBounds {
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
}

export interface SearchDataDate {
    start: Moment;
    end: Moment;
}

export interface SearchDataGuests {
    total: number;
    adult: number;
    kid: number;
}

export interface SearchDataDestination {
    name: string;
    lat: number;
    lng: number;
}
