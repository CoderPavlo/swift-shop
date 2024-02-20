import { ISubCategories } from "../categories";

import smartphones_accessories from './images/smartphones_accessories.png'
import laptops_computers from './images/laptops_computers.png'
import televisions_audio_systems from './images/televisions_audio_systems.png'
import photo_video_equipment from './images/photo_video_equipment.png'
import household_appliances from './images/household_appliances.png'

import fitness_equipment from './images/fitness_equipment.png'
import bicycles_accessories from './images/bicycles_accessories.png'
import tourist_equipment from './images/tourist_equipment.png'
import fishing_tools from './images/fishing_tools.png'
import sports_nutrition from './images/sports_nutrition.png'

import womens_clothes from "./images/women's_clothes.png"
import mens_clothes from "./images/men's_clothes.png"
import hats from './images/hats.png'
import childrens_clothes from "./images/children's_clothes.png"
import thermal_clothes from './images/thermal_clothes.png'

import shoesImg from "./images/shoes.png"
import sneakers from "./images/sneakers.png"
import boots from './images/boots.png'
import slippers from "./images/slippers.png"
import work_protective_footwear from './images/work_protective_footwear.png'

import watches_bracelets from "./images/watches_bracelets.png"
import glasses from "./images/glasses.png"
import bags_briefcases from './images/bags_briefcases.png'
import scarves_handkerchiefs from "./images/scarves_handkerchiefs.png"
import jewelry from './images/jewelry.png'

import dishes from "./images/dishes.png"
import decor from "./images/decor.png"
import cleaning from './images/cleaning.png'
import bed_linen_towels from "./images/bed_linen_towels.png"
import office_supplies from './images/office_supplies.png'

import makeup from "./images/makeup.png"
import hair_products from "./images/hair_products.png"
import perfumery from './images/perfumery.png'
import body_care from "./images/body_care.png"
import manicure from './images/manicure.png'

import power_tools from "./images/power_tools.png"
import hand_tools from "./images/hand_tools.png"
import garden_equipment from './images/garden_equipment.png'
import building_materials from "./images/building_materials.png"
import automotive_tools from './images/automotive_tools.png'

import board_games from "./images/board_games.png"
import video_games from "./images/video_games.png"
import stuffed_animals from './images/stuffed_animals.png'
import game_consoles_accessories from "./images/game_consoles_accessories.png"
import designer from './images/designer.png'

import upholstered_furniture from "./images/upholstered_furniture.png"
import cabinets from "./images/cabinets.png"
import kitchen_furniture from './images/kitchen_furniture.png'
import office_furniture from "./images/office_furniture.png"
import tables_chairs from './images/tables_chairs.png'

export const electronics : ISubCategories[] = [
    {
        id: 0,
        name: 'Смартфони та аксесуари',
        image: smartphones_accessories,
    },
    {
        id: 1,
        name: "Ноутбуки та комп'ютери",
        image: laptops_computers,
    },
    {
        id: 2,
        name: 'Телевізори та аудіо',
        image: televisions_audio_systems,
    },
    {
        id: 3,
        name: 'Фото та відеотехніка',
        image: photo_video_equipment,
    },
    {
        id: 4,
        name: 'Побутова техніка',
        image: household_appliances,
    },
]
export const sport : ISubCategories[] = [
    {
        id: 0,
        name: 'Фітнес-обладнання',
        image: fitness_equipment,
    },
    {
        id: 1,
        name: "Велосипеди та аксесуари",
        image: bicycles_accessories,
    },
    {
        id: 2,
        name: 'Туристичне спорядження',
        image: tourist_equipment,
    },
    {
        id: 3,
        name: 'Рибальські знаряддя',
        image: fishing_tools,
    },
    {
        id: 4,
        name: 'Спортивне харчування',
        image: sports_nutrition,
    },
]
export const clothes : ISubCategories[] = [
    {
        id: 0,
        name: 'Жіночий одяг',
        image: womens_clothes,
    },
    {
        id: 1,
        name: "Чоловічий одяг",
        image: mens_clothes,
    },
    {
        id: 2,
        name: 'Головні убори',
        image: hats,
    },
    {
        id: 3,
        name: 'Дитячий одяг',
        image: childrens_clothes,
    },
    {
        id: 4,
        name: 'Термобілизна',
        image: thermal_clothes,
    },
]
export const shoes : ISubCategories[] = [
    {
        id: 0,
        name: 'Туфлі',
        image: shoesImg,
    },
    {
        id: 1,
        name: "Кросівки",
        image: sneakers,
    },
    {
        id: 2,
        name: 'Черевики',
        image: boots,
    },
    {
        id: 3,
        name: 'Тапочки',
        image: slippers,
    },
    {
        id: 4,
        name: 'Робоче та захисне взуття',
        image: work_protective_footwear,
    },
]
export const accessories : ISubCategories[] = [
    {
        id: 0,
        name: 'Годинники та браслети',
        image: watches_bracelets,
    },
    {
        id: 1,
        name: "Окуляри",
        image: glasses,
    },
    {
        id: 2,
        name: 'Сумки та портфелі',
        image: bags_briefcases,
    },
    {
        id: 3,
        name: 'Шарфи та платки',
        image: scarves_handkerchiefs,
    },
    {
        id: 4,
        name: 'Ювелірні вироби',
        image: jewelry,
    },
]
export const home : ISubCategories[] = [
    {
        id: 0,
        name: 'Посуд',
        image: dishes,
    },
    {
        id: 1,
        name: "Постільна білизна та рушники",
        image: bed_linen_towels,
    },
    {
        id: 2,
        name: 'Декор',
        image: decor,
    },
    {
        id: 3,
        name: 'Для прибирання',
        image: cleaning,
    },
    {
        id: 4,
        name: 'Канцелярські товари',
        image: office_supplies,
    },
]
export const beauty : ISubCategories[] = [
    {
        id: 0,
        name: 'Косметика',
        image: makeup,
    },
    {
        id: 1,
        name: "Засоби для волосся",
        image: hair_products,
    },
    {
        id: 2,
        name: 'Парфумерія',
        image: perfumery,
    },
    {
        id: 3,
        name: 'Догляд за тілом',
        image: body_care,
    },
    {
        id: 4,
        name: 'Манікюр та педикюр',
        image: manicure,
    },
]
export const tools : ISubCategories[] = [
    {
        id: 0,
        name: 'Електро інструменти',
        image: power_tools,
    },
    {
        id: 1,
        name: "Ручні інструменти",
        image: hand_tools,
    },
    {
        id: 2,
        name: 'Садовий інвентар',
        image: garden_equipment,
    },
    {
        id: 3,
        name: 'Будівельні матеріали',
        image: building_materials,
    },
    {
        id: 4,
        name: 'Автомобільні інструменти',
        image: automotive_tools,
    },
]
export const games : ISubCategories[] = [
    {
        id: 0,
        name: 'Настільні ігри',
        image: board_games,
    },
    {
        id: 1,
        name: "Відеоігри",
        image: video_games,
    },
    {
        id: 2,
        name: "М'які іграшки",
        image: stuffed_animals,
    },
    {
        id: 3,
        name: 'Ігрові консолі та аксесуари',
        image: game_consoles_accessories,
    },
    {
        id: 4,
        name: 'Конструктор',
        image: designer,
    },
]
export const furniture : ISubCategories[] = [
    {
        id: 0,
        name: "М'які меблі",
        image: upholstered_furniture,
    },
    {
        id: 1,
        name: "Шафи",
        image: cabinets,
    },
    {
        id: 2,
        name: "Меблі для кухні",
        image: kitchen_furniture,
    },
    {
        id: 3,
        name: 'Офісні меблі',
        image: office_furniture,
    },
    {
        id: 4,
        name: 'Столи та стільці',
        image: tables_chairs,
    },
]