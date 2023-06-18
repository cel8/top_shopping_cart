import pizzaCalzone from '@assets/pizza-calzone-classico.jpg';
import pizzaCapricciosa from '@assets/pizza-capricciosa.jpg';
import pizzaMargheritaDOP from '@assets/pizza-margherita-dop.jpg';
import pizzaMarinara from '@assets/pizza-marinara.jpg';
import pizzaPomodorini from '@assets/pizza-pomodorini.jpg';
import pizzaRicotta from '@assets/pizza-ricotta.jpg';
import pizzaMargheritaSbagliata from '@assets/pizza-margherita-sbagliata.jpg';
import pizzaScarpetta from '@assets/pizza-scarpetta.jpg';
import uniqid from 'uniqid';

const productsList = [
  {
    id: `pizza_${uniqid()}`,
    to: 'product/1',
    category: 'classic',
    name: 'Calzone Classico',
    description: 'Folded pizza with fiordilatte cheese, San Marzano tomato, prosciutto cotto (cooked ham), basil and Evo oil.',
    price: 8.00,
    image: pizzaCalzone
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/2',
    category: 'classic',
    name: 'Capricciosa',
    description: 'San Marzano tomato, fiordilatte cheese, capers, Cetara anchovy fillets, mushrooms, prosciutto cotto (cooked ham), Paestum artichokes, mushrooms, Caiazzo olives, oregano, Evo oil.',
    price: 9.00,
    image: pizzaCapricciosa
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/3',
    category: 'classic',
    name: 'Margherita DOP',
    description: 'San Marzano DOP tomato, Campana DOP buffalo mozzarella, basil and EVO oil.',
    price: 8.50,
    image: pizzaMargheritaDOP
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/4',
    category: 'classic',
    name: 'Marinara',
    description: 'San Marzano tomato, oregano, garlic and EVO oil.',
    price: 6.00,
    image: pizzaMarinara
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/5',
    category: 'special',
    name: 'Margherita Sbagliata',
    description: 'Campana DOP Buffalo mozzarella cheese, purée of "riccio" tomatoes, basil reduction, Evo oil.',
    price: 10.00,
    image: pizzaMargheritaSbagliata
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/6',
    category: 'special',
    name: 'Sfizio ai pomodori',
    description: 'Campana DOP buffalo mozzarella, yellow datterino tomatoes, sun dried tomatoes, 24-month Grana Padano DOP cheese, EVO oil.',
    price: 12.00,
    image: pizzaPomodorini
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/7',
    category: 'special',
    name: 'Sapori del Cilento',
    description: 'Campana DOP buffalo mozzarella, buffalo ricotta cheese, Paestum artichokes, EVO oil.',
    price: 12.00,
    image: pizzaRicotta
  },
  {
    id: `pizza_${uniqid()}`,
    to: 'product/8',
    category: 'special',
    name: 'Scarpetta',
    description: 'Campana DOP Buffalo mozzarella, 12-month Grana Padano fondue, uncooked tomato compote, freeze-dried pesto basil, flakes of 24-month Grana Padano DOP cheese.',
    price: 12.00,
    image: pizzaScarpetta
  }
];

export default productsList;
