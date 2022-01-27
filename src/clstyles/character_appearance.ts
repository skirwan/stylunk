import { CharIcon } from "./charIcon";
import { Item } from "./item";
import { ItemSlot } from "./wardrobe";

export class CharacterAppearance {
    constructor(
        public icon: CharIcon,
        public wornItems: Partial<Record<ItemSlot, Item>> = {}
    ) { }
}