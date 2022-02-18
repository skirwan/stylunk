import { DyeBleachBase } from "../CLStyleLib/DyeBleachBase";
import { ColorManipulator } from "../CLStyleLib/Item";

export interface Berry {
    name: string;
    dye: ColorManipulator;
    bleach: ColorManipulator
}

interface KnownBerries {
    lila: Berry;
    orga: Berry;
    bramble: Berry;
}

export const Berries: Array<Berry> & KnownBerries = (()=>{
    let lila = {
        name: 'Lilaberry',
        dye: new DyeBleachBase('+L', [{ component: 'r', change: -1 }]),
        bleach: new DyeBleachBase('-L', [{ component: 'g', change: 1 }, { component: 'b', change: 1 }])
    };

    let orga = {
        name: 'Orgaberry',
        dye: new DyeBleachBase('+O', [{ component: 'g', change: -1 }]),
        bleach: new DyeBleachBase('-O', [{ component: 'r', change: 1 }, { component: 'b', change: 1 }])
    };

    let bramble = {
        name: 'Brambleberry',
        dye: new DyeBleachBase('+B', [{ component: 'b', change: -1 }]),
        bleach: new DyeBleachBase('-B', [{ component: 'r', change: 1 }, { component: 'g', change: 1 }])
    };

    return Object.assign( [lila, bramble, orga], { lila, orga, bramble });
})()