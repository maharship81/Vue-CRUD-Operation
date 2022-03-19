<script>
import axios from "axios";
export default {
  name:"EventService",
  data(){
    return{
      info:null
    }
  },
  GetAllConversionCurrencyRates(data) {
    console.warn(data);
    return axios.get(`https://localhost:44362/Api/v1/BLGD/GetAllConversionCurrencyRates?CurrencyISOCode=${JSON.stringify(data)}`).then(response=>(this.info = response.data));
  },
  async AddEmployee(data) {
    const EmployeeData = JSON.parse(JSON.stringify(data));
    let Data = {
      Employee: EmployeeData
    }
    return await axios.post(`http://localhost:8080/pratical/v1/Employee/AddEmployee`,Data).then(response=>(this.info = response.data));
  }
}
</script>