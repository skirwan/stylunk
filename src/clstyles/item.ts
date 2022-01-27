import { Color, differentColor } from "./color";

export class ItemColor {
	constructor(
		readonly paletteIndex: number,
		readonly name: string,
		public color: Color,
	) { }
}

export interface ItemAttributes {
    lockedColors?: boolean;
    lockCloak?: boolean;
    lockNotCloak?: boolean;
}

export interface ColorManipulator {
    name: string;
    canApply<T extends Item>(item: T): boolean;
    apply<T extends Item>(item: T): boolean;
}

export class Item {
	constructor(
        readonly name: string,
        private recipe: Array<ColorManipulator>,
		readonly colors: Array<ItemColor>,
        readonly attributes: ItemAttributes = {}
	) { }

    applying(...manipulators: ColorManipulator[]): this {
        const ret: this = Object.create(this.constructor.prototype);
        Object.assign(ret, this);
        for (const manipulator of manipulators) {
            ret.recipe.push(manipulator);
            manipulator.apply(ret);
        }
        return ret;
    }

    find(colorName: string): ItemColor | undefined {
        return this.colors.find( c => c.name == colorName );
    }

    toString(): string {
        let result: string = this.name + '\n';
        result += this.recipe.map( r => r.name ).join(', ') + '\n';
        
        for (const color of this.colors) {
            const shortCode = `${color.color.r}${color.color.g}${color.color.b}`;
            const longCode = `(${color.color.r * 51}, ${color.color.g * 51}, ${color.color.b * 51})`;

            result += `- ${color.name}: ${shortCode}\t${longCode}\n`;
        }

        return result;
    }
}

export function differentItemColors(itemA: Item, itemB: Item): boolean {
    if (itemA.colors.length != itemB.colors.length) return true;
    for (let i = 0 ; i < itemA.colors.length; i ++ ) {
        if (differentColor(itemA.colors[i].color, itemB.colors[i].color)) {
            return true;
        }
    }

    return false;
}
