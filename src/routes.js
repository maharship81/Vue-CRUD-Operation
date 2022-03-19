import { createWebHistory,createRouter } from 'vue-router';
import HomePage from "./components/Home.vue";
import ListPurchaseOrder from "./components/PurchaseOrder/ListPurchaseOrder.vue";
import AddPurchaseOrder from "./components/PurchaseOrder/AddPurchaseOrder.vue";
import AddEmployee from "./components/Employee/AddEmployee.vue";

const routes = [
    {
        name:'Home',
        path:'/',
        component:HomePage
    },
    {
        name:'ListPurchaseOrder',
        path:'/ListPurchaseOrder',
        component:ListPurchaseOrder
    },
    {
        name:'AddPurchaseOrder',
        path:'/AddPurchaseOrder',
        component:AddPurchaseOrder
    },
    {
        name:'AddEmployee',
        path:'/AddEmployee',
        component:AddEmployee
    }
    
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;