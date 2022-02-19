import { Color, ColorString, makeColor } from "./Color";
import { Item, ItemAttributes, ItemColor } from "./Item";
import { ClothesIndices } from "./Palette";

class Shirt extends Item {
	constructor(
        name: string,
		light: Color,
		mid: Color,
		dark: Color,
        attributes: ItemAttributes = {}
	) {
        super(name, [], [
            new ItemColor(ClothesIndices.indexShirtLight, "light", light), 
            new ItemColor(ClothesIndices.indexShirtMid, "mid", mid), 
            new ItemColor(ClothesIndices.indexShirtDark, "dark", dark),
        ], attributes);
	}
}

export function makeShirt(name: string, light: ColorString, mid: ColorString, dark: ColorString, attributes: ItemAttributes = {}): Item {
    return new Shirt(name, makeColor(light), makeColor(mid), makeColor(dark), attributes);
}