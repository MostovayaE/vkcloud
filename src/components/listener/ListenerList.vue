<template>
  <div class="col col-xs-9 col-lg-12 mt-4 list">
    <div class="col col-12">
      <div class="mb-3 col col-12">
        <div
          class="col col-6 float-start d-inline-flex align-items-center mb-2"
        >
          <button
            @click="openSidebar"
            class="btn btn-primary float-start"
            type="button"
          >
            <i class="material-icons-outlined">add</i>Добавить слушателя
          </button>

          <button
            @click="listenListeners"
            class="mx-2 btn btn-primary float-start"
            type="button"
          >
            Прослушать слушателей
          </button>
        </div>

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

    <div style="height: 50vh">
      <div class="h-100 pt-5">
        <ag-grid-vue
          class="ag-theme-alpine"
          style="width: 100%; height: 100%"
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
    </div>
  </div>

  <Sidebar
    v-model:visible="showSidebar"
    position="bottom"
    modal
    header="Данные слушателя"
    class="custom-sidebar h-auto"
    :style="{
      width: '55%',
      maxHeight: '750px',
      height: 'auto',
      margin: 'auto',
    }"
  >
    <div class="card flex flex-row">
      <div class="form card__form">
        <auto-form
          v-model="listener"
          v-model:errors="errors"
          :scheme="scheme"
          class="custom-form"
        >
        </auto-form>
      </div>
    </div>
    <div class="form-header">
      <h3>Пожелания слушателя</h3>

      <div class="col-5">
        <table class="table table-bordered col col-3">
          <thead>
            <tr>
              <th style="min-width: 100px">День</th>
              <th>Время начала</th>
              <th>Время окончания</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in tableData" :key="index">
              <td>
                <select class="form-select" v-model="entry.day_id">
                  <option v-for="day in days" :key="day.value" :value="day.id">
                    {{ day.text }}
                  </option>
                </select>
              </td>
              <td>
                <input
                  class="form-control"
                  type="time"
                  v-model="entry.starttime"
                />
              </td>
              <td>
                <input
                  class="form-control"
                  type="time"
                  v-model="entry.endtime"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-primary" @click="addRow">+</button>
      </div>

      <div class="card flex flex-row">
        <div class="form card__form">
          <auto-form
            v-model="listener"
            v-model:errors="errors"
            :scheme="secondScheme"
            class="custom-form"
          >
          </auto-form>
        </div>
      </div>
    </div>
    <Button class="btn btn-primary float-start" @click="submit">
      Сохранить
    </Button>
    <Button
      class="btn btn-primary float-end"
      v-if="this.listener.id"
      @click="deleteLst"
    >
      Удалить
    </Button>
  </Sidebar>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";
import ButtonCell from "@/components/listener/ListenerButtonCell.vue";
import ListenerHref from "@/components/listener/ListenerHrefCellRenderer.vue";
import ListenerHref2 from "@/components/listener/ListenerHrefCellRenderer2.vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { useRoute } from "vue-router";
import { mapState, mapActions } from "pinia";
import { useListenerStore } from "@/store2/listenergroup/listener";
import { useListenergroupStore } from "@/store2/listenergroup/listenergroup";
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
import Listener from "@/model/listener-group/Listener";

import UserService from "../../services/user.service";

/* eslint-disable vue/no-unused-components */
export default {
  name: "App",
  components: {
    AgGridVue,
    ButtonCell,
    ListenerHref,
    ListenerHref2,
    AutoForm,
  },
  setup() {
    const tableData = ref([]);

    const addRow = () => {
      console.log("Adding row"); // Для проверки, что метод вызывается
      const newRow = { day_id: "", starttime: "", endtime: "" };
      tableData.value.push(newRow); // Добавляем новую строку
    };

    const gridApi = ref(null); // Optional - for accessing Grid's API
    const gridColumnApi = ref();

    const dataFromApi = ref(null); // This will store the data from the API
    const dataLoaded = ref(false); // This flag will indicate if data is loaded

    const route = useRoute();
    const paginationPageSize = 60;

    const onGridReady = (params) => {
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;
    };
    const navigateToListener = () => {};

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        {
          sortable: false,
          filter: false,
          headerName: "Действия",
          headerClass: "text-center",
          cellRenderer: "ButtonCell",
          cellRendererParams: {
            onClick: navigateToListener,
            label: "View Details", // Button label
          },
          maxWidth: 120,
          resizable: false,
        },

        {
          field: "full_name",
          headerName: "ФИО",
          cellRenderer: "ListenerHref2",
        },
        {
          field: "listenergroup_number",
          headerName: "Группа",
        },
        {
          field: "people_count",
          headerName: "Желаемое количество человек",
          hide: true,
        },
        {
          field: "days_of_week",
          headerName: "Желаемые дни",
          hide: true,
        },
        {
          field: "phone_number",
          headerName: "Номер телефона",
          hide: true,
        },
        {
          field: "email",
          headerName: "Email",
          hide: true,
        },
        {
          field: "full_name2",
          headerName: "ФИО законного представителя",
          hide: true,
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
      tableData,
      addRow,
      days_of_week: null,
      listenergroups: null,
      days: null,

      deselectRows: () => {
        gridApi.value.deselectAll();
      },

      onFilterTextBoxChanged,
      paginationPageSize,
      navigateToListener,
      dataFromApi,
      dataLoaded,
    };
  },
  data() {
    return {
      showSidebar: false,
      quickFilterValue: "",
      filters: false,
      listener: new Listener(),
      errors: {},
      scheme: null,
      secondScheme: null,
    };
  },

  async mounted() {
    try {
      await this.getListenerList();
      await this.getListenergroupList();
      this.loadListenersData();
    } catch (error) {
      console.error("Ошибка при загрузке данных слушателей:", error);
    }
    this.scheme = new FormScheme([
      new TextInput({
        key: "surname",
        label: "Фамилия",
        placeholder: "Фамилия",
        validation: [requiredRule],
      }),
      new TextInput({
        key: "name",
        label: "Имя",
        placeholder: "Имя",
        validation: [requiredRule],
      }),
      new TextInput({
        key: "lastname",
        label: "Отчество",
        placeholder: "Отчество",
        validation: [requiredRule],
      }),
      new ComboboxInput({
        key: "group_id",
        label: "Номер группы",
        options: [
          ...[...this.listenergroupList].map((listenergroup) => ({
            label: listenergroup.group_number,
            value: listenergroup.id,
          })),
        ],
        validation: [requiredRule],
      }),
      new TextInput({
        key: "passport",
        label: "Серия и номер паспорта",
        placeholder: "Серия и номер паспорта",
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
        placeholder: "Адрес регистраци",
        validation: [requiredRule],
      }),

      new TextInput({
        key: "snils",
        label: "СНИЛС",
        placeholder: "СНИЛС",
        validation: [requiredRule],
      }),
      new TextInput({
        key: "issued_by",
        label: "Кем выдан",
        validation: [requiredRule],
      }),

      new TextInput({
        key: "phone_number",
        label: "Номер телефона",
        validation: [requiredRule],
      }),
      new TextInput({
        key: "email",
        label: "Электронная почта",
        placeholder: "Электронная почта",
        validation: [emailRule],
      }),
    ]);

    this.secondScheme = new FormScheme([
      new TextInput({
        key: "people_count",
        label: "Количество человек",
        placeholder: "Количество человек",
        validation: [requiredRule],
      }),
      new TextInput({
        key: "hours",
        label: "Количество часов",
        placeholder: "Количество часов",
        validation: [requiredRule],
      }),
      new DateInput({
        key: "start_date",
        label: "Начало:",
        dateFormat: "dd/mm/yy",
        size: "sm",
        validation: [requiredRule],
      }),
      new DateInput({
        key: "end_date",
        label: "Конец:",
        dateFormat: "dd/mm/yy",
        size: "sm",
        validation: [requiredRule],
      }),
      new TextInput({
        key: "wish_description",
        label: "Комментарий:",
        validation: [requiredRule],
        className: "wide-input",
      }),
    ]);
  },
  methods: {
    async listenListeners() {
      try {
        // Фильтруем только тех слушателей, у которых нет даты удаления (deleted_at == null)

        const filteredNodes = this.gridApi.getRenderedNodes();

        // Извлекаем данные из узлов
        const filteredListeners = filteredNodes.map((node) => node.data);
        console.log(filteredListeners);
        // Формируем строку для каждого активного слушателя
        const formattedListeners = filteredListeners
          .map((listener) => {
            return `${listener.full_name}`;
          })
          .join(", ");

        // Проверяем, что строка не пустая
        if (!formattedListeners) {
          console.error("Нет активных слушателей для отправки");
          return;
        }

        // Отправляем запрос на сервер с уже объединённой строкой
        const response = await fetch("/tts?encoder=opus", {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 2LcVT6zcaDvYhUPJqwDmuZqxHWAj88xA8FtJhULqexX27H6nGK",
            "Content-Type": "text/plain",
          },
          body: formattedListeners,
        });

        // Проверяем успешность ответа
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`);
        }

        // Получаем аудио как blob
        const audioBlob = await response.blob();

        // Создаём URL для аудио blob
        const audioUrl = URL.createObjectURL(audioBlob);

        // Воспроизводим аудио
        const audio = new Audio(audioUrl);
        audio.play();

        console.log("Аудио воспроизводится");
      } catch (error) {
        console.error("Ошибка при получении или воспроизведении аудио:", error);
      }
    },
    ...mapActions(useListenerStore, [
      "getListenerList",
      "postListener",
      ,
      "putListener",
      "deleteListener",
    ]),
    ...mapActions(useListenergroupStore, ["getListenergroupList"]),

    cellWasClicked(event) {
      if (event.colDef && event.colDef.headerName === "Действия") {
        this.edit(event);
      }
    },
    resetLst() {
      this.listener = new Listener();
    },
    edit(event) {
      this.resetLst();
      this.listener = event.data;
      console.log(this.listener);
      this.showSidebar = true;
    },

    async submit() {
      let listener = { ...this.listener };

      if (listener.id) {
        console.log("До пута");
        console.log(listener);
        await this.putListener(listener);
        console.log("После пута");
      } else {
        console.log("До поста");
        console.log(listener);
        await this.postListener(listener);
        console.log("После поста");
      }
      this.showSidebar = false;
      this.resetLst();
      this.loadListenersData();
    },

    async deleteLst() {
      let listener = { ...this.listener };
      console.log(listener);
      await this.deleteListener(listener);
      this.showSidebar = false;
      this.resetLst();
      this.loadListenersData();
    },

    async loadListenersData() {
      try {
        if (Array.isArray(this.listenerList)) {
          this.rowData.value = this.listenerList
            .filter((listener) => listener.deleted_at === null)
            .sort((a, b) => a.full_name.localeCompare(b.full_name));
        } else if (this.listenerList && this.listenerList.deleted_at === null) {
          this.rowData.value = [this.listenerList];
        } else {
          this.rowData.value = [];
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных слушателей:", error);
        this.rowData.value = []; // Очистка в случае ошибки
      }
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
    openSidebar() {
      this.resetLst();
      this.showSidebar = true; // Открыть боковую панель
    },
    closeSidebar() {
      this.showSidebar = false; // Закрыть боковую панель
    },

    async loadDaysData() {
      try {
        const response = await UserService.getDaysAsIdText();
        this.days = Array.isArray(response.data)
          ? response.data
          : [response.data];
        this.dataLoading = false;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
  },

  computed: {
    ...mapState(useListenerStore, ["listenerList"]),
    ...mapState(useListenergroupStore, ["listenergroupList"]),
  },
  created() {
    this.loadDaysData();
  },
};
</script>

<style lang="scss" scoped>
.bigger {
  font-size: 30px;
  white-space: nowrap;
}
.ag-row .ag-cell {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
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

@media (max-width: 769px) {
  .list {
    padding-left: 100px;
    font-size: 10px;
    max-width: 1100px;
  }
}

@media (max-width: 1023px) {
  .list {
    padding-left: 100px;
    font-size: 13px;
  }
}
@media (min-width: 1023px) {
  .list {
    padding-left: 100px;
    padding-right: 5px;
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

.card {
  &__form {
    margin-right: 30px;
  }

  &__image {
    margin-left: auto;
  }
}

.form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
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

.wide-input {
  width: 500px; /* Задайте желаемую ширину, например, 400px */
}
</style>
