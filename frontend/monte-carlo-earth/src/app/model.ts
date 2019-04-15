export interface SummaryViewModel {
    waterCount: number;
    allCount: number;
}

export interface PointViewModel {
    latitude: number;
    longitude: number;
    isWater: boolean;
}

export interface Point {
    latitude: number;
    longitude: number;
    isOnWater: boolean;
    location: string;
}
