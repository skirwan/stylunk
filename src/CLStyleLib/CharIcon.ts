export interface SkipChunk { skip: number; }
export interface DataChunk { data: string; binaryData?: string; }
export type PixelChunk = SkipChunk | DataChunk

export interface CharIcon {
    race: string;
    gender: string;
    armed: boolean;
    variant?: string;
    cloaked: boolean;
    pixelData: Array<PixelChunk>;
    cellWidth: number;
    cellHeight: number;
    imageId: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let oldIcons = [
    {
        name: 'Thoom',
        variants: [
        {
            name: 'Male',
            image: 451,
        },
        {
            name: 'Male, Unarmed',
            image: 3003,
        },
        {
            name: 'Male, Alternate',
            image: 4180,
        },
        {
            name: 'Female',
            image: 458,
        },
        {
            name: 'Female, Unarmed',
            image: 3010,
        },
        {
            name: 'Female, Alternate',
            image: 4179,
        }
        ]
    },
    {
        name: 'Sylvan',
        variants: [
        {
            name: 'Male',
            image: 449,
            cloakedImage: 3013
        },
        {
            name: 'Male, Unarmed',
            image: 1854,
            cloakedImage: 22
        },
        {
            name: 'Female',
            image: 456,
            cloakedImage: 3014
        },
        {
            name: 'Female, Unarmed',
            image: 1853,
            cloakedImage: 1583
        }
        ]
    },
    {
        name: 'Dwarf',
        variants: [
        {
            name: 'Male',
            image: 452,
            cloakedImage: 3355,
            hasHelm: true
        },
        {
            name: 'Male, Unarmed',
            image: 3004,
            cloakedImage: 3324,
            hasHelm: true
        },
        {
            name: 'Male, Alternate',
            image: 1839,
            cloakedImage: 3355,
            hasHelm: true
        },
        {
            name: 'Female',
            image: 459,
            cloakedImage: 3356,
            hasHelm: true
        },
        {
            name: 'Female, Unarmed',
            image: 3011,
            cloakedImage: 3325,
            hasHelm: true
        },
        {
            name: 'Female, Alternate',
            image: 2951,
            cloakedImage: 3356,
            hasHelm: true
        },
        ]
    },
    {
        name: 'Human',
        variants: [
        {
            name: 'Male',
            image: 447,
            cloakedImage: 3013
        },
        {
            name: 'Male, Unarmed',
            image: 2999,
            cloakedImage: 22
        },
        {
            name: 'Male, Shoulders',
            image: 1841,
            cloakedImage: 3013
        },
        {
            name: 'Male, Slender',
            image: 2166,
            cloakedImage: 3013
        },
        {
            name: 'Female',
            image: 454,
            cloakedImage: 3014
        },
        {
            name: 'Female, Unarmed',
            image: 3006,
            cloakedImage: 1583
        },
        {
            name: 'Female, Pants',
            image: 1934,
            cloakedImage: 3014
        },
        {
            name: 'Female, Untucked',
            image: 1840,
            cloakedImage: 3014
        },
        ]
    },
    {
        name: 'Halfling',
        variants: [
        {
            name: 'Male',
            image: 448,
            cloakedImage: 3355
        },
        {
            name: 'Male, Unarmed',
            image: 3000,
            cloakedImage: 3324
        },
        {
            name: 'Male, Alternate',
            image: 189,
            cloakedImage: 3355
        },
        {
            name: 'Female',
            image: 455,
            cloakedImage: 3356
        },
        {
            name: 'Female, Unarmed',
            image: 3007,
            cloakedImage: 3325
        },
        {
            name: 'Female, Alternate',
            image: 1426,
            cloakedImage: 3356
        },
        ]
    },
    {
        name: 'Fen\'Neko',
        variants: [
        {
            name: 'Male',
            image: 450,
            cloakedImage: 3013
        },
        {
            name: 'Male, Unarmed',
            image: 3002,
            cloakedImage: 22
        },
        {
            name: 'Male, Alternate',
            image: 3665,
            cloakedImage: 3013
        },
        /*{
            name: 'Male, Alternate (Unarmed)',
            image: 4419,
            cloakedImage: 3013
        },*/
        {
            name: 'Female',
            image: 457,
            cloakedImage: 3014
        },
        {
            name: 'Female, Unarmed',
            image: 3009,
            cloakedImage: 1583
        },
        {
            name: 'Female, No Shoulders',
            image: 4404,
            cloakedImage: 3014
        },
        {
            name: 'Female, Skirt',
            image: 4513,
            cloakedImage: 3014
        },
        ]
    },
    {
        name: 'Undisclosed',
        cloakOnly:true,
        variants: [
        {
            name: 'Male',
            image: 3013,
            cloakedImage: 3013
        },
        {
            name: 'Male, Unarmed',
            image: 22,
            cloakedImage: 22
        },
        {
            name: 'Female',
            image: 3014,
            cloakedImage: 3014
        },
        {
            name: 'Female, Unarmed',
            image: 1583,
            cloakedImage: 1583
        },
        {
            name: 'Female, Alternate',
            image: 131,
            cloakedImage: 131
        },
        ]
    }]

export const icons: Array<CharIcon> = [
    {
        race: 'Ghorak Zo',
        gender: 'male',
        armed: true,
        cloaked: false,
        imageId: 453,
        ...require('../CLData/Sprites/453.json'),
    },{
        race: 'Ghorak Zo',
        gender: 'male',
        armed: false,
        cloaked: false,
        imageId: 3005,
        ...require('../CLData/Sprites/3005.json'),
    },{
        race: 'Ghorak Zo',
        gender: 'male',
        armed: true,
        cloaked: false,
        variant: "young",
        imageId: 4567,
        ...require('../CLData/Sprites/4567.json'),
    },{
        race: 'Ghorak Zo',
        gender: 'female',
        armed: true,
        cloaked: false,
        imageId: 460,
        ...require('../CLData/Sprites/460.json'),
    },{
        race: 'Ghorak Zo',
        gender: 'female',
        armed: false,
        cloaked: false,
        imageId: 3012,
        ...require('../CLData/Sprites/3012.json'),
    },{
        race: 'Ghorak Zo',
        gender: 'female',
        armed: true,
        cloaked: false,
        variant: 'pants',
        imageId: 3456,
        ...require('../CLData/Sprites/3456.json'),
    },{
        race: 'Ghorak Zo',
        gender: 'female',
        armed: false,
        cloaked: false,
        variant: 'pants',
        imageId: 4458,
        ...require('../CLData/Sprites/4458.json'),
    }
];
