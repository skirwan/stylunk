import { Color, ColorString, makeColor } from "./Color";
import { Item, ItemAttributes, ItemColor } from "./Item";
import { ClothesIndices } from "./Palette";

class Pants extends Item {
	constructor(
        name: string,
		light: Color,
		dark: Color,
        attributes: ItemAttributes = {}
	) {
        super(name, [], [
            new ItemColor(ClothesIndices.indexPantsLight, "light", light), 
            new ItemColor(ClothesIndices.indexPantsDark, "dark", dark),
        ], attributes);
	}
}

export function makePants(name: string, light: ColorString, dark: ColorString, attributes: ItemAttributes = {}): Item {
    return new Pants(name, makeColor(light), makeColor(dark), attributes);
}