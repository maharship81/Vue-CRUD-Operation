<script>
import axios from "axios";
export default {
  name: "EventService",
  data() {
    return {
      info: null,
    };
  },
  GetAllConversionCurrencyRates(data) {
    return axios
      .get(
        `https://localhost:44362/Api/v1/BLGD/GetAllConversionCurrencyRates?CurrencyISOCode=${JSON.stringify(
          data
        )}`
      )
      .then((response) => (this.info = response.data));
  },
  async AddEmployee(data) {
    const EmployeeData = JSON.parse(JSON.stringify(data));
    let Data = {
      Employee: EmployeeData,
    };
    return await axios
      .post(`http://localhost:8080/pratical/v1/Employee/AddEmployee`, Data)
      .then((response) => (this.info = response.data));
  },
  async GetListPurchaseOrder() {
    return await axios
      .get(`https://localhost:44362/Api/v1/BLGD/GetPurchaseOrders`)
      .then((response) => (this.info = response.data));
  },
  AddPurchaseOrder(Data) {
    return axios
      .post(`http://localhost:8080/Api/v1/BLGD/AddPurchaseDetail`, Data)
      .then((response) => {
        console.warn(response.data);})
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>