import { Berries } from "../CLData/Berries";
import { differentItemColors } from "../CLStyleLib/Item";
import { makeShirt } from "../CLStyleLib/Shirt";

test('basic dye logic santiy', () => {
    let blueShirt = makeShirt('Blue', '224', '113', '002');
    let greyShirt = makeShirt('Gray', '333', '222', '111');

    let q = greyShirt.applying(Berries.orga.dye).applying(Berries.bramble.dye);
    let q2 = blueShirt.applying(Berries.bramble.bleach, Berries.bramble.bleach, Berries.orga.dye, Berries.bramble.dye, Berries.orga.dye, Berries.bramble.dye, Berries.lila.dye);
    
    expect(q.toString()).not.toStrictEqual(q2.toString());
    expect(differentItemColors(q.colors, q2.colors)).toBeFalsy();
});
