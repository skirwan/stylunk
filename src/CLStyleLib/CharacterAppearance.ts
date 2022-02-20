import { ItemSlot, ItemSlots } from "../CLData/Clothes/Wardrobe";
import { CharIcon } from "./CharIcon";
import { ColorManipulator, differentItemColors, Item } from "./Item";
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

// This can't be done by comparing pixel data, because a tan shirt and 'no shirt' look identical but are distinct.
export function differentAppearance(a: CharacterAppearance, b: CharacterAppearance, ignoringSlot: ItemSlot | undefined = undefined): boolean {
    if (a.icon !== b.icon) { return true; }
    for (const slot of ItemSlots) {
        if (ignoringSlot && ignoringSlot === slot) { continue }
        const itemA = a.wornItems[slot];
        const itemB = b.wornItems[slot];

        if (itemA && !itemB) { return true }
        if (!itemA && itemB) { return true }
        if (itemA && itemB) {
            if (itemA.name !== itemB.name) { return true }
            if (differentItemColors(itemA.colors, itemB.colors)) { return true }
        }
    }

    return false;
}