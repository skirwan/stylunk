import { Color, Palette, ColorString, makeColor } from "./color";
import { Item, ItemAttributes, ItemColor } from "./item";

class Shirt extends Item {
	constructor(
        name: string,
		light: Color,
		mid: Color,
		dark: Color,
        attributes: ItemAttributes = {}
	) {
        super(name, [], [
            new ItemColor(Palette.indexShirtLight, "light", light), 
            new ItemColor(Palette.indexShirtMid, "mid", mid), 
            new ItemColor(Palette.indexShirtDark, "dark", dark),
        ], attributes);
	}
}

export function makeShirt(name: string, light: ColorString, mid: ColorString, dark: ColorString): Item {
    return new Shirt(name + ' Shirt', makeColor(light), makeColor(mid), makeColor(dark));
}