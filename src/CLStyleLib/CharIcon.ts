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
    },{
        race: 'Thoom',
        gender: 'male',
        armed: true,
        cloaked: false,
        imageId: 451,
        ...require('../CLData/Sprites/451.json'),
    },{
        race: 'Thoom',
        gender: 'male',
        armed: false,
        cloaked: false,
        imageId: 3003,
        ...require('../CLData/Sprites/3003.json'),
    },{
        race: 'Thoom',
        gender: 'male',
        armed: true,
        cloaked: false,
		variant: 'alternate',
        imageId: 4180,
        ...require('../CLData/Sprites/4180.json'),
    },{
        race: 'Thoom',
        gender: 'female',
        armed: true,
        cloaked: false,
        imageId: 458,
        ...require('../CLData/Sprites/458.json'),
    },{
        race: 'Thoom',
        gender: 'female',
        armed: false,
        cloaked: false,
        imageId: 3010,
        ...require('../CLData/Sprites/3010.json'),
    },{
        race: 'Thoom',
        gender: 'female',
        armed: true,
        cloaked: false,
		variant: 'alternate',
        imageId: 4179,
        ...require('../CLData/Sprites/4179.json'),
    },{
        race: 'Dwarf',
        gender: 'male',
        armed: true,
        cloaked: false,
        imageId: 452,
        ...require('../CLData/Sprites/452.json'),
    },{
        race: 'Dwarf',
        gender: 'male',
        armed: false,
        cloaked: false,
        imageId: 3004,
        ...require('../CLData/Sprites/3004.json'),
    },{
        race: 'Dwarf',
        gender: 'male',
        armed: true,
        cloaked: false,
		variant: 'alternate',
        imageId: 1839,
        ...require('../CLData/Sprites/1839.json'),
    },{
        race: 'Dwarf',
        gender: 'female',
        armed: true,
        cloaked: false,
        imageId: 459,
        ...require('../CLData/Sprites/459.json'),
    },{
        race: 'Dwarf',
        gender: 'female',
        armed: false,
        cloaked: false,
        imageId: 3011,
        ...require('../CLData/Sprites/3011.json'),
    },{
        race: 'Dwarf',
        gender: 'female',
        armed: true,
        cloaked: false,
		variant: 'alternate',
        imageId: 2951,
        ...require('../CLData/Sprites/2951.json'),
    },{
        race: 'Human',
        gender: 'male',
        armed: true,
        cloaked: false,
        imageId: 447,
        ...require('../CLData/Sprites/447.json'),
    },{
        race: 'Human',
        gender: 'male',
        armed: false,
        cloaked: false,
        imageId: 2999,
        ...require('../CLData/Sprites/2999.json'),
    },{
        race: 'Human',
        gender: 'male',
        armed: true,
        cloaked: false,
		variant: 'shoulders',
        imageId: 1841,
        ...require('../CLData/Sprites/1841.json'),
    },{
        race: 'Human',
        gender: 'male',
        armed: true,
        cloaked: false,
		variant: 'slender',
        imageId: 2166,
        ...require('../CLData/Sprites/2166.json'),
    },{
        race: 'Human',
        gender: 'female',
        armed: true,
        cloaked: false,
        imageId: 454,
        ...require('../CLData/Sprites/454.json'),
    },{
        race: 'Human',
        gender: 'female',
        armed: false,
        cloaked: false,
        imageId: 3006,
        ...require('../CLData/Sprites/3006.json'),
    },{
        race: 'Human',
        gender: 'female',
        armed: true,
        cloaked: false,
		variant: 'pants',
        imageId: 1840,
        ...require('../CLData/Sprites/1840.json'),
    },{
        race: 'Human',
        gender: 'female',
        armed: true,
        cloaked: false,
		variant: 'untucked',
        imageId: 1934,
        ...require('../CLData/Sprites/1934.json'),
    },{
        race: 'Sylvan',
        gender: 'male',
        armed: true,
        cloaked: false,
        imageId: 449,
        ...require('../CLData/Sprites/449.json'),
    },{
        race: 'Sylvan',
        gender: 'male',
        armed: false,
        cloaked: false,
        imageId: 1854,
        ...require('../CLData/Sprites/1854.json'),
    },{
        race: 'Sylvan',
        gender: 'female',
        armed: true,
        cloaked: false,
        imageId: 456,
        ...require('../CLData/Sprites/456.json'),
    },{
        race: 'Sylvan',
        gender: 'female',
        armed: false,
        cloaked: false,
        imageId: 1853,
        ...require('../CLData/Sprites/1853.json'),
    },{
        race: 'Halfling',
        gender: 'male',
        armed: true,
        cloaked: false,
        imageId: 448,
        ...require('../CLData/Sprites/448.json'),
    },{
        race: 'Halfling',
        gender: 'male',
        armed: false,
        cloaked: false,
        imageId: 3000,
        ...require('../CLData/Sprites/3000.json'),
    },{
        race: 'Halfling',
        gender: 'male',
        armed: true,
        cloaked: false,
		variant: 'alternate',
        imageId: 189,
        ...require('../CLData/Sprites/189.json'),
    },{
        race: 'Halfling',
        gender: 'female',
        armed: true,
        cloaked: false,
        imageId: 455,
        ...require('../CLData/Sprites/455.json'),
    },{
        race: 'Halfling',
        gender: 'female',
        armed: false,
        cloaked: false,
        imageId: 3007,
        ...require('../CLData/Sprites/3007.json'),
    },{
        race: 'Halfling',
        gender: 'female',
        armed: true,
        cloaked: false,
		variant: 'alternate',
        imageId: 1426,
        ...require('../CLData/Sprites/1426.json'),
    },{
        race: 'Fen\'Neko',
        gender: 'male',
        armed: true,
        cloaked: false,
        imageId: 450,
        ...require('../CLData/Sprites/450.json'),
    },{
        race: 'Fen\'Neko',
        gender: 'male',
        armed: false,
        cloaked: false,
        imageId: 3002,
        ...require('../CLData/Sprites/3002.json'),
    },{
        race: 'Fen\'Neko',
        gender: 'male',
        armed: true,
        cloaked: false,
		variant: 'alternate',
        imageId: 3665,
        ...require('../CLData/Sprites/3665.json'),
    },{
        race: 'Fen\'Neko',
        gender: 'male',
        armed: false,
        cloaked: false,
		variant: 'alternate',
        imageId: 4419,
        ...require('../CLData/Sprites/4419.json'),
    },{
        race: 'Fen\'Neko',
        gender: 'female',
        armed: true,
        cloaked: false,
        imageId: 457,
        ...require('../CLData/Sprites/457.json'),
    },{
        race: 'Fen\'Neko',
        gender: 'female',
        armed: false,
        cloaked: false,
        imageId: 3009,
        ...require('../CLData/Sprites/3009.json'),
    },{
        race: 'Fen\'Neko',
        gender: 'female',
        armed: true,
        cloaked: false,
		variant: 'no shoulders',
        imageId: 4404,
        ...require('../CLData/Sprites/4404.json'),
    },{
        race: 'Fen\'Neko',
        gender: 'female',
        armed: true,
        cloaked: false,
		variant: 'skirt',
        imageId: 4513,
        ...require('../CLData/Sprites/4513.json'),
    },{
        race: 'Undisclosed',
        gender: 'male',
        armed: true,
        cloaked: false,
        imageId: 3013,
        ...require('../CLData/Sprites/3013.json'),
    },{
        race: 'Undisclosed',
        gender: 'male',
        armed: false,
        cloaked: false,
        imageId: 22,
        ...require('../CLData/Sprites/22.json'),
    },{
        race: 'Undisclosed',
        gender: 'female',
        armed: true,
        cloaked: false,
        imageId: 3014,
        ...require('../CLData/Sprites/3014.json'),
    },{
        race: 'Undisclosed',
        gender: 'female',
        armed: false,
        cloaked: false,
        imageId: 1583,
        ...require('../CLData/Sprites/1583.json'),
    },{
        race: 'Undisclosed',
        gender: 'female',
        armed: false,
        cloaked: false,
		variant: 'alternate',
        imageId: 131,
        ...require('../CLData/Sprites/131.json'),
    }
];
