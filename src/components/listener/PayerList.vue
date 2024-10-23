<template>


  <div class="col col-xs-9 col-lg-12 mt-4 list">
    <div class="col col-12">
    <div class="mb-3 col col-12">
    
      <div class="col col-6 float-start d-inline-flex align-items-center mb-2 ">
          <button
            @click="openSidebar"
            class="btn btn-primary float-start"
            type="button"
          >
             <i class="material-icons-outlined">add</i>Добавить плательщика
            </button>
        </div>

        <div class="col col-6 float-end d-inline-flex align-items-center mb-2 ">
      <button 
      @click="clearFilters" :disabled="!filters" class="btn btn-sm btn-primary text-nowrap mx-2" type="button"><i class="material-icons-outlined">close</i>Очистить фильтры</button>
      <input 
      class="form-control" type="text" v-model="quickFilterValue" id="filter-text-box" v-on:input="onFilterTextBoxChanged()" placeholder="Поиск..."> 
    </div>
  
  </div>
</div>


<br>
<div style="height: 90vh">
<div class="h-100 pt-5">
  <ag-grid-vue
    class="ag-theme-alpine"
    style="width: 100%; height: 100%;"
    :columnDefs="columnDefs.value"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @cell-clicked="cellWasClicked"
    @grid-ready="onGridReady"
    @firstDataRendered="onFirstDataRendered"
    @filter-changed="onFilterChanged"
    :pagination="true"            
    :paginationPageSize="paginationPageSize"  
  >
  </ag-grid-vue>
</div>
</div></div>

<Sidebar
      v-model:visible="showSidebar"
      position="bottom"
      modal
      header="Данные плательщика"
      class="custom-sidebar h-auto"
      :style="{ width: '55%', maxHeight: '750px', height: 'auto',margin: 'auto'}"
    >

    <div class="card flex flex-row">
    <div class="form card__form">
        <auto-form
          v-model="payer"
          v-model:errors="errors"
          :scheme="scheme"
          class="custom-form"
        >
        </auto-form>
</div>
</div>
  <Button
        class="btn btn-primary float-start"
        @click="submit"
      >
        Сохранить
      </Button>
      <Button
      class="btn btn-primary float-end"
      v-if="this.payer.id"
      @click="deletePay"
    >
      Удалить
    </Button>
    </Sidebar>

</template>

<script>

import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { useRoute } from "vue-router";
import { mapState, mapActions } from "pinia";
import { usePayerStore } from "@/store2/listenergroup/payer";
import AutoForm from "@/components/form/AutoForm.vue";
import { FormScheme } from "@/model/form/FormScheme";
import {
  emailRule,
  minLengthRule,
  phoneRule,
  requiredRule,
} from "@/model/form/validation/rules";
import { TextInput } from "@/model/form/inputs/TextInput";
import { MaskInput } from "@/model/form/inputs/MaskInput";
import { DateInput } from "@/model/form/inputs/DateInput";
import { CheckboxInput } from "@/model/form/inputs/CheckboxInput";
import { RadioInput } from "@/model/form/inputs/RadioInput";
import { ToggleInput } from "@/model/form/inputs/ToggleInput";
import { ComboboxInput } from "@/model/form/inputs/ComboboxInput";
import Payer from "@/model/listener-group/Payer";

import ButtonCell from "@/components/PayerButtonCell.vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS


import UserService from "../../services/user.service";


/* eslint-disable vue/no-unused-components */
export default {
  name: "App",
  components: {
    AgGridVue,
    ButtonCell,
    AutoForm,
  },
  setup() {
    const gridApi = ref(null); // Optional - for accessing Grid's API
    const gridColumnApi = ref();
    // Obtain API from grid's onGridReady event

    const dataFromApi = ref(null); // This will store the data from the API
    const dataLoaded = ref(false); // This flag will indicate if data is loaded

    const route = useRoute();
    const paginationPageSize = 60;


    const onGridReady = (params) => {
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;
     
    };
    const navigateToStudent = () => {};

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
      {
      sortable: false,
      filter: false,
      headerName: 'Действия',
      cellRenderer: 'ButtonCell',
      cellRendererParams: {
        onClick: navigateToStudent,
        label: 'View Details', // Button label
      },
      maxWidth: 120, 
      resizable: false

    },
           
           { field: "full_name", headerName: 'ФИО' },
           {
            field: 'email',
            headerName: 'email', hide: true
           },
           {
            field: 'phone_number',
            headerName: 'Телефон'
           }
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1,
      resizable: true,
      minWidth: 300
    };

    // Example load data from server
    onMounted(() => {});

    const onFilterTextBoxChanged = () => {
      gridApi.value.setQuickFilter(
        document.getElementById('filter-text-box').value
      );
    };


    return {
      onGridReady,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked: (event) => { // Example of consuming Grid Event
        console.log("cell was clicked", event);
      },
      deselectRows: () =>{
        gridApi.value.deselectAll()
      },

      onFilterTextBoxChanged,
      paginationPageSize,
      navigateToStudent,
      dataFromApi,
      dataLoaded,
    };
  },
  data() {
  return {
    showSidebar: false,
    quickFilterValue: '',
    filters:false,
    payer: new Payer(),
    errors: {},
    scheme: null,
  };
},

async mounted() {
    try {
    await this.getPayerList();
    this.loadPayersData();
  } catch (error) {
    console.error("Ошибка при загрузке данных слушателей:", error);
  }
  this.scheme = new FormScheme([
  
  new TextInput({
    key: "name",
    label: "Имя",
    placeholder: "Имя",
    validation: [requiredRule],
  }),
  new TextInput({
    key: "surname",
    label: "Отчество",
    placeholder: "Отчество",
    validation: [requiredRule],
  }),
  new TextInput({
    key: "passport",
    label: "Серия и номер паспорта",
    placeholder: "",
    validation: [requiredRule],
  }),
  new DateInput({
    key: "issue_date",
    label: "Дата выдачи",
    dateFormat: "dd/mm/yy",
    size: "sm",
    validation: [requiredRule],
  }),
  new TextInput({
    key: "department_code",
    label: "Код подразделения",
    placeholder: "Код подразделения",
    validation: [requiredRule],
  }),
  new TextInput({
    key: "registration_address",
    label: "Адрес регистрации",
    placeholder: "Адрес регистрации",
    validation: [requiredRule],
  }),
  new TextInput({
    key: "SNILS",
    label: "СНИЛС",
    placeholder: "СНИЛС",
    validation: [requiredRule],
  }),
  new TextInput({
    key: "phone_number",
    label: "Телефон",
    placeholder: "Номер телефона",
    validation: [requiredRule],
  }),
  new TextInput({
    key: "email",
    label: "Email",
    placeholder: "Электронная почта",
    validation: [emailRule],
  }),
]);

  },

  methods: {

    ...mapActions(usePayerStore, [
      "getPayerList",
      "postPayer",
      ,
      "putPayer",
      "deletePayer",
    ]),
    cellWasClicked(event) {
      if (event.colDef && event.colDef.headerName === "Действия") {
        this.edit(event);
      }
    },
    resetPayer() {
      this.payer = new Payer();
    },
    edit(event) {
      this.resetPayer();
      this.payer = event.data;
      console.log(this.payer);
      this.showSidebar = true;
    },

    async submit() {

      console.log("Сабмитаю")
let payer = { ...this.payer };

if (payer.id) {
  console.log("До пута")
  console.log(payer)
  await this.putPayer(payer);
  console.log("После пута")
} else {
  console.log("До поста")
  console.log(payer)
  await this.postPayer(payer);
  console.log("После поста")
}
this.showSidebar = false;
this.resetPayer();
this.loadPayersData();
},
async deletePay() {

      let payer = { ...this.payer };

      console.log(payer);

      await this.deletePayer(payer);

      this.showSidebar = false;
      this.resetPayer();
      this.loadPayersData();
    },


    async loadPayersData() {
  try {
    if (Array.isArray(this.payerList)) {
      this.rowData.value = this.payerList
      .filter(payer => payer.deleted_at === null)
    } else if (this.payerList && this.payerList.deleted_at === null) {
      this.rowData.value = [this.payerList];
    } else {
      this.rowData.value = [];
    }
    
  } catch (error) {
    console.error("Ошибка при загрузке данных плательщиков:", error);
    this.rowData.value = [];  // Очистка в случае ошибки
  }
},
      navigateToAddListener() {},

onFirstDataRendered(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;

      // Check if filterModel exists in the route query
      const filterModelQuery = this.$route.query.filterModel;
      if (filterModelQuery) {
        const filterModel = JSON.parse(filterModelQuery);
        this.gridApi.setFilterModel(filterModel);
        this.filters=true;
        
      }

      const quickFilterQuery = this.$route.query.quickFilter;
      if (quickFilterQuery) {
        const quickFilter = JSON.parse(quickFilterQuery);
        this.gridApi.setQuickFilter(quickFilter);
        this.quickFilterValue = quickFilter;
        this.filters=true;
      }
    },
    onFilterChanged() {
  // This function will be called whenever filters change.
  // You can perform your desired action here.
  // For example, you can get the current filter model:
  this.filters=false;
  const savedQuickFilter = this.gridApi.getQuickFilter();
  const savedFilterModel = this.gridApi.getFilterModel();

  // Initialize an empty object for queryParams
  const queryParams = {};

  // Check if savedQuickFilter is not empty, then add it to queryParams
  if (savedQuickFilter) {
    queryParams.quickFilter = JSON.stringify(savedQuickFilter);
    this.filters=true;
  }

  // Check if savedFilterModel is not empty, then add it to queryParams
  if (savedFilterModel && Object.keys(savedFilterModel).length > 0) {
    queryParams.filterModel = JSON.stringify(savedFilterModel);
    this.filters=true;
  }

  // Push the query parameters to the router
  this.$router.push({ query: queryParams });

  // Do something with the filterModel or trigger other actions as needed.
},
  clearFilters(){

  
    this.gridApi.setFilterModel();
    this.gridApi.setQuickFilter();
    this.quickFilterValue='';
    this.filters=false;
  },
  openSidebar() {
      console.log("Открываю!")
      this.resetPayer();
      this.showSidebar = true; // Открыть боковую панель
    },
    closeSidebar() {
      this.showSidebar = false; // Закрыть боковую панель
    },


    },
    computed:{
    ...mapState(usePayerStore, ["payerList"]),
  },

    created() {
    this.loadPayersData();
    },

    
};


</script>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  height: 1.2em;
  background-image: linear-gradient(125deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonShimmer 3.5s infinite linear;
  border-radius: 4px;
  margin: 0.2em 0;
}



@keyframes skeletonShimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes skeletonFade {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }

  
}

@media (max-width: 769px) {
  .list{
    padding-left: 100px;
    font-size: 10px;
    max-width: 1100px;
  }
}

@media (max-width: 1023px) {



  .list{
    padding-left: 100px;
    font-size: 13px;

  }
}
@media (min-width: 1023px) {



.list{
  padding-left: 100px;
  padding-right: 5px;

}
}
.nmbr{
  height: 44px;
}



.btn-primary{
    --bs-btn-bg: rgb(68,99,52);
    border: none;
    --bs-btn-hover-bg:rgb(6 215 29);
    --bs-btn-hover-border-color: rgb(6 215 29);
    --bs-btn-active-bg: rgb(68,99,52);
    --bs-btn-disabled-bg: rgb(68,99,52);
    display: flex;
  justify-content: center;
  align-items: center;
}
.form-control:focus {
  border-color: rgba(1, 20, 8, 0.815);
  box-shadow: inset 0 1px 1px rgba(6, 215, 29, 0.075), 0 0 8px rgba(6, 215, 29, 0.6);
}
.form-select:focus {
  border-color: rgba(1, 20, 8, 0.815);
  box-shadow: inset 0 1px 1px rgba(6, 215, 29, 0.075), 0 0 8px rgba(6, 215, 29, 0.6);
}
.page-link{
  height: 40px;
  width: 40px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active{
  .page-link{
    background-color: rgb(68,99,52);
    border: none;
    --bs-btn-hover-bg:rgb(6 215 29);
    --bs-btn-hover-border-color: rgb(6 215 29);
 
  }
}
.disabled{
  .page-link{
    background-color: rgb(57, 79, 46);
    border: none;
    --bs-btn-hover-bg:rgb(6 215 29);
    --bs-btn-hover-border-color: rgb(6 215 29);
  }
}
.form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 10px;
}

.wide-input {
  width: 500px; 
}
</style>