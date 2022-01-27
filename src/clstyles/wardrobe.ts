import { Item } from "./item";
import { makeShirt } from "./shirt";

export type ItemSlot = 'underwear' | 'shirt' | 'pants';
export type SlotOptions = Array<Item> | Array<{ category: string, items: Array<Item>}>;
export type Wardrobe = Record<ItemSlot, SlotOptions>;

// TODO: This should be somewhere else
const wardrobe: Wardrobe = {
    'underwear': [
        new Item('Newbie', [], []),
        new Item('Normal', [], []),
        new Item('Taintless', [], []),
    ],
    'shirt': [
        {
            category: 'General',
            items: [
                makeShirt('Blue', '224', '113', '002'),
                makeShirt('Gray', '333', '222', '111')
            ]
        }
    ],
    'pants': [], 
};