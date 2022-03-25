<template>
  <Header />
  <h1>PurchaseOrder</h1>
  <div class="container-fluid">
    <table class="table">
      <thead>
        <tr>
          <th>Code</th>
          <th>InvoiceNo</th>
          <th>Item Name</th>
          <th>Date</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody v-for="item in PurchaseOrder" :key="item.code">
        <tr>
          <td>{{item.code}}</td>
          <td>{{item.invoiceNo}}</td>
          <td>{{item.itemName}}</td>
          <td>{{item.date}}</td>
          <td>{{item.qty}}</td>
          <td>{{item.rate}}</td>
          <td>{{item.amount}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Header from "@/Template/Header.vue";
import Service from "@/EventService/Service.vue";
export default {
  components: { Header },
  name: "ListPurchaseOrder",
  data() {
    return {
      PurchaseOrder: [],
    };
  },
  mounted() {
    this.ListPurchaseOrder();
  },
  methods: {
    async ListPurchaseOrder() {
      let LstPurchaseOrder = await Service.GetListPurchaseOrder();
      console.warn(LstPurchaseOrder);
      if (LstPurchaseOrder.isSuccess == true) {
        this.PurchaseOrder = LstPurchaseOrder.data;
      }
    },
  },
};
</script>