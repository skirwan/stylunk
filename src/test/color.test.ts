import { ColorString } from "../CLStyleLib/Color";
import { clothesColorToPaletteIndex, Palette } from "../CLStyleLib/Palette";

test('palette sanity', () => {
    expect(Palette.classicMacColors.length).toBe(256 * 4);
});

test('full clothes color lookup', () => {
    for (const r of [0, 1, 2, 3, 4, 5]) {
        for (const g of [0, 1, 2, 3, 4, 5]) {
            for (const b of [0, 1, 2, 3, 4, 5]) {
                const shortCode = `${r}${g}${b}` as ColorString;
                const idx = clothesColorToPaletteIndex(shortCode);

                expect(Palette.classicMacColors[idx * 4]).toBe(r * 51);
                expect(Palette.classicMacColors[idx * 4 + 1]).toBe(g * 51);
                expect(Palette.classicMacColors[idx * 4 + 2]).toBe(b * 51);
            }
        }
    }
});

test('transparent clothes color lookup', () => {
    const idx = clothesColorToPaletteIndex('555');

    const r = Palette.classicMacColors[idx * 4];
    const g = Palette.classicMacColors[idx * 4 + 1];
    const b = Palette.classicMacColors[idx * 4 + 2];
    const a = Palette.classicMacColors[idx * 4 + 3];

    expect([r, g, b, a]).toStrictEqual([255, 255, 255, 0]);
});
