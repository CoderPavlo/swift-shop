import { IGoods } from '../../models/IGood'
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


export const goods: IGoods[] = [
    { id: 1, name: 'Легка куртка', rating: 4.5, price: 59.99, discount: 0, image: jacket, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 2, name: 'Ноутбук HP', rating: 4.2, price: 899.99, discount: 15, image: laptop, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 3, name: 'Фітнес-браслет', rating: 4.0, price: 39.99, discount: 5, image: fitness_bracelet, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 4, name: 'Кавоварка', rating: 4.8, price: 79.99, discount: 2, image: cofee_machine, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 5, name: 'Спортивні штани', rating: 4.3, price: 29.99, discount: 1, image: pants, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 6, name: 'Годинник Casio', rating: 4.6, price: 149.99, discount: 12, image: casio_watch, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 7, name: 'Подушка', rating: 4.5, price: 19.99, discount: 0, image: pillow, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 8, name: 'Компютерна мишка', rating: 4.4, price: 49.99, discount: 15, image: computer_mouse, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 9, name: 'Парфуми', rating: 4.7, price: 69.99, discount: 18, image: perfume, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 10, name: 'Смартфон Samsung', rating: 4.1, price: 599.99, discount: 2, image: samsung_smartphone, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 11, name: 'Рюкзак', rating: 4.2, price: 39.99, discount: 1, image: backpack, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 12, name: 'Блокнот', rating: 4.6, price: 9.99, discount: 0, image: notebook, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 13, name: 'Гаманець', rating: 4.3, price: 14.99, discount: 0, image: wallet, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 14, name: 'Фотоапарат Canon', rating: 4.8, price: 449.99, discount: 2, image: canon_camera, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 15, name: 'Постільна білизна', rating: 4.5, price: 29.99, discount: 1, image: linen, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 16, name: 'Молоток', rating: 4.7, price: 5.99, discount: 5, image: hammer, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 17, name: 'Весільне плаття', rating: 4.9, price: 299.99, discount: 25, image: wedding_dress, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 18, name: 'Чоловічі чоботи', rating: 4.4, price: 79.99, discount: 15, image: mens_boots, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 19, name: 'Блендер', rating: 4.2, price: 34.99, discount: 1, image: blender, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 20, name: 'Музичний програвач', rating: 4.6, price: 89.99, discount: 12, image: music_player, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 21, name: 'Спальний мішок', rating: 4.3, price: 49.99, discount: 1, image: sleeping_bag, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 22, name: 'Гітара', rating: 4.8, price: 199.99, discount: 2, image: guitar, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 23, name: 'Спортивна сумка', rating: 4.5, price: 24.99, discount: 0, image: sports_bag, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 24, name: 'Відеокамера Sony', rating: 4.4, price: 549.99, discount: 18, image: sony_video_camera, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 25, name: 'Теніски', rating: 4.7, price: 14.99, discount: 0, image: t_shirt, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 26, name: 'Кавоварка', rating: 4.3, price: 29.99, discount: 1, image: coffee_machine, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 27, name: 'Спальний комплект', rating: 4.5, price: 39.99, discount: 12, image: sleeping_set, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 28, name: 'Подарунковий набір', rating: 4.2, price: 19.99, discount: 0, image: gift_set, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 29, name: 'Водяний фільтр', rating: 4.6, price: 59.99, discount: 15, image: water_filter, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 30, name: 'Іграшковий робот', rating: 4.4, price: 49.99, discount: 0, image: toy_robot, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 31, name: 'Косметичний набір', rating: 4.7, price: 29.99, discount: 0, image: cosmetic_set, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 32, name: 'Ліжко', rating: 4.8, price: 199.99, discount: 2, image: bed, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 33, name: 'Дитячий велосипед', rating: 4.5, price: 79.99, discount: 8, image: childrens_bicycle, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 34, name: 'Скатертина', rating: 4.2, price: 9.99, discount: 0, image: tablecloth, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 35, name: 'Годинник настільний', rating: 4.6, price: 29.99, discount: 0, image: table_clock, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 36, name: 'Пилосос', rating: 4.3, price: 149.99, discount: 15, image: vacuum_cleaner, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 37, name: 'Капці', rating: 4.4, price: 14.99, discount: 8, image: slippers, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 38, name: "Комп'ютерний стіл", rating: 4.7, price: 89.99, discount: 12, image: computer_desk, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 39, name: 'Роликові ковзани', rating: 4.8, price: 49.99, discount: 0, image: rollerskates, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 40, name: 'Телефонний стілець', rating: 4.5, price: 19.99, discount: 0, image: telephone_chair, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 41, name: 'Мультимедійний проектор', rating: 4.6, price: 299.99, discount: 0, image: multimedia_projector, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 42, name: 'Сковорода', rating: 4.3, price: 24.99, discount: 0, image: pan, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 43, name: 'Бігова доріжка', rating: 4.4, price: 599.99, discount: 15, image: treadmill, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 44, name: 'Масажне крісло', rating: 4.7, price: 999.99, discount: 8, image: massage_chair, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 45, name: 'Біжутерія', rating: 4.5, price: 9.99, discount: 0, image: imitation_jewelry, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 46, name: 'Портфель', rating: 4.8, price: 39.99, discount: 0, image: briefcase, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 47, name: 'Сонячні окуляри', rating: 4.2, price: 19.99, discount: 12, image: sunglasses, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 48, name: 'Гольф клюшка', rating: 4.6, price: 9.99, discount: 0, image: golf_club, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 49, name: 'Крісло-гойдалка', rating: 4.4, price: 79.99, discount: 0, image: rocking_chair, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 50, name: 'Електрична зубна щітка', rating: 4.7, price: 34.99, discount: 15, image: electric_toothbrush, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 51, name: 'Легка куртка', rating: 4.5, price: 59.99, discount: 0, image: jacket, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 52, name: 'Ноутбук HP', rating: 4.2, price: 899.99, discount: 15, image: laptop, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 53, name: 'Фітнес-браслет', rating: 4.0, price: 39.99, discount: 5, image: fitness_bracelet, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 54, name: 'Кавоварка', rating: 4.8, price: 79.99, discount: 2, image: cofee_machine, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 55, name: 'Спортивні штани', rating: 4.3, price: 29.99, discount: 1, image: pants, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 56, name: 'Годинник Casio', rating: 4.6, price: 149.99, discount: 12, image: casio_watch, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 57, name: 'Подушка', rating: 4.5, price: 19.99, discount: 0, image: pillow, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 58, name: 'Компютерна мишка', rating: 4.4, price: 49.99, discount: 15, image: computer_mouse, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 59, name: 'Парфуми', rating: 4.7, price: 69.99, discount: 18, image: perfume, description: '', count: 100, categoriesID: [], tagsID: [] },
    { id: 60, name: 'Смартфон Samsung', rating: 4.1, price: 599.99, discount: 2, image: samsung_smartphone, description: '', count: 100, categoriesID: [], tagsID: [] },
];
