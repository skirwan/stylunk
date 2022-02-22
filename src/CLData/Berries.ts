import { ColorComponent, ColorNum, StyleColor } from "../CLStyleLib/Color";
import { DyeBleachBase } from "../CLStyleLib/DyeBleachBase";
import { ColorManipulator, ItemColor } from "../CLStyleLib/Item";

export interface Berry {
    name: string;
    actions: { [key: string]: ColorManipulator };
}

export const BerryActionSort: { [key: string]: number } = {
    'burn': -1,
    'bleach': 0,
    'dye': 1,
    'shock': 2,
};

let b: Array<Berry> = [{
    name: 'Lilaberry',
    actions: {
        'dye': new DyeBleachBase('+L', [{ component: 'r', change: -1 }]),
        'bleach': new DyeBleachBase('-L', [{ component: 'g', change: 1 }, { component: 'b', change: 1 }])
    }
}, {
    name: 'Orgaberry',
    actions: {
        'dye': new DyeBleachBase('+O', [{ component: 'g', change: -1 }]),
        'bleach': new DyeBleachBase('-O', [{ component: 'r', change: 1 }, { component: 'b', change: 1 }])
    }
}, {
    name: 'Brambleberry',
    actions: {
        'dye': new DyeBleachBase('+B', [{ component: 'b', change: -1 }]),
        'bleach': new DyeBleachBase('-B', [{ component: 'r', change: 1 }, { component: 'g', change: 1 }])
    }
}];

class Ferment implements ColorManipulator {
    constructor(
        readonly name: string,
        readonly components: Array<ColorComponent>,
    ) { }

    apply(colors: ItemColor[]): ItemColor[] {
        let total = { r: 0, g: 0, b: 0};
        
        colors.forEach(itemColor => {
            if (itemColor.color instanceof StyleColor) {
                
                for (const component of this.components) {
                    total[component] += itemColor.color[component];
                }
            }
        });

        return colors.map(itemColor => {
            if (itemColor.color instanceof StyleColor) {
                let { r, g, b } = itemColor.color;
                let triad = { r, g, b };

                for (const component of this.components) {
                    let value = Math.min(5, Math.max(0, (total[component] / itemColor.color[component]) | 0)) as ColorNum;
                    triad[component] = value;
                }
                
                ({ r, g, b } = triad);

                if (r === 5 && g === 5 && b === 5) {
                    // Nobody can have invisible clothes but Skirwan
                    r = 0;
                    g = 0;
                    b = 0;
                }

                return new ItemColor(
                    itemColor.paletteIndex,
                    itemColor.name,
                    new StyleColor(r, g, b),
                );
            } else {
                return itemColor;
            }
        });
    }
}

class Burn implements ColorManipulator {
    constructor(
        readonly name: string,
        readonly components: Array<ColorComponent>,
    ) { }

    apply(colors: ItemColor[]): ItemColor[] {
        let anchor = { r: 0, g: 0, b: 0};

        colors.forEach(itemColor => {
            if (itemColor.color instanceof StyleColor) {
                
                for (const component of this.components) {
                    anchor[component] += itemColor.color[component];
                }
            }
        });

        anchor = { 
            r: anchor.r / colors.length | 0,
            g: anchor.g / colors.length | 0,
            b: anchor.b / colors.length | 0,
        }

        return colors.map(itemColor => {
            if (itemColor.color instanceof StyleColor) {
                let { r, g, b } = itemColor.color;
                let triad = { r, g, b };

                for (const component of this.components) {
                    let value = triad[component] + (anchor[component] - triad[component]) / 2;
                    value = Math.min(5, Math.max(0, value | 0));
                    triad[component] = value as ColorNum;
                }
                
                ({ r, g, b } = triad);

                if (r === 5 && g === 5 && b === 5) {
                    // Nobody can have invisible clothes but Skirwan
                    r = 0;
                    g = 0;
                    b = 0;
                }

                return new ItemColor(
                    itemColor.paletteIndex,
                    itemColor.name,
                    new StyleColor(r, g, b),
                );
            } else {
                return itemColor;
            }
        });
    }
}

if (window.location.hash === '#SECRET') {
    b[0].actions['shock'] = new Ferment('*L', ['g', 'b']);
    b[1].actions['shock'] = new Ferment('*O', ['r', 'b']);
    b[2].actions['shock'] = new Ferment('*B', ['r', 'g']);

    b[0].actions['burn'] = new Burn('*L', ['r']);
    b[1].actions['burn'] = new Burn('*O', ['g']);
    b[2].actions['burn'] = new Burn('*B', ['b']);

    b.push({
        name: 'Fribbleberry',
        actions: {
            shock: new Ferment('*L', ['r', 'g', 'b'])
        }
    })
}

export const Berries = b;