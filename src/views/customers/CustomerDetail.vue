<template>
<!-- eslint-disable -->
  <div>
    <b-modal
      size="xl"
      id="customerDetail"
      hide-footer
      scrollable
    >
    <div class="px-2 animated fadeIn">
        <h3>Detalle del Cliente</h3>
        <hr>
        <b-row>
            <!-- Nombre -->
            <b-col sm="6">
            <b-form-group label="Nombre" label-for="name">
                <b-form-input
                id="name"
                v-model="customerDetails.name"
                disabled
                />
            </b-form-group>
            </b-col>

            <!-- Identificación -->
            <b-col sm="6">
            <b-form-group label="Identificación" label-for="identification">
                <b-form-input
                id="identification"
                v-model="customerDetails.identification"
                disabled
                />
            </b-form-group>
            </b-col>               
        </b-row>

        <b-row>
            <!-- Email -->
            <b-col sm="6">
            <b-form-group label="Email" label-for="email">
                <b-form-input
                id="email"
                v-model="customerDetails.email"
                disabled
                />
            </b-form-group>
            </b-col>

            <!-- Teléfono -->
            <b-col sm="6">
            <b-form-group label="Teléfono" label-for="phone_number">
                <b-form-input
                id="phone_number"
                v-model="customerDetails.phone_number"
                disabled
                />
            </b-form-group>
            </b-col>
        </b-row>

        <hr>
        
        <!-- Observaciones -->
        <div>
            <h4>Observaciones</h4>
            <p class="text-justify">{{ customerDetails.observations }}</p>
        </div>   
       
        <hr>

        <h4>Servicios</h4>
        
        <b-table
            title="Servicios"
            ref="serviceTable"
            class="position-relative animated fadeIn"
            :items="customerDetails.services"
            :fields="columns"
            responsive
            primary-key="id"
            :sort-by.sync="sortBy"
            show-empty
            :empty-text="empty"
            :sort-desc.sync="isSortDirDesc"
            :filter="filter"
            :empty-filtered-text="empty"
            :current-page="currentPage"
            :per-page="perPage"
        >

        <!-- Column: Tipo de Servicio -->
        <template #cell(id_type_service)="data">          
            <span>{{ data.item.id_type_service === 1 ? 'Basico' : 'Avanzado' }}</span>
        </template>

        <!--  Detalles  -->
        <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Ocultar' : 'Mostrar'}} Detalles
            </b-button>
        </template>

        <template #row-details="row">
            <b-card>
            <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Observaciones:</b></b-col>
                <b-col>{{ row.item.observations }}</b-col>
            </b-row>
            <b-button size="sm" @click="row.toggleDetails">Ocultar Detalles</b-button>
            </b-card>
        </template>

        </b-table>
      </div>  
    </b-modal>

  </div>
</template>

<script>

/*eslint-disable*/

import { 
  BModal, BButton, VBModal
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {

    customerDetails : {
      type: Object,
      default: () => ({}),
    },

  },
  
  data() {
    return {
      empty: 'No hay datos para mostrar',
      pageLength: 5,
      dir: false,
      columns: [
        { key: 'name', label: 'Nombre Servicio', sortable: true },
        { key: 'id_type_service', label: 'Tipo', sortable: true },
        { key: 'start_date', label: 'Fecha Inicio', sortable: true },
        { key: 'end_date', label: 'Fecha Fin', sortable: true },
        { key: 'show_details', label: 'Detalles', sortable: true },
      ],
      rows: [],
      perPage: 10,
      sortBy: 'id',
      isSortDirDesc: true,
      currentPage: 1,
      filter: '',
    }
  },

}

</script>