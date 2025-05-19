import type {Pizza} from "@/types/ch08/Pizza";
import {ref, type Ref} from 'vue';

export function usePizzas(): {pizzas: Ref<Pizza[]>}{
    const URL = 'https://res.cloudinary.com/mayashavin/image/upload/v1643005556/Demo/';

    return{
        pizzas: ref([
            {
                id: '1',
                title: 'Pina Colada Pizza',
                price: "10.00",
                description:'A delicious combination of pineapple, coconut, and coconut milk',
                image:URL+'pina_colada_pizza.jpg',
                quantity: 1,
            
            },
            {
                id: '2',
                title: 'Pepperoni Pizza',
                price:'12.00',
                description:'A delicious combination of pepperoni, cheese, and pineapple',
                image:URL+'pepperoni_pizza.jpg',
                quantity: 2,
            
            },
            {
                id: '3',
                title: 'Veggie Pizza',
                price: '9.00',
                description: 'A delicious combination of mushrooms, onions, and peppers.',
                image: URL+'veggie_pizza.jpg',
                quantity: 1,
            
            },
            {
                id: "4",
                title: "Hawaiian Pizza",
                price: "11.00",
                description:
                "A delicious combination of ham, pineapple, and pineapple.",
                quantity: 5,
                image:
                "https://res.cloudinary.com/mayashavin/image/upload/v1643005556/Demo/hawaiian_pizza.jpg",
            },
            {
                id: '5',
                title: 'Meat Lovers Pizzas',
                price: '13.00',
                description: 'A delicious combination of pepperoni, sausage, and bacon.',
                image: URL+'meat_lovers_pizza.jpg',
                quantity: 3,
            
            },
            {
                id: '6',
                title: 'Supreme Pizza',
                price: '15.00',
                description: 'A delicious combination of pepperoni, sausage, bacon, and pepperoni.',
                image: URL+'/supreme_pizza.jpg',
                quantity: 1,
            
            },

        ])
    }
}