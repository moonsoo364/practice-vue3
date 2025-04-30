
import { defineComponent } from 'vue'

export const retraurantMixin =  defineComponent({

    data(){
        return {
            menu: [],
            reservations: [],
            payments: [],
            title: 'Resturant',
        };
    },
    methods:{
        makeReservation(){
            console.log("Reservation made");
        },
        acceptPayment(){
            console.log("Payment accepted");
        }
    },
    created(){
        console.log(`Welcome to ${this.title}`);
    }
})

