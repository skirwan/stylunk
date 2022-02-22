import { ColorComponent, ColorNum, StyleColor } from "../CLStyleLib/Color";
import { DyeBleachBase } from "../CLStyleLib/DyeBleachBase";
import { ColorManipulator, ItemColor } from "../CLStyleLib/Item";

export interface Berry {
    name: string;
    actions: { [key: string]: ColorManipulator };
}

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

if (window.location.hash === '#SECRET') {
    b[0].actions['shock'] = new Ferment('*L', ['g', 'b']);
    b[1].actions['shock'] = new Ferment('*O', ['r', 'b']);
    b[2].actions['shock'] = new Ferment('*B', ['r', 'g']);

    b.push({
        name: 'Fribbleberry',
        actions: {
            shock: new Ferment('*L', ['r', 'g', 'b'])
        }
    })
}

export const Berries = b;