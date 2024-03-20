import { IGoods } from "../goods/goods";
import briefcase from '../goods/images/briefcase.png'
import canon_camera from '../goods/images/canon_camera.png'
import cofee_machine from '../goods/images/cofee_machine.png'
import computer_desk from '../goods/images/computer_desk.png'
import cosmetic_set from '../goods/images/cosmetic_set.png'
import fitness_bracelet from '../goods/images/fitness_bracelet.png'
import guitar from '../goods/images/guitar.png'
import hammer from '../goods/images/hammer.png'
import imitation_jewelry from '../goods/images/imitation_jewelry.png'
import laptop from '../goods/images/laptop.png'
import multimedia_projector from '../goods/images/multimedia_projector.png'
import rollerskates from '../goods/images/rollerskates.png'
import samsung_smartphone from '../goods/images/samsung_smartphone.png'
import telephone_chair from '../goods/images/telephone_chair.png'
import toy_robot from '../goods/images/toy_robot.png'
import vacuum_cleaner from '../goods/images/vacuum_cleaner.png'
import water_filter from '../goods/images/water_filter.png'

export interface IOrder {
    id: number,
    date: Date,
    shop: string,
    shopId: number,
    status: number,
    goods: IGoods[],
    total: number,
}
//Додати кількість до товару
export const orders: IOrder[] = [
    { id: 1, shop: "ЕлектроСвіт", shopId: 0, status: 0, total: 200, date: new Date(), goods: [
        { id: 4, name: 'Кавоварка', score: 4.8, price: 79.99, discount: 2, image: cofee_machine },
        { id: 22, name: 'Гітара', score: 4.8, price: 199.99, discount: 2, image: guitar },
    ] },
    { id: 2, shop: "ГаджетПлаза", shopId: 0, status: 1, total: 200, date: new Date(), goods: [
        { id: 2, name: 'Ноутбук HP', score: 4.2, price: 899.99, discount: 15, image: laptop },
    ] },
    { id: 3, shop: "МегаТехніка", shopId: 0, status: 2, total: 200, date: new Date(), goods: [
        { id: 36, name: 'Пилосос', score: 4.3, price: 149.99, discount: 15, image: vacuum_cleaner },
        { id: 16, name: 'Молоток', score: 4.7, price: 5.99, discount: 5, image: hammer },

    ] },
    { id: 4, shop: "СуперГаджет", shopId: 0, status: 2, total: 200, date: new Date(), goods: [
        { id: 29, name: 'Водяний фільтр', score: 4.6, price: 59.99, discount: 15, image: water_filter },
        { id: 30, name: 'Іграшковий робот', score: 4.4, price: 49.99, discount: 0, image: toy_robot },
        { id: 31, name: 'Косметичний набір', score: 4.7, price: 29.99, discount: 0, image: cosmetic_set },

    ] },
    { id: 5, shop: "ГіперЕлектроніка", shopId: 0, status: 3, total: 200, date: new Date(), goods: [
        { id: 45, name: 'Біжутерія', score: 4.5, price: 9.99, discount: 0, image: imitation_jewelry },
        { id: 46, name: 'Портфель', score: 4.8, price: 39.99, discount: 0, image: briefcase },

    ] },
    { id: 6, shop: "ТехноУніверс", shopId: 0, status: 3, total: 200, date: new Date(), goods: [
        { id: 10, name: 'Смартфон Samsung', score: 4.1, price: 599.99, discount: 2, image: samsung_smartphone },
    ] },
    { id: 7, shop: "ФутурТехніка", shopId: 0, status: 3, total: 200, date: new Date(), goods: [
        { id: 41, name: 'Мультимедійний проектор', score: 4.6, price: 299.99, discount: 0, image: multimedia_projector },
    ] },
    { id: 8, shop: "ЕлектроМайстер", shopId: 0, status: 3, total: 200, date: new Date(), goods: [
        { id: 53, name: 'Фітнес-браслет', score: 4.0, price: 39.99, discount: 5, image: fitness_bracelet },
        { id: 54, name: 'Кавоварка', score: 4.8, price: 79.99, discount: 2, image: cofee_machine },
    ] },
    { id: 9, shop: "ГітеТехнік", shopId: 0, status: 3, total: 200, date: new Date(), goods: [
        { id: 14, name: 'Фотоапарат Canon', score: 4.8, price: 449.99, discount: 2, image: canon_camera },
    ] },
    { id: 10, shop: "ГлобальГаджет", shopId: 0, status: 3, total: 200, date: new Date(), goods: [
        { id: 38, name: "Комп'ютерний стіл", score: 4.7, price: 89.99, discount: 12, image: computer_desk },
        { id: 39, name: 'Роликові ковзани', score: 4.8, price: 49.99, discount: 0, image: rollerskates },
        { id: 40, name: 'Телефонний стілець', score: 4.5, price: 19.99, discount: 0, image: telephone_chair },
    ] },
];