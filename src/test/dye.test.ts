import { Berries } from "../CLData/Berries";
import { differentItemColors } from "../CLStyleLib/Item";
import { makeShirt } from "../CLStyleLib/Shirt";

test('basic dye logic santiy', () => {
    let blueShirt = makeShirt('Blue', '224', '113', '002');
    let greyShirt = makeShirt('Gray', '333', '222', '111');

    let lilaDye = Berries[0]!.actions['dye']!;
    let orgaDye = Berries[1]!.actions['dye']!;
    let brambleDye = Berries[2]!.actions['dye']!;
    let brambleBleach = Berries[2]!.actions['bleach']!;

    let q = greyShirt.applying(orgaDye).applying(brambleDye);
    let q2 = blueShirt.applying(brambleBleach, brambleBleach, orgaDye, brambleDye, orgaDye, brambleDye, lilaDye);
    
    expect(q.toString()).not.toStrictEqual(q2.toString());
    expect(differentItemColors(q.colors, q2.colors)).toBeFalsy();
});
