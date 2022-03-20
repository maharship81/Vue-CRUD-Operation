<template>
  <Header />
  <div class="container-fluid">
    <div class="form-inline PurchaseOrder">
      <h1>Purchase Order</h1>
      <div class="form-group">
        <div><label>InvoiceNo:</label></div>
        <input
          type="text"
          class="form-control"
          v-model="this.PurchaseOrder.InvoiceNo"
          placeholder="Invoice No"
        />
      </div>
      <div class="form-group">
        <div><label>Date</label></div>
        <input
          type="date"
          class="form-control"
          v-model="this.PurchaseOrder.Date"
          v-on:keyup="DateFormat"
        />
      </div>
      <div class="form-group">
        <div><label>Due Days</label></div>
        <input
          type="number"
          class="form-control"
          placeholder="Due Days"
          v-model="this.PurchaseOrder.Due"
          v-on:keyup="DateFormat"
        />
      </div>
      <div class="form-group">
        <div><label>Due Date</label></div>
        <input
          type="date"
          class="form-control"
          v-model="this.PurchaseOrder.DueDate"
        />
      </div>
      <div class="form-group">
        <div><label>Due Date</label></div>
          <Select2 v-model="ajaxOptionsSelected" :options="ajaxOptions"  :settings="{ placeholder: 'Specifies the placeholder through settings', ajax: ajax }" @change="ajaxChangeEvent($event)" @select="ajaxChangeEvent($event)" class="Select"/>
      </div>
      <div class="form-group">
        <div><label>Currency Rate</label></div>
        <input
          type="text"
          class="form-control"
          v-model="this.PurchaseOrder.CurrencyId"
        />
      </div>
    </div>
    <div class="form-inline PurchaseOrderDetail">
      <h1>Purchase Order Detail</h1>
      <div class="form-group">
        <div><label>SrNo:</label></div>
        <input
          type="text"
          class="form-control"
          placeholder="Sr No"
          v-model="this.PurchaseOrderDetail.SrNo"
          readonly
        />
      </div>
      <div class="form-group">
        <div><label>Name</label></div>
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          v-model="this.PurchaseOrderDetail.Name"
        />
      </div>
      <div class="form-group">
        <div><label>Rate</label></div>
        <input
          type="number"
          class="form-control"
          placeholder="Rate"
          v-model="this.PurchaseOrderDetail.Rate"
        />
      </div>
      <div class="form-group">
        <div><label>Qty</label></div>
        <input
          type="number"
          class="form-control"
          placeholder="Qty"
          v-model="this.PurchaseOrderDetail.Qty"
          v-on:keyup="RateAmt"
        />
      </div>
      <div class="form-group">
        <div><label>Amount</label></div>
        <input
          type="number"
          class="form-control"
          placeholder="Amount"
          v-model="this.PurchaseOrderDetail.Amount"
          readonly
        />
      </div>
      <div class="form-group">
        <button class="AddPOD btn btn-primary" v-on:click="AddPOD">Add</button>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Name</th>
              <th>Rate</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.purchaseData" :key="item.SrNo">
              <td>{{ item.SrNo }}</td>
              <td>{{ item.Name }}</td>
              <td>{{ item.Rate }}</td>
              <td>{{ item.Qty }}</td>
              <td>{{ item.Amount }}</td>
              <td>
                <button class="btn btn-danger" v-on:click="RemovePOD(event)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="Remark">
      <div class="col-md-12">
        <div class="Taxation col-md-6">
          <h1>Taxation</h1>
          <div class="Taxation form-inline">
            <div class="form-group">
              <div><label>SrNo:</label></div>
              <input
                type="text"
                class="form-control"
                placeholder="Invoice No"
                v-model="this.Taxation.SrNo"
                readonly
              />
            </div>
            <div class="form-group">
              <div><label>Tax Name:</label></div>
              <input
                type="text"
                class="form-control"
                placeholder="Tax Name"
                v-model="this.Taxation.TaxName"
              />
            </div>
            <div class="form-group">
              <div><label>Taxes%</label></div>
              <input
                type="number"
                class="form-control"
                placeholder="Taxes%"
                v-model="this.Taxation.TaxPer"
                v-on:keyup="TaxCal"
              />
            </div>
            <div class="form-group">
              <div><label>TaxesAmount</label></div>
              <input
                type="number"
                class="form-control"
                placeholder="TaxesAmount"
                v-model="this.Taxation.TaxAmount"
                readonly
              />
            </div>
            <div class="form-group">
              <button class="TaxBtn btn btn-primary" v-on:click="AddTax">
                Add
              </button>
            </div>
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>Taxes Name</th>
                    <th>Taxes %</th>
                    <th>Taxes Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in this.taxData" :key="item.SrNo">
                    <td>{{ item.SrNo }}</td>
                    <td>{{ item.TaxName }}</td>
                    <td>{{ item.TaxPer }}</td>
                    <td>{{ item.TaxAmount }}</td>
                    <td>
                      <button
                        class="btn btn-danger"
                        v-on:click="RemoveTax(index)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="Summary col-md-6">
          <h1>Total Summary</h1>
          <table>
            <tr>
              <td>Gross Amount:</td>
              <td></td>
              <td>
                <div class="col-sm-12">
                  <input
                    type="number"
                    class="form-control"
                    v-model="GrossAmt"
                    placeholder="Gross Amount"
                    readonly
                  />
                </div>
              </td>
              <td>
                <div class="col-sm-12">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Gross Amount"
                    readonly
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Tax:</td>
              <td></td>
              <td>
                <div class="col-sm-12" style="margin-top: 10px">
                  <input
                    type="number"
                    class="form-control"
                    v-model="TaxAmt"
                    placeholder="Tax"
                    readonly
                  />
                </div>
              </td>
              <td>
                <div class="col-sm-12" style="margin-top: 10px">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Tax"
                    readonly
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Disc:</td>
              <td>
                <div class="col-sm-12" style="margin-top: 10px">
                  <input
                    type="number"
                    v-model="this.PurchaseOrder.DiscPrct"
                    class="form-control"
                    placeholder="Discount"
                    v-on:keyup="Disc"
                  />
                </div>
              </td>
              <td>
                <div class="col-sm-12" style="margin-top: 10px">
                  <input
                    type="numbe"
                    v-model="wholeAmount.discAmount"
                    class="form-control"
                    placeholder="Discount"
                    readonly
                  />
                </div>
              </td>
              <td>
                <div class="col-sm-12" style="margin-top: 10px">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Discount"
                    readonly
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Net Amount:</td>
              <td></td>
              <td>
                <div class="col-sm-12" style="margin-top: 10px">
                  <input
                    type="number"
                    v-model="wholeAmount.netamount"
                    class="form-control"
                    placeholder="NetAmount"
                    readonly
                  />
                </div>
              </td>
              <td>
                <div class="col-sm-12" style="margin-top: 10px">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="NetAmount"
                    readonly
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/Template/Header.vue";
import Service from "@/EventService/Service.vue";
import Select2 from 'vue3-select2-component';
let DateFormat = new Date().toISOString().substr(0, 10);
export default {
  components: { Header, Select2 },
  name: "AddPurchaseOrder",
  data() {
    return {
      PurchaseOrder: {
        CurrencyId:"",
        AccountId:"",
        InvoiceNo: "",
        Date: DateFormat,
        DueDate: DateFormat,
        Due: "",
        NetAmount: "",
        NetDollar: "",
        DiscPrct: "",
        DiscAmount: "",
        DiscDollar: "",
        OrderGrossAmount: "",
        OrderGrossDollar: "",
      },
      PurchaseOrderDetail: {
        SrNo: 1,
        Name: "",
        Rate: "",
        Qty: "",
        Amount: "",
        Dollar: "",
        TotalAmount: "",
        TotalDollar: "",
      },
      Taxation: {
        SrNo: 1,
        TaxName: "",
        TaxPer: "",
        TaxAmount: "",
      },
      Tax: "",
      purchaseData: [],
      taxData: [],
      ajaxOptions: [],
      ajax: {
        url: 'https://localhost:44362/Api/v1/BLGD/GetAllCurrency',
        processResults: function (data) {
          console.warn(data.data);
          // Tranforms the top-level key of the response object from 'items' to 'results'
          return {
            results: data.data.map(x => {return {id:x.code, text: x.isoCode}})
          };
        }
      },
      ajaxOptionsSelected: null
    };
  },
  computed: {
    GrossAmt() {
      return this.purchaseData.reduce((GrossAmt, item) => {
        let Amount = GrossAmt + item.Amount;
        this.PurchaseOrder.OrderGrossAmount = Amount;
        this.PurchaseOrder.OrderGrossDollar = Amount;
        this.PurchaseOrder.NetAmount = Amount;
        this.PurchaseOrder.NetDollar = Amount;
        return Amount;
      }, 0);
    },
    TaxAmt() {
      return this.taxData.reduce((TaxAmt, item) => {
        let Amount = TaxAmt + item.TaxAmount;
        this.Tax = Amount;
        return Amount;
      }, 0);
    },
    wholeAmount() {
       let GA = this.PurchaseOrder.OrderGrossAmount;
      let disc = this.PurchaseOrder.DiscPrct / 100;
       let discAmount = GA * disc;
      let netamount =  GA + this.Tax - discAmount;
      
      return {
        GA,
        netamount,
        disc,
        discAmount
      }
    }

  },
  methods: {
    DateFormat() {
      if(this.PurchaseOrder.Due !="")
      {
        let someDate = new Date(this.PurchaseOrder.Date);
        let DT = someDate.setDate(someDate.getDate() + this.PurchaseOrder.Due)
        let Formtted_Date = new Date(DT).toJSON().slice(0, 10);
        this.PurchaseOrder.DueDate = Formtted_Date;
      }
      else{
          let someDate = new Date().toJSON().slice(0, 10);
          this.PurchaseOrder.DueDate = someDate;
      }
    },
    RateAmt() {
      let Amt = this.PurchaseOrderDetail.Qty * this.PurchaseOrderDetail.Rate;
      console.warn(Amt);
      this.PurchaseOrderDetail.Amount = Amt;
      this.PurchaseOrderDetail.Dollar = Amt;
    },
    AddPOD() {
      let PurchaseData = JSON.parse(JSON.stringify(this.PurchaseOrderDetail));
      var ObjPurchase = {
        SrNo: PurchaseData.SrNo,
        Name: PurchaseData.Name,
        Rate: PurchaseData.Rate,
        Qty: PurchaseData.Qty,
        Amount: PurchaseData.Amount,
        Dollar: PurchaseData.Amount,
      };
      this.purchaseData.push(ObjPurchase);
      this.PurchaseOrderDetail.SrNo++;
      this.PurchaseOrderDetail.Name = "";
      this.PurchaseOrderDetail.Rate = "";
      this.PurchaseOrderDetail.Qty = "";
      this.PurchaseOrderDetail.Amount = "";
    },
    RemovePOD(event) {
      console.warn(this.purchaseData.indexOf(event), 1);
      this.purchaseData.splice(this.purchaseData.indexOf(event), 1);
    },
    AddTax() {
      let TaxData = JSON.parse(JSON.stringify(this.Taxation));
      var ObjTax = {
        SrNo: TaxData.SrNo,
        TaxName: TaxData.TaxName,
        TaxPer: TaxData.TaxPer,
        TaxAmount: TaxData.TaxAmount,
      };
      this.taxData.push(ObjTax);
      this.Taxation.SrNo++;
      this.Taxation.TaxName = "";
      this.Taxation.TaxPer = "";
      this.Taxation.TaxAmount = "";
    },
    RemoveTax(event) {
      console.warn(this.taxData.indexOf(event), 1);
      this.taxData.splice(this.taxData.indexOf(event), 1);
    },
    Disc() {
      let GA = this.PurchaseOrder.OrderGrossAmount;
      let disc = this.PurchaseOrder.DiscPrct / 100;
      console.warn("GrossAmount=>", GA);
      console.warn("Disc=>", disc);
      let DiscAmt = GA * disc;
      // this.Discount = DiscAmount;
      this.PurchaseOrder.DiscAmount = DiscAmt;
      this.PurchaseOrder.DiscDollar = DiscAmt;
    },
    TaxCal() {
      let GA = this.PurchaseOrder.OrderGrossAmount;
      let taxper = this.Taxation.TaxPer;
      let taxcal = (GA * taxper) / 100;
      this.Taxation.TaxAmount = taxcal;
      let netamount = taxcal + GA;
      this.PurchaseOrder.NetAmount = netamount;
      this.PurchaseOrder.NetDollar = netamount;
    },
    async ajaxChangeEvent(val) {
      console.log('ajaxChangeEvent = >', val.text);
      let ConRate = await Service.GetAllConversionCurrencyRates(val.text);
      let Rate = ConRate.data;
      this.PurchaseOrder.CurrencyId = Rate.conversionCurrencyRates;
      // alert(val);
    },
    ajaxSelectEvent({ text }) {
      let Get = Service.GetAllConversionCurrencyRates(text);
      console.warn(Get.data.data);
    },
  },
};
</script>