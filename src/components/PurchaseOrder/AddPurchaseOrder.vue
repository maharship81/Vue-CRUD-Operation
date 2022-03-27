<template>
  <Header />
  <div class="Header">
    <button class="btn btn-primary" v-on:click="AddPurchorders">
      <fa icon="floppy-disk" /> AddPurchaseOrder
    </button>
  </div>
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
        <div><label>Account</label></div>
        <div class="dropdown-wrapper">
          <div @click="isVisible = !isVisible" class="selected-item">
            <span>SelectItems</span> &nbsp;
            <p v-if="isVisible">
              <fa icon="angle-down" />
            </p>
            <p v-else>
              <fa icon="angle-up" />
            </p>
          </div>
          <div v-if="isVisible" class="dropdown-popover">
            <input
              v-model="searchQuery"
              id="Search"
              type="text"
              placeholder="Search For Account"
            />
            <div class="options">
              <ul class="ul">
                <li v-for="account in filterAccount" :key="account.code">
                  {{ account.firstName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div><label>Currency</label></div>
        <Select2
          v-model="CurrencyptionsSelected"
          :options="CurrencyOptions"
          :settings="{
            placeholder: 'Specifies the placeholder through settings',
            ajax: Currency,
          }"
          @select="CurrencyChangeEvent($event)"
          class="Currency"
        />
      </div>
      <div class="form-group">
        <div><label>Currency Rate</label></div>
        <input
          type="text"
          class="form-control"
          v-model="this.PurchaseOrder.CurrencyCode"
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
        <button class="AddPOD btn btn-primary" v-on:click="AddPOD">
          <fa icon="plus" />
        </button>
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
                  <fa icon="trash" />
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
                v-model="this.Taxation.TaxesName"
              />
            </div>
            <div class="form-group">
              <div><label>Taxes%</label></div>
              <input
                type="number"
                class="form-control"
                placeholder="Taxes%"
                v-model="this.Taxation.TaxesPrct"
                v-on:keyup="TaxCal"
              />
            </div>
            <div class="form-group">
              <div><label>TaxesAmount</label></div>
              <input
                type="number"
                class="form-control"
                placeholder="TaxesAmount"
                v-model="this.Taxation.TaxesAmount"
                readonly
              />
            </div>
            <div class="form-group">
              <button class="TaxBtn btn btn-primary" v-on:click="AddTax">
                <fa icon="plus" />
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
                    <td>{{ item.TaxesName }}</td>
                    <td>{{ item.TaxesPrct }}</td>
                    <td>{{ item.TaxesAmount }}</td>
                    <td>
                      <button
                        class="btn btn-danger"
                        v-on:click="RemoveTax(index)"
                      >
                        <fa icon="trash" />
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
import Select2 from "vue3-select2-component";
let DateFormat = new Date().toISOString().substr(0, 10);
export default {
  components: { Header, Select2 },
  name: "AddPurchaseOrder",
  data() {
    return {
      PurchaseOrder: {
        CurrencyId: "",
        CurrencyCode: "",
        AccountId: "",
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
        Qty: "",
        Rate: "",
        Amount: "",
        Dollar: "",
      },
      Taxation: {
        SrNo: 1,
        TaxesName: "",
        TaxesPrct: "",
        TaxesAmount: "",
      },
      Tax: "",
      purchaseData: [],
      taxData: [],

      searchQuery: "",
      selectedItem: null,
      isVisible: false,
      AccountArray: [],

      CurrencyOptions: [],
      Currency: {
        url: "https://localhost:44362/Api/v1/BLGD/GetAllCurrency",
        processResults: function (data) {
          // Tranforms the top-level key of the response object from 'items' to 'results'
          return {
            results: data.data.map((x) => {
              return { id: x.code, text: x.isoCode };
            }),
          };
        },
      },
      CurrencyOptionsSelected: null,
    };
  },
  computed: {
    filterAccount() {
      const Query = this.searchQuery.toLowerCase();
      if (this.searchQuery == "") {
        return this.AccountArray;
      }
      return this.AccountArray.filter((Account) => {
        return Object.values(Account).some((word) =>
          String(word).toLowerCase().includes(Query)
        );
      });
    },
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
        let Amount = TaxAmt + item.TaxesAmount;
        this.Tax = Amount;
        return Amount;
      }, 0);
    },
    wholeAmount() {
      let GA = this.PurchaseOrder.OrderGrossAmount;
      let disc = this.PurchaseOrder.DiscPrct / 100;
      let DiscAmount = GA * disc;
      let discAmount = DiscAmount;
      let Netamount = GA + this.Tax - DiscAmount;
      let netamount = Netamount;
      return {
        GA,
        netamount,
        disc,
        discAmount,
      };
    },
  },
  mounted() {
    fetch("https://localhost:44362/Api/v1/Login/GetLogin")
      .then((res) => res.json())
      .then((json) => {
        console.warn(json.data);
        this.AccountArray = json.data;
      });
  },
  methods: {
    DateFormat() {
      if (this.PurchaseOrder.Due != "") {
        let someDate = new Date(this.PurchaseOrder.Date);
        let DT = someDate.setDate(someDate.getDate() + this.PurchaseOrder.Due);
        let Formtted_Date = new Date(DT).toJSON().slice(0, 10);
        this.PurchaseOrder.DueDate = Formtted_Date;
      } else {
        let someDate = new Date().toJSON().slice(0, 10);
        this.PurchaseOrder.DueDate = someDate;
      }
    },
    RateAmt() {
      let Amt = this.PurchaseOrderDetail.Qty * this.PurchaseOrderDetail.Rate;
      this.PurchaseOrderDetail.Amount = Amt;
      this.PurchaseOrderDetail.Dollar = Amt;
    },
    AddPOD() {
      let PurchaseData = JSON.parse(JSON.stringify(this.PurchaseOrderDetail));
      var ObjPurchase = {
        SrNo: PurchaseData.SrNo,
        Name: PurchaseData.Name,
        Qty: PurchaseData.Qty,
        Rate: PurchaseData.Rate,
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
      this.purchaseData.splice(this.purchaseData.indexOf(event), 1);
    },
    AddTax() {
      let TaxData = JSON.parse(JSON.stringify(this.Taxation));
      var ObjTax = {
        SrNo: TaxData.SrNo,
        TaxesName: TaxData.TaxesName,
        TaxesPrct: TaxData.TaxesPrct,
        TaxesAmount: TaxData.TaxesAmount,
      };
      this.taxData.push(ObjTax);
      this.Taxation.SrNo++;
      this.Taxation.TaxesName = "";
      this.Taxation.TaxesPrct = "";
      this.Taxation.TaxesAmount = "";
    },
    RemoveTax(event) {
      this.taxData.splice(this.taxData.indexOf(event), 1);
    },
    Disc() {
      let GA = this.PurchaseOrder.OrderGrossAmount;
      let disc = this.PurchaseOrder.DiscPrct / 100;
      let DiscAmt = GA * disc;
      this.PurchaseOrder.DiscAmount = DiscAmt;
      this.PurchaseOrder.DiscDollar = DiscAmt;
    },
    TaxCal() {
      let GA = this.PurchaseOrder.OrderGrossAmount;
      let taxper = this.Taxation.TaxesPrct;
      let taxcal = (GA * taxper) / 100;
      this.Taxation.TaxesAmount = taxcal;
      let netamount = taxcal + GA;
      this.PurchaseOrder.NetAmount = netamount;
      this.PurchaseOrder.NetDollar = netamount;
    },
    async CurrencyChangeEvent(val) {
      let ConRate = await Service.GetAllConversionCurrencyRates(val.text);
      let Rate = ConRate.data;
      console.warn(Rate);
      this.PurchaseOrder.CurrencyId = Rate.code;
      this.PurchaseOrder.CurrencyCode = Rate.conversionCurrencyRates;
    },
    AccountChangeEvent(val) {
      this.PurchaseOrder.AccountId = val.id;
    },
    AddPurchorders() {
      const Data = {
        ObjPurchaseOrder: JSON.parse(JSON.stringify(this.PurchaseOrder)),
        ObjPurchaseOrderDetail: JSON.parse(JSON.stringify(this.purchaseData)),
        ObjPurchaseOrderTaxesDetail: JSON.parse(JSON.stringify(this.taxData)),
      };
      console.warn(Data);
      let AddPurchOrder = Service.AddPurchaseOrder(Data);
      console.warn("Data", AddPurchOrder);
    },
  },
};
</script>