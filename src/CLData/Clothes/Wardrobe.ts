import { Color, makeColor } from "../../CLStyleLib/Color";
import { Item, ItemAttributes, ItemColor } from "../../CLStyleLib/Item";
import { ClothesIndices, OrderedClothesIndices } from "../../CLStyleLib/Palette";
import { makePants } from "../../CLStyleLib/Pants";
import { makeShirt } from "../../CLStyleLib/Shirt";

export type ItemSlot = 'underwear' | 'weapon' | 'skin' | 'hair' | 'hat' | 'skindye' | 'shoes' | 'belt' | 'shirt' | 'pants';
export const ItemSlots: Array<ItemSlot> = ['underwear', 'weapon', 'skin', 'hair', 'hat', 'skindye', 'shoes', 'belt', 'shirt', 'pants'];
export type ItemCategory = { category: string, items: Array<Item> }
export type SlotOptions = Array<Item> | Array<ItemCategory>;

function makeItem(name: string, values: Partial<Record<keyof typeof ClothesIndices, Color>>, attributes: ItemAttributes = {}): Item {
    return new Item(
        name,
        [],
        OrderedClothesIndices.flatMap((key) => {
            if (values[key]) {
                return [new ItemColor(ClothesIndices[key], key, values[key]!)]
            } else {
                return [];
            }
        }),
        attributes,
    );
}

export const Wardrobe: Record<ItemSlot, SlotOptions> = {
    'underwear': [
        makeItem('Newbie', {
            indexHatLight: makeColor([255, 204, 153]),
            indexHatMid: makeColor([204, 102, 51]),
            indexHatDark: makeColor([153, 51, 0]),
            indexShirtLight: makeColor([255, 204, 204]),
            indexShirtMid: makeColor([153, 153, 204]),
            indexShirtDark: makeColor([102, 153, 102]),
            indexPantsLight: makeColor([153, 153, 204]),
            indexPantsDark: makeColor([102, 153, 102]),
            indexShoes: makeColor([102, 153, 102]),
            indexBeltLight: makeColor([204, 204, 204]),
            indexBeltDark: makeColor([102, 102, 102]),
            indexAccessoryLight: makeColor([204, 204, 204]),
            indexAccessoryDark: makeColor([102, 102, 102]),
        }),
        makeItem('Normal', {
            indexHatLight: makeColor([255, 204, 153]),
            indexHatMid: makeColor([204, 102, 51]),
            indexHatDark: makeColor([153, 51, 0]),
            indexShirtLight: makeColor([255, 204, 153]),
            indexShirtMid: makeColor([204, 153, 102]),
            indexShirtDark: makeColor([153, 102, 51]),
            indexPantsLight: makeColor([204, 153, 102]),
            indexPantsDark: makeColor([153, 102, 51]),
            indexShoes: makeColor([153, 102, 51]),
            indexBeltLight: makeColor([204, 204, 204]),
            indexBeltDark: makeColor([102, 102, 102]),
            indexAccessoryLight: makeColor([204, 204, 204]),
            indexAccessoryDark: makeColor([102, 102, 102]),
        }),
        makeItem('Taintless', {
            indexHatLight: makeColor([102, 204, 204]),
            indexHatMid: makeColor([102, 153, 204]),
            indexHatDark: makeColor([51, 102, 153]),
            indexShirtLight: makeColor([102, 204, 204]),
            indexShirtMid: makeColor([102, 153, 204]),
            indexShirtDark: makeColor([51, 102, 153]),
            indexPantsLight: makeColor([102, 204, 204]),
            indexPantsDark: makeColor([51, 102, 153]),
            indexShoes: makeColor([51, 102, 153]),
            indexBeltLight: makeColor([102, 204, 204]),
            indexBeltDark: makeColor([51, 102, 153]),
            indexAccessoryLight: makeColor([102, 204, 204]),
            indexAccessoryDark: makeColor([0, 153, 153]),
        }),
    ],
    'weapon': [
        makeItem('Cerulean Blue', {
            indexWeaponDark: makeColor([0, 153, 153]),
            indexWeaponLight: makeColor([0, 255, 255]),
        }),
        makeItem('Iron', {
            indexWeaponDark: makeColor([153, 153, 153]),
            indexWeaponLight: makeColor([153, 153, 255]),
        }),
        makeItem('Dark Grey', {
            indexWeaponDark: makeColor([51, 51, 0]),
            indexWeaponLight: makeColor([51, 51, 51]),
        }),
        makeItem('Black', {
            indexWeaponDark: makeColor([0, 0, 0]),
            indexWeaponLight: makeColor([0, 0, 0]),
        }),
    ],
    'skin': [
        makeItem('Light', {
            indexSkinDark: makeColor([204, 102, 51]),
            indexSkinMid: makeColor([255, 153, 102]),
            indexSkinLight: makeColor([255, 204, 153]),
        }),
        makeItem('Dark', {
            indexSkinDark: makeColor([102, 51, 0]),
            indexSkinMid: makeColor([153, 102, 51]),
            indexSkinLight: makeColor([204, 153, 102]),
        }),
        makeItem('Pale', {
            indexSkinDark: makeColor([255, 153, 153]),
            indexSkinMid: makeColor([255, 204, 204]),
            indexSkinLight: makeColor([255, 255, 204]),
        }),
        makeItem('Deep Brown', {
            indexSkinDark: makeColor([51, 0, 0]),
            indexSkinMid: makeColor([102, 51, 0]),
            indexSkinLight: makeColor([102, 51, 51]),
        }),
    ],
    'hair': [
        makeItem('Black', {
            indexHairLight: makeColor([51, 0, 51]),
            indexHairDark: makeColor([0, 0, 51]),
        }),
        makeItem('Charcoal', {
            indexHairLight: makeColor([51, 51, 51]),
            indexHairDark: makeColor([0, 0, 0]),
        }),
        makeItem('Brown', {
            indexHairLight: makeColor([153, 102, 51]),
            indexHairDark: makeColor([102, 51, 0]),
        }),
        makeItem('Red', {
            indexHairLight: makeColor([255, 102, 51]),
            indexHairDark: makeColor([153, 51, 0]),
        }),
        makeItem('Bright Red', {
            indexHairLight: makeColor([255, 0, 0]),
            indexHairDark: makeColor([204, 0, 0]),
        }),
        makeItem('Blond', {
            indexHairLight: makeColor([255, 204, 51]),
            indexHairDark: makeColor([153, 102, 0]),
        }),
        makeItem('Ash Brown', {
            indexHairLight: makeColor([255, 204, 153]),
            indexHairDark: makeColor([153, 102, 51]),
        }),
        makeItem('Dirty Blond', {
            indexHairLight: makeColor([255, 204, 51]),
            indexHairDark: makeColor([204, 153, 51]),
        }),
        makeItem('Auburn', {
            indexHairLight: makeColor([204, 51, 51]),
            indexHairDark: makeColor([102, 0, 0]),
        }),
        makeItem('Strawberry Blond', {
            indexHairLight: makeColor([255, 204, 0]),
            indexHairDark: makeColor([255, 102, 102]),
        }),
        makeItem('Golden', {
            indexHairLight: makeColor([255, 255, 102]),
            indexHairDark: makeColor([255, 204, 51]),
        }),
        makeItem('Hot Pink', {
            indexHairLight: makeColor([255, 51, 204]),
            indexHairDark: makeColor([255, 0, 153]),
        }),
        makeItem('Purple', {
            indexHairLight: makeColor([204, 102, 255]),
            indexHairDark: makeColor([153, 102, 255]),
        }),
        makeItem('Green', {
            indexHairLight: makeColor([102, 255, 102]),
            indexHairDark: makeColor([51, 204, 51]),
        }),
        makeItem('Blue', {
            indexHairLight: makeColor([102, 204, 255]),
            indexHairDark: makeColor([51, 153, 255]),
        }),
        makeItem('Multicoloured', {
            indexHairLight: makeColor([102, 204, 204]),
            indexHairDark: makeColor([255, 0, 0]),
        }),
        makeItem('Highlighted', {
            indexHairLight: makeColor([255, 255, 102]),
            indexHairDark: makeColor([153, 51, 51]),
        }),
        makeItem('Sandy', {
            indexHairLight: makeColor([204, 153, 102]),
            indexHairDark: makeColor([153, 102, 51]),
        }),
        makeItem('White', {
            indexHairLight: makeColor([204, 255, 255]),
            indexHairDark: makeColor([187, 187, 187]),
        }),
        makeItem('Gray', {
            indexHairLight: makeColor([136, 136, 136]),
            indexHairDark: makeColor([102, 102, 153]),
        })
    ],
    'hat': [
        makeItem('Blue', {
            indexHatLight: makeColor([0, 0, 255]),
            indexHatMid: makeColor([0, 0, 204]),
            indexHatDark: makeColor([0, 51, 153]),
        }),
        makeItem('Red', {
            indexHatLight: makeColor([255, 0, 0]),
            indexHatMid: makeColor([204, 0, 0]),
            indexHatDark: makeColor([153, 0, 0]),
        }),
        makeItem('Gray', {
            indexHatLight: makeColor([153, 153, 153]),
            indexHatMid: makeColor([102, 102, 102]),
            indexHatDark: makeColor([51, 51, 51]),
        }),
    ],
    'skindye': [
        makeItem('Light', {
            indexSkinDark: makeColor([204, 102, 51]),
            indexSkinMid: makeColor([255, 153, 102]),
            indexSkinLight: makeColor([255, 204, 153]),
        }),
        makeItem('Dark', {
            indexSkinDark: makeColor([102, 51, 0]),
            indexSkinMid: makeColor([153, 102, 51]),
            indexSkinLight: makeColor([204, 153, 102]),
        }),
        makeItem('Pale', {
            indexSkinDark: makeColor([255, 153, 153]),
            indexSkinMid: makeColor([255, 204, 204]),
            indexSkinLight: makeColor([255, 255, 204]),
        }),
        makeItem('Deep Brown', {
            indexSkinDark: makeColor([51, 0, 0]),
            indexSkinMid: makeColor([102, 51, 0]),
            indexSkinLight: makeColor([102, 51, 51]),
        }),
        makeItem('Yellowish', {
            indexSkinDark: makeColor([204, 204, 51]),
            indexSkinMid: makeColor([204, 204, 102]),
            indexSkinLight: makeColor([255, 255, 153]),
        }),
        makeItem('Blue', {
            indexSkinDark: makeColor([51, 51, 204]),
            indexSkinMid: makeColor([51, 102, 204]),
            indexSkinLight: makeColor([102, 153, 255]),
        }),
        makeItem('Green', {
            indexSkinDark: makeColor([51, 102, 51]),
            indexSkinMid: makeColor([51, 153, 51]),
            indexSkinLight: makeColor([51, 204, 51]),
        }),
        makeItem('Aqua', {
            indexSkinDark: makeColor([0, 102, 102]),
            indexSkinMid: makeColor([51, 153, 153]),
            indexSkinLight: makeColor([102, 204, 204]),
        }),
        makeItem('Purple', {
            indexSkinDark: makeColor([102, 0, 204]),
            indexSkinMid: makeColor([102, 51, 204]),
            indexSkinLight: makeColor([153, 102, 204]),
        }),
        makeItem('Ruddy', {
            indexSkinDark: makeColor([102, 0, 0]),
            indexSkinMid: makeColor([153, 51, 51]),
            indexSkinLight: makeColor([204, 51, 51]),
        }),
        makeItem('Grey', {
            indexSkinDark: makeColor([51, 51, 51]),
            indexSkinMid: makeColor([102, 102, 102]),
            indexSkinLight: makeColor([153, 153, 153]),
        }),
        makeItem('Black', {
            indexSkinDark: makeColor([0, 0, 0]),
            indexSkinMid: makeColor([0, 0, 51]),
            indexSkinLight: makeColor([51, 0, 0]),
        }),
        makeItem('Russet', {
            indexSkinDark: makeColor([204, 51, 0]),
            indexSkinMid: makeColor([255, 102, 0]),
            indexSkinLight: makeColor([255, 102, 51]),
        }),
        makeItem('Tawny', {
            indexSkinDark: makeColor([204, 102, 0]),
            indexSkinMid: makeColor([255, 102, 51]),
            indexSkinLight: makeColor([255, 153, 51]),
        }),
        makeItem('Light Green Paint', {
            indexSkinDark: makeColor([0, 204, 102]),
            indexSkinMid: makeColor([51, 255, 153]),
            indexSkinLight: makeColor([153, 255, 204]),
        }),
        makeItem('Light Blue Paint', {
            indexSkinDark: makeColor([0, 153, 255]),
            indexSkinMid: makeColor([51, 204, 255]),
            indexSkinLight: makeColor([102, 204, 255]),
        }),
        makeItem('Dark Blue Paint', {
            indexSkinDark: makeColor([51, 0, 153]),
            indexSkinMid: makeColor([51, 51, 204]),
            indexSkinLight: makeColor([51, 102, 255]),
        }),
        makeItem('Yellow Paint', {
            indexSkinDark: makeColor([255, 204, 51]),
            indexSkinMid: makeColor([255, 255, 51]),
            indexSkinLight: makeColor([255, 255, 153]),
        }),
        makeItem('Pink Paint', {
            indexSkinDark: makeColor([255, 0, 204]),
            indexSkinMid: makeColor([255, 51, 255]),
            indexSkinLight: makeColor([255, 153, 255]),
        }),
        makeItem('Purple Paint', {
            indexSkinDark: makeColor([51, 0, 153]),
            indexSkinMid: makeColor([102, 51, 204]),
            indexSkinLight: makeColor([153, 102, 204]),
        }),
        makeItem('Meshra Egg Gray', {
            indexSkinDark: makeColor([51, 51, 0]),
            indexSkinMid: makeColor([102, 102, 0]),
            indexSkinLight: makeColor([153, 153, 102]),
        }),
    ],
    'shoes': [
        makeItem('Pink Slippers', { indexShoes: makeColor([204, 102, 153]) }),
        makeItem('Dark Brown Scuffs', { indexShoes: makeColor([102, 51, 51]) }),
        makeItem('Brown Loafers', { indexShoes: makeColor([153, 102, 51]) }),
        makeItem('Glossy White Flats', { indexShoes: makeColor([204, 204, 204]) }),
        makeItem('White Sneakers', { indexShoes: makeColor([153, 204, 204]) }),
        makeItem('Black Riding Boots', { indexShoes: makeColor([0, 0, 51]) }),
        makeItem('Grey Cowboy Boots', { indexShoes: makeColor([102, 102, 102]) }),
        makeItem('Turquoise Slides', { indexShoes: makeColor([102, 204, 153]) }),
        makeItem('Forest Green Huaraches', { indexShoes: makeColor([51, 102, 51]) }),
        makeItem('Burnt Leather Espadrilles', { indexShoes: makeColor([204, 102, 51]) }),
        makeItem('Orange Moccasins', { indexShoes: makeColor([255, 153, 0]) }),
        makeItem('Red Pumps', { indexShoes: makeColor([204, 51, 51]) }),
        makeItem('Blue Oxfords', { indexShoes: makeColor([0, 102, 204]) }),
        makeItem('Green Clogs', { indexShoes: makeColor([0, 153, 51]) }),
        makeItem('Purple Sandals', { indexShoes: makeColor([153, 0, 204]) }),
        makeItem('Gold Wing Tips', { indexShoes: makeColor([204, 153, 51]) }),
    ],
    'belt': [
        makeItem('Bard', {
            indexBeltLight: makeColor([255, 204, 102]),
            indexBeltDark: makeColor([255, 204, 51]),
        }),
        makeItem('Artisan', {
            indexBeltLight: makeColor([255, 153, 51]),
            indexBeltDark: makeColor([255, 102, 0]),
        }),
        makeItem('3rd• Fighter', {
            indexBeltLight: makeColor([204, 255, 255]),
            indexBeltDark: makeColor([204, 204, 255]),
        }),
        makeItem('4th• Fighter', {
            indexBeltLight: makeColor([0, 0, 51]),
            indexBeltDark: makeColor([0, 0, 0]),
        }),
        makeItem('5th• Fighter', {
            indexBeltLight: makeColor([153, 0, 0]),
            indexBeltDark: makeColor([102, 0, 0]),
        }),
        makeItem('6th• Fighter', {
            indexBeltLight: makeColor([0, 51, 204]),
            indexBeltDark: makeColor([0, 0, 153]),
        }),
        makeItem('7th• Fighter', {
            indexBeltLight: makeColor([102, 102, 102]),
            indexBeltDark: makeColor([153, 153, 153]),
        }),
        makeItem('Belt of the Wild', {
            indexBeltLight: makeColor([204, 51, 0]),
            indexBeltDark: makeColor([153, 51, 0]),
        }),
        makeItem('Stonegirdle', {
            indexBeltLight: makeColor([153, 153, 153]),
            indexBeltDark: makeColor([51, 51, 51]),
        }),
        makeItem('Moonless Sky', {
            indexBeltLight: makeColor([102, 102, 204]),
            indexBeltDark: makeColor([51, 51, 153]),
        }),
        makeItem('Full Moon', {
            indexBeltLight: makeColor([255, 255, 204]),
            indexBeltDark: makeColor([255, 204, 204]),
        }),
    ],
    'shirt': [{
        category: 'General',
        items: [
            makeShirt('Tan', '543', '432', '321'),
            makeShirt('Blue', '224', '113', '002'),
            makeShirt('Gray', '333', '222', '111'),
            makeShirt('Muddy Forest', '320', '220', '211'),
            makeShirt('Forest Green', '030', '020', '010'),
            makeShirt('Grassy Green', '253', '142', '031'),
            makeShirt('Grey', '333', '222', '111'),
            makeShirt('Muddy Yellow', '320', '442', '320'),
            makeShirt('Albino Maha Fur', '222', '333', '444'),
            makeShirt('Puma Skin', '333', '111', '000'),
            makeShirt('Purple', '314', '203', '102'),
            makeShirt('Silk', '554', '544', '433'),
            makeShirt('Mountain Goat', '544', '432', '222'),
            makeShirt('Woodland Green', '242', '321', '120'),
        ]
    }, {
        category: 'Historical',
        items: [
            makeShirt('Gold', '552', '541', '430'),
            makeShirt('Newbie Orange', '543', '532', '421'),
        ]
    }, {
        category: 'Healer',
        items: [
            makeShirt('White', '455', '444', '445'),
            makeShirt('Turquoise (3rd•)', '355', '243', '122'),
            makeShirt('Sea Wheat (5th•)', '542', '143', '125'),
            makeShirt('Mossy Lavender (7th•)', '042', '325', '105'),
        ]
    }, {
        category: 'Carnival',
        items: [
            makeShirt('Ice Blue', '145', '125', '004'),
            makeShirt('Bright Green', '551', '241', '030'),
            makeShirt('Bright Sunrise', '541', '530', '400'),
            makeShirt('Bright Sunset', '532', '412', '102'),
            makeShirt('Thundercloud', '234', '111', '001'),
            makeShirt('Bubblegum', '544', '525', '202'),
            makeShirt('Campfire', '300', '420', '540'),
        ]
    }, {
        category: 'Special',
        items: [
            makeShirt('Bloodshroud', '311', '200', '100', { lockCloak: true, lockedColors: true }),
            makeShirt('Lava Cloak', '421', '310', '200', { lockCloak: true, lockedColors: true }),
            makeShirt('Red Team', '500', '411', '300', { lockedColors: true, lockNotCloak: true }),
            makeShirt('Blue Team', '005', '114', '003', { lockedColors: true, lockNotCloak: true }),
            makeShirt('Yellow Team', '551', '441', '330', { lockedColors: true, lockNotCloak: true }),
        ]
    }],
    'pants': [{
        category: 'General',
        items: [
            makePants('Tan', '432', '321'),
            makePants('Blue', '113', '002'),
            makePants('Forest Green', '020', '010'),
            makePants('Grey', '333', '111'),
            makePants('Muddy Yellow', '442', '320'),
            makePants('Albino Maha Fur', '222', '444'),
            makePants('Puma Skin', '222', '000'),
            makePants('Brown', '321', '210'),
            makePants('Silk', '554', '433'),
        ]
    }, {
        category: 'Historical',
        items: [
            makePants('Gold', '541', '530'),
            makePants('Newbie Orange', '532', '421'),
        ]
    }, {
        category: 'Healer',
        items: [
            makePants('White (2nd•)', '455', '444'),
            makePants('Turquoise (4th•)', '243', '122'),
            makePants('Sea Wheat (6th•)', '143', '125'),
            makePants('Ocean Blue (8th•)', '325', '105'),
        ]
    }, {
        category: 'Estuary',
        items: [
            makePants('Gathering Dusk', '134', '112'),
            makePants('Mirror Pond', '134', '222'),
            makePants('Bruised Sapphire', '024', '111'),
            makePants('Floodwater', '023', '111'),
            makePants('Deep Sea Ebony', '134', '001'),
        ]
    }
    ],
};

interface SlotRules {
    label: string,
    required: boolean
    colorable: boolean
    initiallyVisible: boolean
}
export const WardrobeRules: Record<ItemSlot, SlotRules> = {
    underwear: {
        label: 'Underwear',
        required: true,
        colorable: false,
        initiallyVisible: false,
    },
    weapon: {
        label: 'Weapon',
        required: true,
        colorable: false,
        initiallyVisible: false,
    },
    skin: {
        label: 'Skin',
        required: true,
        colorable: false,
        initiallyVisible: false,
    },
    hair: {
        label: 'Hair',
        required: true,
        colorable: false,
        initiallyVisible: false,
    },
    hat: {
        label: 'Hat',
        required: false,
        colorable: false,
        initiallyVisible: false,
    },
    skindye: {
        label: 'Skin Dye',
        required: false,
        colorable: false,
        initiallyVisible: false,
    },
    shoes: {
        label: 'Shoe',
        required: false,
        colorable: false,
        initiallyVisible: false,
    },
    belt: {
        label: 'Belt',
        required: false,
        colorable: false,
        initiallyVisible: false,
    },
    shirt: {
        label: 'Shirt',
        required: false,
        colorable: true,
        initiallyVisible: true,
    },
    pants: {
        label: 'Pants',
        required: false,
        colorable: true,
        initiallyVisible: true,
    }
}