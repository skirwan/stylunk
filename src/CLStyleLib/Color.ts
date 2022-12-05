import { Palette } from "./Palette";

export type ColorNum = 0 | 1 | 2 | 3 | 4 | 5;

export function adjust(base: ColorNum, delta: 1 | -1): ColorNum {
    return Math.min(5, Math.max(0, base + delta)) as ColorNum;
}

export interface Color {
    get paletteIndex(): number;
}

export class StyleColor implements Color {
    constructor(
        readonly r: ColorNum,
        readonly g: ColorNum,
        readonly b: ColorNum,
    ) { }

    get paletteIndex(): number {
        if ( this.r === 0 && this.g === 0 && this.b === 0 ) { return 255; }
        
        return ((5 - this.r) * 6 + (5 - this.g)) * 6 + (5 - this.b);
    }

    toString(): string {
        return `${this.r}${this.g}${this.b}`;
    }
}

export type ColorComponent = ('r' | 'g' | 'b') & keyof StyleColor;
export const Components: Array<ColorComponent> = ['r', 'g', 'b'];

export function differentColor(colorA: Color, colorB: Color): boolean {
    return colorA.paletteIndex !== colorB.paletteIndex;
}

export type ColorString = `${ColorNum}${ColorNum}${ColorNum}`;

export function makeColor(colorString: ColorString): StyleColor;
export function makeColor(paletteIndex: number): Color;
export function makeColor(rgb: [number, number, number]): Color;

export function makeColor(x: any): Color {
    if (typeof x === "string") {
        return new StyleColor(
            parseInt(x.charAt(0), 10) as ColorNum,
            parseInt(x.charAt(1), 10) as ColorNum,
            parseInt(x.charAt(2), 10) as ColorNum,
        )
    } else if (typeof x === "number") {
        return { paletteIndex: x };
    } else if (Array.isArray(x) && x.length === 3) {
        if (x[0] % 51 === 0 && x[1] % 51 === 0 && x[2] % 51 === 0) {
            return new StyleColor(
                x[0] / 51 as ColorNum,
                x[1] / 51 as ColorNum,
                x[2] / 51 as ColorNum
            )
        } else {
            for (let idx = 0 ; idx < 255; idx++) {
                if (x[0] !== Palette.classicMacColors[idx * 4]) continue;
                if (x[1] !== Palette.classicMacColors[idx * 4 + 1]) continue;
                if (x[2] !== Palette.classicMacColors[idx * 4 + 2]) continue;
                return { paletteIndex: idx };
            }

            throw new Error(`makeColor invoked with nonexistent RGB: ${x}`)
        }
    }

    throw new Error(`makeColor invoked with invalid argument: ${x}`)
}
