import { createContext } from "react";
import { Wardrobe } from "./CLData/Clothes/Wardrobe";
import { CharacterAppearance } from "./CLStyleLib/CharacterAppearance";
import { icons } from "./CLStyleLib/CharIcon";
import { ImageDataCache } from "./CLStyleLib/ImageDataCache";
import { Item } from "./CLStyleLib/Item";

export interface AppState {
    cache: ImageDataCache,
    appearance: CharacterAppearance,
    setAppearance(newAppearance: CharacterAppearance): void,
};

export const InitState = (): AppState => ({
    cache: new ImageDataCache(),
    appearance: new CharacterAppearance(icons[0], {
        underwear: Wardrobe.underwear[1] as Item,
        hair: Wardrobe.hair[0] as Item,
        weapon: Wardrobe.weapon[0] as Item,
        skin: Wardrobe.skin[0] as Item,
    }),
    setAppearance() { },
});

export const StylunkContext = createContext<AppState>(InitState());