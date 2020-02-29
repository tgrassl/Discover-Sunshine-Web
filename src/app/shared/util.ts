import { Listing } from './models/listing.model';

export const isMobile = window.matchMedia('(max-width: 767px)').matches;

export const getRating = (listing: Listing): string[] => {
    const stars = [];

    if (listing) {
        const starsFull = Math.floor(listing.averageRating);
        const starsRemaining = listing.averageRating - starsFull;
        for (let i = 0; i < starsFull; i++) {
            stars.push('star');
        }

        if (starsRemaining >= 0.5) {
            stars.push('star_half');
        }
    }

    return stars;
};
