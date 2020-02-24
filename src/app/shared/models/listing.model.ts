import { Availability } from './availability.model';
import { Amenity } from './amenity.model';
import { PremiumBadge } from './premiumBadge.model';
import { PricePeriod } from './priceperiod.model';
import { PropertyType } from './propertyType.model';

export interface Listing {
    idlisting: number;
    sleeps: number;
    bedrooms: number;
    bathrooms: number;
    petsAllowed: boolean;
    detailPageUrl: string;
    spaceArea: number;
    price: number;
    averageRating: number;
    reviewCount: number;
    headline: string;
    summary: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    propertyType: PropertyType;
    pricePeriod: PricePeriod;
    PremiumBadge: PremiumBadge;
    amenities: Amenity[];
    availability: Availability;
}