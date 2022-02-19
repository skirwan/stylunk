import { DyeBleachBase } from "../CLStyleLib/DyeBleachBase";
import { ColorManipulator } from "../CLStyleLib/Item";

export interface Berry {
    name: string;
    dye: ColorManipulator;
    bleach: ColorManipulator
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
        }
    ]);
}

export const Berries = b;