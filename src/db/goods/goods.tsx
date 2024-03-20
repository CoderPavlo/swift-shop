import backpack from './images/backpack.png'
import bed from './images/bed.png'
import blender from './images/blender.png'
import briefcase from './images/briefcase.png'
import canon_camera from './images/canon_camera.png'
import casio_watch from './images/casio_watch.png'
import childrens_bicycle from './images/childrens_bicycle.png'
import cofee_machine from './images/cofee_machine.png'
import coffee_machine from './images/coffee_machine.png'
import computer_desk from './images/computer_desk.png'
import computer_mouse from './images/computer_mouse.png'
import cosmetic_set from './images/cosmetic_set.png'
import electric_toothbrush from './images/electric_toothbrush.png'
import fitness_bracelet from './images/fitness_bracelet.png'
import gift_set from './images/gift_set.png'
import golf_club from './images/golf_club.png'
import guitar from './images/guitar.png'
import hammer from './images/hammer.png'
import imitation_jewelry from './images/imitation_jewelry.png'
import jacket from './images/jacket.png'
import laptop from './images/laptop.png'
import linen from './images/linen.png'
import massage_chair from './images/massage_chair.png'
import mens_boots from './images/mens_boots.png'
import multimedia_projector from './images/multimedia_projector.png'
import music_player from './images/music_player.png'
import notebook from './images/notebook.png'
import pan from './images/pan.png'
import pants from './images/pants.png'
import perfume from './images/perfume.png'
import pillow from './images/pillow.png'
import rocking_chair from './images/rocking_chair.png'
import rollerskates from './images/rollerskates.png'
import samsung_smartphone from './images/samsung_smartphone.png'
import sleeping_bag from './images/sleeping_bag.png'
import sleeping_set from './images/sleeping_set.png'
import slippers from './images/slippers.png'
import sony_video_camera from './images/sony_video_camera.png'
import sports_bag from './images/sports_bag.png'
import sunglasses from './images/sunglasses.png'
import t_shirt from './images/t_shirt.png'
import table_clock from './images/table_clock.png'
import tablecloth from './images/tablecloth.png'
import telephone_chair from './images/telephone_chair.png'
import toy_robot from './images/toy_robot.png'
import treadmill from './images/treadmill.png'
import vacuum_cleaner from './images/vacuum_cleaner.png'
import wallet from './images/wallet.png'
import water_filter from './images/water_filter.png'
import wedding_dress from './images/wedding_dress.png'




export interface IGoods {
    id: number,
    name: string,
    score: number,
    price: number,
    discount: number,
    image: string,
}

export const goods: IGoods[] = [
    { id: 1, name: 'Легка куртка', score: 4.5, price: 59.99, discount: 0, image: jacket },
    { id: 2, name: 'Ноутбук HP', score: 4.2, price: 899.99, discount: 15, image: laptop },
    { id: 3, name: 'Фітнес-браслет', score: 4.0, price: 39.99, discount: 5, image: fitness_bracelet },
    { id: 4, name: 'Кавоварка', score: 4.8, price: 79.99, discount: 2, image: cofee_machine },
    { id: 5, name: 'Спортивні штани', score: 4.3, price: 29.99, discount: 1, image: pants },
    { id: 6, name: 'Годинник Casio', score: 4.6, price: 149.99, discount: 12, image: casio_watch },
    { id: 7, name: 'Подушка', score: 4.5, price: 19.99, discount: 0, image: pillow },
    { id: 8, name: 'Компютерна мишка', score: 4.4, price: 49.99, discount: 15, image: computer_mouse },
    { id: 9, name: 'Парфуми', score: 4.7, price: 69.99, discount: 18, image: perfume },
    { id: 10, name: 'Смартфон Samsung', score: 4.1, price: 599.99, discount: 2, image: samsung_smartphone },
    { id: 11, name: 'Рюкзак', score: 4.2, price: 39.99, discount: 1, image: backpack },
    { id: 12, name: 'Блокнот', score: 4.6, price: 9.99, discount: 0, image: notebook },
    { id: 13, name: 'Гаманець', score: 4.3, price: 14.99, discount: 0, image: wallet },
    { id: 14, name: 'Фотоапарат Canon', score: 4.8, price: 449.99, discount: 2, image: canon_camera },
    { id: 15, name: 'Постільна білизна', score: 4.5, price: 29.99, discount: 1, image: linen },
    { id: 16, name: 'Молоток', score: 4.7, price: 5.99, discount: 5, image: hammer },
    { id: 17, name: 'Весільне плаття', score: 4.9, price: 299.99, discount: 25, image: wedding_dress },
    { id: 18, name: 'Чоловічі чоботи', score: 4.4, price: 79.99, discount: 15, image: mens_boots },
    { id: 19, name: 'Блендер', score: 4.2, price: 34.99, discount: 1, image: blender },
    { id: 20, name: 'Музичний програвач', score: 4.6, price: 89.99, discount: 12, image: music_player },
    { id: 21, name: 'Спальний мішок', score: 4.3, price: 49.99, discount: 1, image: sleeping_bag },
    { id: 22, name: 'Гітара', score: 4.8, price: 199.99, discount: 2, image: guitar },
    { id: 23, name: 'Спортивна сумка', score: 4.5, price: 24.99, discount: 0, image: sports_bag },
    { id: 24, name: 'Відеокамера Sony', score: 4.4, price: 549.99, discount: 18, image: sony_video_camera },
    { id: 25, name: 'Теніски', score: 4.7, price: 14.99, discount: 0, image: t_shirt },
    { id: 26, name: 'Кавоварка', score: 4.3, price: 29.99, discount: 1, image: coffee_machine },
    { id: 27, name: 'Спальний комплект', score: 4.5, price: 39.99, discount: 12, image: sleeping_set },
    { id: 28, name: 'Подарунковий набір', score: 4.2, price: 19.99, discount: 0, image: gift_set },
    { id: 29, name: 'Водяний фільтр', score: 4.6, price: 59.99, discount: 15, image: water_filter },
    { id: 30, name: 'Іграшковий робот', score: 4.4, price: 49.99, discount: 0, image: toy_robot },
    { id: 31, name: 'Косметичний набір', score: 4.7, price: 29.99, discount: 0, image: cosmetic_set },
    { id: 32, name: 'Ліжко', score: 4.8, price: 199.99, discount: 2, image: bed },
    { id: 33, name: 'Дитячий велосипед', score: 4.5, price: 79.99, discount: 8, image: childrens_bicycle },
    { id: 34, name: 'Скатертина', score: 4.2, price: 9.99, discount: 0, image: tablecloth },
    { id: 35, name: 'Годинник настільний', score: 4.6, price: 29.99, discount: 0, image: table_clock },
    { id: 36, name: 'Пилосос', score: 4.3, price: 149.99, discount: 15, image: vacuum_cleaner },
    { id: 37, name: 'Капці', score: 4.4, price: 14.99, discount: 8, image: slippers },
    { id: 38, name: "Комп'ютерний стіл", score: 4.7, price: 89.99, discount: 12, image: computer_desk },
    { id: 39, name: 'Роликові ковзани', score: 4.8, price: 49.99, discount: 0, image: rollerskates },
    { id: 40, name: 'Телефонний стілець', score: 4.5, price: 19.99, discount: 0, image: telephone_chair },
    { id: 41, name: 'Мультимедійний проектор', score: 4.6, price: 299.99, discount: 0, image: multimedia_projector },
    { id: 42, name: 'Сковорода', score: 4.3, price: 24.99, discount: 0, image: pan },
    { id: 43, name: 'Бігова доріжка', score: 4.4, price: 599.99, discount: 15, image: treadmill },
    { id: 44, name: 'Масажне крісло', score: 4.7, price: 999.99, discount: 8, image: massage_chair },
    { id: 45, name: 'Біжутерія', score: 4.5, price: 9.99, discount: 0, image: imitation_jewelry },
    { id: 46, name: 'Портфель', score: 4.8, price: 39.99, discount: 0, image: briefcase },
    { id: 47, name: 'Сонячні окуляри', score: 4.2, price: 19.99, discount: 12, image: sunglasses },
    { id: 48, name: 'Гольф клюшка', score: 4.6, price: 9.99, discount: 0, image: golf_club },
    { id: 49, name: 'Крісло-гойдалка', score: 4.4, price: 79.99, discount: 0, image: rocking_chair },
    { id: 50, name: 'Електрична зубна щітка', score: 4.7, price: 34.99, discount: 15, image: electric_toothbrush },
    { id: 51, name: 'Легка куртка', score: 4.5, price: 59.99, discount: 0, image: jacket },
    { id: 52, name: 'Ноутбук HP', score: 4.2, price: 899.99, discount: 15, image: laptop },
    { id: 53, name: 'Фітнес-браслет', score: 4.0, price: 39.99, discount: 5, image: fitness_bracelet },
    { id: 54, name: 'Кавоварка', score: 4.8, price: 79.99, discount: 2, image: cofee_machine },
    { id: 55, name: 'Спортивні штани', score: 4.3, price: 29.99, discount: 1, image: pants },
    { id: 56, name: 'Годинник Casio', score: 4.6, price: 149.99, discount: 12, image: casio_watch },
    { id: 57, name: 'Подушка', score: 4.5, price: 19.99, discount: 0, image: pillow },
    { id: 58, name: 'Компютерна мишка', score: 4.4, price: 49.99, discount: 15, image: computer_mouse },
    { id: 59, name: 'Парфуми', score: 4.7, price: 69.99, discount: 18, image: perfume },
    { id: 60, name: 'Смартфон Samsung', score: 4.1, price: 599.99, discount: 2, image: samsung_smartphone },
];
