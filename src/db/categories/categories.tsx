import electronicsImage from './images/electronics.png';
import sportImage from './images/sport.png';
import clothesImage from './images/clothes.png';
import shoesImage from './images/shoes.png';
import accessoriesImage from './images/accessories.png';
import homeImage from './images/home.png';
import beautyImage from './images/beauty.png';
import toolsImage from './images/tools.png';
import toysImage from './images/toys.png';
import furnitureImage from './images/furniture.png';

import { electronics,  sport, clothes, shoes, accessories, home, beauty, tools, games, furniture} from './subCategories/subCategories';

export interface ISubCategories {
    id: number,
    name: string,
    image: string,
}

export interface ICategories extends ISubCategories {
    subCategories : ISubCategories[],
}

export const categories : ICategories[] = [
    {
        id: 0,
        name: "Електроніка",
        image: electronicsImage,
        subCategories: electronics,
    },
    {
        id: 1,
        name: "Спорт",
        image: sportImage,
        subCategories: sport,
    },
    {
        id: 2,
        name: "Одяг",
        image: clothesImage,
        subCategories: clothes,
    },
    {
        id: 3,
        name: "Взуття",
        image: shoesImage,
        subCategories: shoes,
    },
    {
        id: 4,
        name: "Аксесуари",
        image: accessoriesImage,
        subCategories: accessories,
    },
    {
        id: 5,
        name: "Для дому",
        image: homeImage,
        subCategories: home,
    },
    {
        id: 6,
        name: "Краса",
        image: beautyImage,
        subCategories: beauty,
    },
    {
        id: 7,
        name: "Інструменти",
        image: toolsImage,
        subCategories: tools,
    },
    {
        id: 8,
        name: "Ігри",
        image: toysImage,
        subCategories: games,
    },
    {
        id: 9,
        name: "Меблі",
        image: furnitureImage,
        subCategories: furniture,
    },
]

export function getRandomCategories(m:number):ISubCategories[]{
    let allCategories : ISubCategories[] = [];
    categories.forEach(element => {
        allCategories.push(...element.subCategories);
    });
    // let result : ISubCategories[]=[];
    // let n = allCategories.length;
    // for(let i = 0; i<m; i++){
    //     let j = Math.floor(Math.random()*n);
    //     result.push(allCategories[j]);
    //     allCategories.splice(j, 1);
    //     n-=1;
    // }
    return allCategories;
}