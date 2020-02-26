export interface SearchData {
    destination: SearchDataDestination;
    start: Date;
    end: Date;
    guests: number;
}

export interface SearchDataDestination {
    name: string;
    lat: number;
    lng: number;
}
