import imgPizzaCalzone from '@assets/pizza-calzone-classico.jpg';
import imgPizzaCapricciosa from '@assets/pizza-capricciosa.jpg';
import imgPizzaMargheritaDOP from '@assets/pizza-margherita-dop.jpg';
import imgPizzaMarinara from '@assets/pizza-marinara.jpg';
import imgPizzaPomodorini from '@assets/pizza-pomodorini.jpg';
import imgPizzaRicotta from '@assets/pizza-ricotta.jpg';
import imgPizzaMargheritaSbagliata from '@assets/pizza-margherita-sbagliata.jpg';
import imgPizzaScarpetta from '@assets/pizza-scarpetta.jpg';
import uniqid from 'uniqid';

const categoryList = {
  all: 'all',
  classic: 'classic',
  special: 'special'
};

const productsList = [
  {
    id: `pizza_${uniqid()}`,
    to: 'product/1',
    category: categoryList['classic'],
    name: 'Calzone Classico',
    description: 'Folded pizza with fiordilatte cheese, San Marzano tomato, prosciutto cotto (cooked ham), basil and Evo oil.',
    price: 8.00,
    image: imgPizzaCalzone
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/2',
    category: categoryList['classic'],
    name: 'Capricciosa',
    description: 'San Marzano tomato, fiordilatte cheese, capers, Cetara anchovy fillets, mushrooms, prosciutto cotto (cooked ham), Paestum artichokes, mushrooms, Caiazzo olives, oregano, Evo oil.',
    price: 9.00,
    image: imgPizzaCapricciosa
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/3',
    category: categoryList['classic'],
    name: 'Margherita DOP',
    description: 'San Marzano DOP tomato, Campana DOP buffalo mozzarella, basil and EVO oil.',
    price: 8.50,
    image: imgPizzaMargheritaDOP
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/4',
    category: categoryList['classic'],
    name: 'Marinara',
    description: 'San Marzano tomato, oregano, garlic and EVO oil.',
    price: 6.00,
    image: imgPizzaMarinara
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/5',
    category: categoryList['special'],
    name: 'Sfizio ai pomodori',
    description: 'Campana DOP buffalo mozzarella, yellow datterino tomatoes, sun dried tomatoes, 24-month Grana Padano DOP cheese, EVO oil.',
    price: 12.00,
    image: imgPizzaPomodorini
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/6',
    category: categoryList['special'],
    name: 'Sapori del Cilento',
    description: 'Campana DOP buffalo mozzarella, buffalo ricotta cheese, Paestum artichokes, EVO oil.',
    price: 12.00,
    image: imgPizzaRicotta
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/7',
    category: categoryList['special'],
    name: 'Margherita Sbagliata',
    description: 'Campana DOP Buffalo mozzarella cheese, purée of "riccio" tomatoes, basil reduction, Evo oil.',
    price: 10.00,
    image: imgPizzaMargheritaSbagliata
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/8',
    category: categoryList['special'],
    name: 'Scarpetta',
    description: 'Campana DOP Buffalo mozzarella, 12-month Grana Padano fondue, uncooked tomato compote, freeze-dried pesto basil, flakes of 24-month Grana Padano DOP cheese.',
    price: 12.00,
    image: imgPizzaScarpetta
  }
];

export { categoryList, productsList };
