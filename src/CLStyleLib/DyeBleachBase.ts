import { adjust, ColorNum, ColorComponent, StyleColor } from "./Color";
import { ColorManipulator, ItemColor } from "./Item";

export class DyeBleachBase implements ColorManipulator {
    static readonly colorChannelConstraints: { [key: string]: { min?: ColorNum, max?: ColorNum } } = {
        'light': { min: 2, max: 4 },
        'mid': { min: 1, max: 3 },
        'dark': { min: 0, max: 2 },
    };

    constructor(
        public readonly name: string,
        readonly componentChanges: Array<{ component: ColorComponent, change: 1 | -1 }>
    ) { }

    private adjustAndClamp(c: ColorNum, change: 1 | -1, min?: ColorNum, max?: ColorNum): ColorNum {
        let newVal = adjust(c, change);
        if (min) newVal = Math.max(min, newVal) as ColorNum;
        if (max) newVal = Math.min(max, newVal) as ColorNum;
        return newVal;
    }

    apply(colors: Array<ItemColor>): Array<ItemColor> {
        return colors.map(itemColor => {
            const { min, max } = DyeBleachBase.colorChannelConstraints[itemColor.name];


            if (itemColor.color instanceof StyleColor) {
                const color = (({ r, g, b }) => ({ r, g, b }))(itemColor.color);

                for (const { component, change } of this.componentChanges) {
                    color[component] = this.adjustAndClamp(color[component], change, min, max)
                }

                return new ItemColor(
                    itemColor.paletteIndex,
                    itemColor.name,
                    new StyleColor(color.r, color.g, color.b),
                );
            } else {
                return itemColor;
            }
        });
    }
}
