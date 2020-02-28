import { User } from './user.model';
export interface Note {
    id?: number;
    content: string;
    created: Date;
    title: string;
    user?: User;
}