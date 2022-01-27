import { adjust, ColorNum, Component } from "./color";
import { ColorManipulator, differentItemColors, Item } from "./item";


export class DyeBleachBase implements ColorManipulator {
    static readonly colorChannelConstraints: Array<{name: string, min?: ColorNum, max?: ColorNum}> = [
        { name: 'light', min: 2, max: 5 },
        { name: 'mid', min: 1, max: 4 },
        { name: 'dark', min: 0, max: 3 },
    ];

    constructor(
        public readonly name: string,
        readonly componentChanges: Array<{component: Component, change: 1 | -1}>
    ) { }

    private adjustAndClamp(c: ColorNum, change: 1|-1, min?: ColorNum, max?: ColorNum): ColorNum {
        let newVal = adjust(c, change);
        if (min) newVal = Math.max(min, newVal) as ColorNum;
        if (max) newVal = Math.min(max, newVal) as ColorNum;
        return newVal;
    }

    canApply<T extends Item>(item: T): boolean {
        return differentItemColors(item, item.applying(this));
    }

    apply<T extends Item>(item: T): boolean {
        let changed = false;
        for (const { name, min, max } of DyeBleachBase.colorChannelConstraints) {
            for (const { component, change } of this.componentChanges ) {
                let color = item.find(name);
                if (!color) continue;
                const value = color.color[component]
                const newValue = this.adjustAndClamp(value, change, min, max);

                color.color[component] = newValue;
                changed = true;
            }
        }
        return changed;
    }
}

export const Berries = {
    lila: {
        dye: new DyeBleachBase('lila dye', [{ component: 'r', change: -1 }]),
        bleach: new DyeBleachBase('lila bleach', [{ component: 'g', change: 1 }, { component: 'b', change: 1 }])
    },
    orga: {
        dye: new DyeBleachBase('orga dye', [{ component: 'g', change: -1 }]),
        bleach: new DyeBleachBase('orga bleach', [{ component: 'r', change: 1 }, { component: 'b', change: 1 }])
    }, 
    bramble: {
        dye: new DyeBleachBase('bramble dye', [{ component: 'b', change: -1 }]),
        bleach: new DyeBleachBase('bramble bleach', [{ component: 'r', change: 1 }, { component: 'g', change: 1 }])
    }
}