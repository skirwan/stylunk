import { Berries } from "../CLData/Berries";
import { differentItemColors } from "../CLStyleLib/Item";
import { makeShirt } from "../CLStyleLib/Shirt";

test('basic dye logic santiy', () => {
    let blueShirt = makeShirt('Blue', '224', '113', '002');
    let greyShirt = makeShirt('Gray', '333', '222', '111');

    let q = greyShirt.applying(Berries[1].dye).applying(Berries[2].dye);
    let q2 = blueShirt.applying(Berries[2].bleach, Berries[2].bleach, Berries[1].dye, Berries[2].dye, Berries[1].dye, Berries[2].dye, Berries[0].dye);
    
    expect(q.toString()).not.toStrictEqual(q2.toString());
    expect(differentItemColors(q.colors, q2.colors)).toBeFalsy();
});
