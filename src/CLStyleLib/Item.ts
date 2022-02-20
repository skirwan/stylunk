import { Color, differentColor, StyleColor } from "./Color";

export class ItemColor {
	constructor(
		readonly paletteIndex: number,
		readonly name: string,
		readonly color: Color,
	) { }
}

export interface ItemAttributes {
    lockedColors?: boolean;
    lockCloak?: boolean;
    lockNotCloak?: boolean;
}

export interface ColorManipulator {
    name: string;
    apply(colors: Array<ItemColor>): Array<ItemColor>
}

export class Item {
	constructor(
        readonly name: string,
        private recipe: Array<ColorManipulator>,
		readonly colors: Array<ItemColor>,
        readonly attributes: ItemAttributes = {}
	) { }

    applying(...manipulators: ColorManipulator[]): Item {
        return new Item(
            this.name, 
            [...this.recipe, ...manipulators],
            manipulators.reduce<Array<ItemColor>>(
                (cs, m)=> m.apply(cs), 
                this.colors
            ),
        );
    }

    toRecipeString(): string {
        return this.recipe.map( dye => dye.name ).join(' ');
    }

    toString(): string {
        let result: string = this.name + '\n';
        result += this.recipe.map( r => r.name ).join(', ') + '\n';
        
        for (const color of this.colors) {
            if (color.color instanceof StyleColor) {
                const shortCode = `${color.color.r}${color.color.g}${color.color.b}`;
                const longCode = `(${color.color.r * 51}, ${color.color.g * 51}, ${color.color.b * 51})`;
    
                result += `- ${color.name}: ${shortCode}\t${longCode}\n`;
            } else {
                result += `- Fixed ${color.paletteIndex}\n`;
            }
            
        }

        return result;
    }
}

export function differentItemColors(itemA: Array<ItemColor>, itemB: Array<ItemColor>): boolean {
    if (itemA.length !== itemB.length) return true;
    for (let i = 0 ; i < itemA.length; i ++ ) {
        if (differentColor(itemA[i].color, itemB[i].color)) {
            return true;
        }
    }

    return false;
}
