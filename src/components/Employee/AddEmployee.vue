<template>
<Header/>
    <h1>Add Employee</h1>
    <form class="Add">
        <input type="text" v-model="this.employee.Name" placeholder="Enter Name">
        <input type="text" v-model="this.employee.MobileNo" placeholder="Enter MobileNo">
        <input type="checkbox" v-model="this.employee.IsActive" placeholder="Enter IsActive">
        <input type="text" v-model="this.employee.Address" placeholder="Enter Address">
        <input type="date" v-model="this.employee.JoinningDate" placeholder="Enter JoinningDate">
        <input type="text" v-model="this.employee.Rate" placeholder="Enter Rate">
        <input type="text" v-model="this.employee.NetAmount" placeholder="Enter NetAmount">
        <button type="button" v-on:click="AddEmployees">Add New Employee</button>
    </form>
</template>
<script>
import Service from "@/EventService/Service.vue";
import Header from '@/Template/Header.vue'
export default {
  components: { Header },
    name:'AddEmployee',
    data() {
        return{
            employee:{
                Name:'',
                Mobile:'',
                IsActive:'',
                Address:'',
                JoinningDate:'',
                Rate:'',
                NetAmount:'',
            }
        }
    },
    methods:{
        async AddEmployees(){
            let Add = await Service.AddEmployee(this.employee);
            console.warn(Add);
        }
    }
}
</script>