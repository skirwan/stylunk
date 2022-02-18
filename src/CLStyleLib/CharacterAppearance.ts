import { ItemSlot, ItemSlots } from "../CLData/Clothes/Wardrobe";
import { CharIcon } from "./CharIcon";
import { ColorManipulator, Item } from "./Item";
import { Palette } from "./Palette";

export class CharacterAppearance {
    readonly palette: Uint8ClampedArray;

    constructor(
        readonly icon: CharIcon,
        readonly wornItems: Partial<Record<ItemSlot, Item>> = {}
    ) {
        this.palette = Palette.basePalette.slice();

        for (let slot of ItemSlots) {
            if (this.wornItems[slot]) {
                for (let color of this.wornItems[slot]!.colors) {
                    this.palette[color.paletteIndex] = color.color.paletteIndex;
                }
            }
        }
    }

    withIcon(icon: CharIcon): CharacterAppearance {
        return new CharacterAppearance(icon, this.wornItems);
    }

    withEquipped(slot: ItemSlot, item?: Item): CharacterAppearance {
        let newWornItems = Object.assign({}, this.wornItems);
        newWornItems[slot] = item;
        return new CharacterAppearance(this.icon, newWornItems);
    }

    withColorManipulated(slot: ItemSlot, adjustment: ColorManipulator): CharacterAppearance {
        return new CharacterAppearance(
            this.icon,
            {
                ...this.wornItems,
                [slot]: this.wornItems[slot]?.applying(adjustment),
            }
        );
    }
}

export function sameAppearance(a: CharacterAppearance, b: CharacterAppearance): boolean {
    if (a.palette.length !== b.palette.length) { return false }

    let aWindow = new Uint32Array(a.palette.buffer);
    let bWindow = new Uint32Array(b.palette.buffer);

    for (let i = 0; i < aWindow.length; i++) {
        if (aWindow[i] !== bWindow[i]) return false;
    }

    return true;
}

export function differentAppearance(a: CharacterAppearance, b: CharacterAppearance): boolean {
    if (a.palette.length !== b.palette.length) { return true }

    let aWindow = new Uint32Array(a.palette.buffer);
    let bWindow = new Uint32Array(b.palette.buffer);

    for (let i = 0; i < aWindow.length; i++) {
        if (aWindow[i] !== bWindow[i]) return true;
    }

    return false;
}