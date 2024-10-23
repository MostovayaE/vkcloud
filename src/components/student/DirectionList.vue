<template>
  <div class="col col-xs-9 col-lg-12 mt-4 list">
    <div class="col col-12">
      <div class="mb-3 col col-12">
        <button
          @click="openCreatingForm"
          class="btn btn-primary float-start"
          type="button"
        >
          <i class="material-icons-outlined">add</i>Добавить направление
        </button>
        <div class="col col-6 float-end d-inline-flex align-items-center mb-2">
          <button
            @click="clearFilters"
            :disabled="!filters"
            class="btn btn-sm btn-primary text-nowrap mx-2"
            type="button"
          >
            <i class="material-icons-outlined">close</i>Очистить фильтры
          </button>
          <input
            class="form-control"
            type="text"
            v-model="quickFilterValue"
            id="filter-text-box"
            v-on:input="onFilterTextBoxChanged()"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>

    <div style="height: 90vh">
      <div class="h-100 pt-5">
        <ag-grid-vue
          class="ag-theme-alpine"
          style="width: 100%; height: 100%"
          :columnDefs="columnDefs.value"
          :rowData="rowData.value"
          :defaultColDef="defaultColDef"
          rowSelection="multiple"
          animateRows="true"
          :localeText="localeText"
          @cell-clicked="cellWasClicked"
          @grid-ready="onGridReady"
          @firstDataRendered="onFirstDataRendered"
          @filter-changed="onFilterChanged"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
  <div class="test" v-if="test">
    <label>Количество бюджета:</label>
    <div class="form-group d-inline-flex align-items-center mb-2 col-1 mx-1">
      <input
        class="form-control"
        v-model="event.data.total_budget_count"
        disabled
      />
    </div>
    <label>Количество договоров:</label>
    <div class="form-group d-inline-flex align-items-center mb-2 col-1 mx-1">
      <input
        class="form-control"
        v-model="event.data.total_not_budget_count"
        disabled
      />
    </div>
  </div>
  <Dialog v-model:visible="formVisible" modal header="Форма направления">
    <div class="card flex flex-row">
      <div class="form card__form">
        <auto-form
          v-model="direction"
          v-model:valid="valid"
          v-model:errors="errors"
          item-class="form__item"
          :scheme="scheme"
        >
        </auto-form>
      </div>
    </div>

    <Button
      class="btn btn-primary float-start"
      :disabled="!valid"
      @click="submit"
    >
      Сохранить
    </Button>
    <Button
      class="btn btn-primary float-end"
      v-if="this.direction.dir_id"
      @click="deleteDir"
    >
      Удалить
    </Button>
  </Dialog>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";
import ButtonCell from "@/components/student/DirectionButtonCell.vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import DirectionHref from "@/components/student/DirectionHrefCellRenderer.vue";
import { useDirectionStore } from "@/store2/studentgroup/direction";
import { mapState, mapActions } from "pinia";
import Direction from "@/model/student-group/Direction";

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
import { AG_GRID_LOCALE_RU } from "@/ag-grid-russian.js";
/* eslint-disable vue/no-unused-components */
export default {
  name: "App",
  components: {
    AgGridVue,
    ButtonCell,
    DirectionHref,
    AutoForm,
  },
  setup() {
    const localeText = AG_GRID_LOCALE_RU;
    const gridApi = ref(null); // Optional - for accessing Grid's API
    const gridColumnApi = ref();
    // Obtain API from grid's onGridReady event

    const paginationPageSize = 60;

    const onGridReady = (params) => {
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;
    };
    const navigateToDirection = () => {};

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        {
          sortable: false,
          filter: false,
          headerName: "Действия",
          cellRenderer: "ButtonCell",
          cellRendererParams: {
            label: "View Details", // Button label
          },
          maxWidth: 120, // Adjust the width as needed
          cellClass: "grid-cell-centered",
          resizable: false,
        },

        { field: "dir_name", headerName: "Название направления" },
        {
          field: "dir_code",
          headerName: "Код направления",
          cellRenderer: "DirectionHref",
        },
        {
          field: "magister",
          headerName: "Магистратура",
        },
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1,
      resizable: true,
      minWidth: 300,
    };

    // Example load data from server
    onMounted(() => {});

    const onFilterTextBoxChanged = () => {
      gridApi.value.setQuickFilter(
        document.getElementById("filter-text-box").value
      );
    };

    return {
      onGridReady,
      columnDefs,
      rowData,
      defaultColDef,
      localeText,
      deselectRows: () => {
        gridApi.value.deselectAll();
      },

      onFilterTextBoxChanged,
      paginationPageSize,
      navigateToDirection,
    };
  },
  data() {
    return {
      test: false,
      quickFilterValue: "", // Initialize with an empty string
      filters: false,
      event: null,
      direction: new Direction(),
      errors: {},
      valid: false,
      scheme: null,
      formVisible: false,
    };
  },
  computed: {
    ...mapState(useDirectionStore, ["directionList"]),
  },
  async mounted() {
    await this.getDirectionList(); // Fetch the list of directions

    this.loadDirectionsData();
    this.scheme = new FormScheme([
      new TextInput({
        key: "dir_name",
        label: "Название направления",
        placeholder: "Введите название направления",
        icon: "pi pi-book",
        validation: [requiredRule], // Assuming name is a required field
      }),
      new TextInput({
        key: "dir_code",
        label: "Код направления",
        placeholder: "Введите код направления",
        icon: "pi pi-tag",
        validation: [requiredRule], // Assuming code is a required field
      }),
      new CheckboxInput({
        key: "magister",
        label: "Магистратура",
        binary: true,
      }),
    ]);
  },
  methods: {
    ...mapActions(useDirectionStore, [
      "getDirectionList",
      "postDirection",
      ,
      "putDirection",
      "deleteDirection",
    ]),
    async deleteDir() {
      let direction = { ...this.direction };

      await this.deleteDirection(direction);
      this.formVisible = false;
      this.resetDir();
      this.loadDirectionsData();
    },
    openCreatingForm() {
      this.resetDir();
      this.formVisible = true;
    },
    cellWasClicked(event) {
      if (event.colDef && event.colDef.headerName === "Действия") {
        this.edit(event);
      }
    },
    async validateForm() {
      let isValid = true;
      const errors = {};

      for (const item of this.scheme.items) {
        const result = item.validate(this.direction[item.key]);

        if (result !== true) {
          // Check for `true`, which means the field is valid
          errors[item.key] = result; // Store the error message if validation fails
          isValid = false;
        }
      }

      this.errors = errors; // Store errors in the component's state
      this.valid = isValid; // Set the valid flag based on the results
      return isValid; // Return the validity of the form
    },
    resetDir() {
      this.direction = new Direction();
    },
    edit(event) {
      this.resetDir();
      this.direction = event.data;

      this.formVisible = true;
    },
    async submit() {
      const isValid = await this.validateForm();
      if (!isValid) {
        console.error("Form validation failed", this.errors);
        return;
      }
      let direction = { ...this.direction };

      if (direction.dir_id) {
        await this.putDirection(direction);
      } else {
        await this.postDirection(direction);
      }
      this.formVisible = false;
      this.resetDir();
      this.loadDirectionsData();
    },
    async loadDirectionsData() {
      try {
        if (Array.isArray(this.directionList)) {
          // Filter out directions where deleted_at is not null and sort by dir_name
          this.rowData.value = this.directionList
            .filter((direction) => direction.deleted_at === null)
            .sort((a, b) => a.dir_name.localeCompare(b.dir_name));
        } else {
          // Handle case where directionList is not an array
          if (this.directionList.deleted_at === null) {
            this.rowData.value = [this.directionList];
          } else {
            this.rowData.value = [];
          }
        }
        this.loading = false;
      } catch (error) {
        console.error("Error loading directions data:", error);
      }
    },

    navigateToAddDirection() {
      this.$router.push(`/addDirection`); // Navigate to the AddDirection route
    },

    onFirstDataRendered(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;

      // Check if filterModel exists in the route query
      const filterModelQuery = this.$route.query.filterModel;

      if (filterModelQuery) {
        const filterModel = JSON.parse(filterModelQuery);
        this.gridApi.setFilterModel(filterModel);
        this.filters = true;
      }

      const quickFilterQuery = this.$route.query.quickFilter;
      if (quickFilterQuery) {
        const quickFilter = JSON.parse(quickFilterQuery);
        this.gridApi.setQuickFilter(quickFilter);
        this.quickFilterValue = quickFilter;
        this.filters = true;
      }
    },
    onFilterChanged() {
      // This function will be called whenever filters change.
      // You can perform your desired action here.
      // For example, you can get the current filter model:
      this.filters = false;
      const savedQuickFilter = this.gridApi.getQuickFilter();
      const savedFilterModel = this.gridApi.getFilterModel();

      // Initialize an empty object for queryParams
      const queryParams = {};

      // Check if savedQuickFilter is not empty, then add it to queryParams
      if (savedQuickFilter) {
        queryParams.quickFilter = JSON.stringify(savedQuickFilter);
        this.filters = true;
      }

      // Check if savedFilterModel is not empty, then add it to queryParams
      if (savedFilterModel && Object.keys(savedFilterModel).length > 0) {
        queryParams.filterModel = JSON.stringify(savedFilterModel);
        this.filters = true;
      }

      // Push the query parameters to the router
      this.$router.push({ query: queryParams });

      // Do something with the filterModel or trigger other actions as needed.
    },
    clearFilters() {
      this.gridApi.setFilterModel();
      this.gridApi.setQuickFilter();
      this.quickFilterValue = "";
      this.filters = false;
    },
  },

  created() {
    this.loadDirectionsData();
  },
};
</script>

<style lang="scss" scoped>
.ag-row .ag-cell {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
}
.test {
  padding-left: 100px;
}
.skeleton {
  width: 100%;
  height: 1.2em;
  background-image: linear-gradient(
    125deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 3.5s infinite linear;
  border-radius: 4px;
  margin: 0.2em 0;
}

.text-center * {
  justify-content: center;
  display: flex;
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
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
.nmbr {
  height: 44px;
}

.btn-primary {
  --bs-btn-bg: rgb(68, 99, 52);
  border: none;
  --bs-btn-hover-bg: rgb(6 215 29);
  --bs-btn-hover-border-color: rgb(6 215 29);
  --bs-btn-active-bg: rgb(68, 99, 52);
  --bs-btn-disabled-bg: rgb(68, 99, 52);
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-control:focus {
  border-color: rgba(1, 20, 8, 0.815);
  box-shadow: inset 0 1px 1px rgba(6, 215, 29, 0.075),
    0 0 8px rgba(6, 215, 29, 0.6);
}
.form-select:focus {
  border-color: rgba(1, 20, 8, 0.815);
  box-shadow: inset 0 1px 1px rgba(6, 215, 29, 0.075),
    0 0 8px rgba(6, 215, 29, 0.6);
}
.page-link {
  height: 40px;
  width: 40px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  .page-link {
    background-color: rgb(68, 99, 52);
    border: none;
    --bs-btn-hover-bg: rgb(6 215 29);
    --bs-btn-hover-border-color: rgb(6 215 29);
  }
}
.disabled {
  .page-link {
    background-color: rgb(57, 79, 46);
    border: none;
    --bs-btn-hover-bg: rgb(6 215 29);
    --bs-btn-hover-border-color: rgb(6 215 29);
  }
}

.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 10px;

  &__item {
    padding: 5px;
    margin-right: 10px;
  }

  &__item:nth-child(2n) {
    margin-right: 0;
    border-right: none;
  }
}
</style>
