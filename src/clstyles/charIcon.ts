
export interface CharIcon {
    race: string;
    gender: string;
    armed: boolean;
    variant?: string;

    pixelData: Uint8ClampedArray;
    cellWidth: number;
    cellHeight: number;
}

// TODO: This should be elsewhere
const icons: Array<CharIcon> = [
    {
        race: 'Ghorak Zo',
        gender: 'male',
        armed: true,
        pixelData: new Uint8ClampedArray(16 * 42 * 3 * 42),
        cellWidth: 42,
        cellHeight: 42,
    }
];