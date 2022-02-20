import { ColorComponent, ColorNum, StyleColor } from "../CLStyleLib/Color";
import { DyeBleachBase } from "../CLStyleLib/DyeBleachBase";
import { ColorManipulator, ItemColor } from "../CLStyleLib/Item";

export interface Berry {
    name: string;
    dye?: ColorManipulator;
    bleach?: ColorManipulator
}

let b: Array<Berry> = [{
    name: 'Lilaberry',
    dye: new DyeBleachBase('+L', [{ component: 'r', change: -1 }]),
    bleach: new DyeBleachBase('-L', [{ component: 'g', change: 1 }, { component: 'b', change: 1 }])
}, {
    name: 'Orgaberry',
    dye: new DyeBleachBase('+O', [{ component: 'g', change: -1 }]),
    bleach: new DyeBleachBase('-O', [{ component: 'r', change: 1 }, { component: 'b', change: 1 }])
}, {
    name: 'Brambleberry',
    dye: new DyeBleachBase('+B', [{ component: 'b', change: -1 }]),
    bleach: new DyeBleachBase('-B', [{ component: 'r', change: 1 }, { component: 'g', change: 1 }])
}];

if (window.location.hash === '#SECRET') {
    b = b.concat([
        {
            name: 'Rageberry',
            dye: new DyeBleachBase('+[RG]', [{ component: 'r', change: -1 }, { component: 'g', change: -1 }]),
            bleach: new DyeBleachBase('-[RG]', [{ component: 'b', change: 1 }])
        }, {
            name: 'Rubberberry',
            dye: new DyeBleachBase('+[RB]', [{ component: 'r', change: -1 }, { component: 'b', change: -1 }]),
            bleach: new DyeBleachBase('-[RB]', [{ component: 'g', change: 1 }])
        }, {
            name: 'Gooberberry',
            dye: new DyeBleachBase('+[GB]', [{ component: 'g', change: -1 }, { component: 'b', change: -1 }]),
            bleach: new DyeBleachBase('-[GB]', [{ component: 'r', change: 1 }])
        }, {
            name: 'Fribbleberry',
            dye: {
                name: 'FRBL',
                apply(colors: ItemColor[]): ItemColor[] {
                    let totals: { [k in ColorComponent]: number } = { r: 0, g: 0, b: 0};

                    colors.forEach(itemColor => {
                        if (itemColor.color instanceof StyleColor) {
                            totals.r += itemColor.color.r;
                            totals.g += itemColor.color.g;
                            totals.b += itemColor.color.b;
                        }
                    });

                    return colors.map(itemColor => {
                        if (itemColor.color instanceof StyleColor) {
                            let { r, g, b } = itemColor.color;
            
                            r = Math.min(5, Math.max(0, (totals.r / r) | 0)) as ColorNum;
                            g = Math.min(5, Math.max(0, (totals.g / g) | 0)) as ColorNum;
                            b = Math.min(5, Math.max(0, (totals.b / b) | 0)) as ColorNum;

                            console.log({r, g, b});
                            if ( r === 5 && g === 5 && b === 5 ) {
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
        },
    ]);
}

export const Berries = b;