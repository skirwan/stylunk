import { DyeBleachBase } from "../CLStyleLib/DyeBleachBase";
import { ColorManipulator } from "../CLStyleLib/Item";

export interface Berry {
    name: string;
    dye: ColorManipulator;
    bleach: ColorManipulator
}

export const Berries: Array<Berry> = [{
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