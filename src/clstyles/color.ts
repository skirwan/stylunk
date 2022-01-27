export type ColorNum = 0 | 1 | 2 | 3 | 4 | 5;

export function adjust(base: ColorNum, delta: 1|-1): ColorNum {
    return Math.min(5, Math.max(0, base + delta)) as ColorNum;
}

export class Color {
	constructor(
		public r: ColorNum,
		public g: ColorNum,
		public b: ColorNum,
	) { }
}

export type Component = keyof Color;
export const Components: Array<Component> = ['r', 'g', 'b'];

export function differentColor(colorA: Color, colorB: Color): boolean {
    for (const component of Components) {
        if ( colorA[component] != colorB[component]) {
            return true;
        }
    }

    return false;
}

export type ColorString = `${ ColorNum }${ ColorNum }${ ColorNum }`;

export function makeColor(colorString: ColorString): Color {
    return new Color(
        parseInt(colorString.charAt(0), 10) as ColorNum,
        parseInt(colorString.charAt(1), 10) as ColorNum,
        parseInt(colorString.charAt(2), 10) as ColorNum,
    )
}

export class Palette {
	static readonly indexShirtLight = 0;
	static readonly indexShirtMid = 0;
	static readonly indexShirtDark = 0;

    // idx * 4 => (r, g, b, a)
    static readonly classicMacColors: Uint8ClampedArray;


    static readonly basePalette: Uint8ClampedArray = new Uint8ClampedArray([

    ]);
}