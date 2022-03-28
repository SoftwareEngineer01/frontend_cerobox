<template>
<!-- eslint-disable -->
  <div>
    <b-card>

      <!-- Título -->
      <h2 class="title center-mobile">
        Clientes
      </h2>
     
      <b-row>
        <!-- Boton Agregar -->
        <b-col
          sm="6"
          class="d-flex justify-content-start mb-2"
        >
          <div class="center-mobile">
            <b-button
              v-b-modal.modal-customer-add
              variant="primary"
              @click="showModal = true"
            >
              <span class="text-nowrap">Agregar</span>
            </b-button>
          </div>
        </b-col>

        <!-- Input Buscar -->
        <b-col
          sm="6"
          class="custom-search d-flex justify-content-end mb-2"
        >
          <div class="center-mobile">
            <b-form-group class="">
              <div class="d-flex align-items-center">
                <label class="mr-1">Buscar</label>
                <b-form-input
                  v-model="searchTerm"
                  placeholder="Buscar"
                  type="text"
                  class="d-inline-block"
                />
              </div>
            </b-form-group>
          </div>
        </b-col>
      </b-row>

      <!-- Tabla -->
      <vue-good-table
        class="animated fadeIn"
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm 
        }"

        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >

          <!-- Columna: Nombre -->
          <span v-if="props.column.field === 'name'">
            <b-button
              variant="link"
              v-b-modal.customerDetail
              @click="customerDetail(props.row)"
            >
              {{ props.row.name }}
            </b-button>
          </span>

          <!-- Columna: Opciones -->
          <span v-else-if="props.column.field === 'action'">
            <span>
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>

                 <!-- Boton Detalles  -->
                <b-dropdown-item
                  v-b-modal.customerDetail
                  @click="customerDetail(props.row)"
                >
                  <feather-icon
                    icon="EyeIcon"
                    class="mr-50"
                  />
                  <span>Detalles</span>
                </b-dropdown-item>

                <!-- Boton Editar  -->
                <b-dropdown-item
                  v-b-modal.modal-customer-edit
                  @click="customerDetail(props.row)"
                >
                  <feather-icon
                    icon="Edit2Icon"
                    class="mr-50"
                  />
                  <span>Editar</span>
                </b-dropdown-item>

                <!-- Boton Eliminar -->
                <b-dropdown-item
                  v-b-modal.modal-customer-delete
                  @click="deleteCustomer(props.row)"
                >
                  <feather-icon
                    icon="Trash2Icon"
                    class="mr-50"
                  />
                  <span>Eliminar</span>
                </b-dropdown-item>

              </b-dropdown>
            </span>
          </span>                 
        </template>

        <!-- Paginación -->
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap ">
                Mostrando 1 de
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['3','5','10']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> de {{ props.total }} registros </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>

        <div slot="emptystate">
          No hay datos para mostrar :-(
        </div>

      </vue-good-table>

    </b-card>

    <!-- Modal Detalles Cliente -->
    <CustomerDetail
      ref="customerDetail"
      :customerDetails="this.customerDetails"
    />

    <!-- Modal Para Agregar Cliente -->
    <CustomerAdd
      ref="cutomerAddModal"
      @reload="getCustomers"
    />

    <!-- Modal para Editar Cliente  -->
    <CustomerEdit
      ref="cutomerEditModal"
      :customerDetails="this.customerDetails"
      @reload="getCustomers"
      /> 

  </div>
</template>

<script>

/*eslint-disable*/

// Store
import store from '@/store/index'

// Servicios
import * as customerService from '@/services/customers'

// Components
import CustomerDetail from '@/views/customers/CustomerDetail.vue'
import CustomerAdd from '@/views/customers/CustomerAdd.vue'
import CustomerEdit from '@/views/customers/CustomerEdit.vue'

// Notificaciones
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    CustomerDetail,
    CustomerAdd,
    CustomerEdit,
    ToastificationContent
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      columns: [
        {
          label: 'Código',
          field: 'id',
        },
        {
          label: 'Nombre',
          field: 'name',
        },
        {
          label: 'Identificación',
          field: 'identification',
        },
         {
          label: 'Email',
          field: 'email',
        },
         {
          label: 'Teléfono',
          field: 'phone_number',
        },
        {
          label: 'Opciones',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
      customerDetails: {},
    }
  },
  computed: {

    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },

  },

  created() {
    this.getCustomers()
  },

  methods: {

    async getCustomers() {
      try {
        const response = await customerService.getCustomers()

        if (response.status === 200) {
            this.rows = response.data
        }
      } catch (error) {
        this.loading = false
      }
    },

    customerDetail(data) {
      this.customerDetails = data
    },

    async deleteCustomer(data) {
      
      try {

        const modal = await this.$bvModal.msgBoxConfirm('¿Está seguro de eliminar el registro?', {
          okTitle: 'Si',
          okVariant: 'danger',
          cancelTitle: 'No',
          cancelVariant: 'primary',
        })

        if (modal) {
          const response = await customerService.deleteCustomer(data.id)
          
          if (response.status === 200) {
            this.showToast('Success', 'CheckCircleIcon', 'Registro eliminado correctamente', 'success')
            this.getCustomers()
          }          
        }

      } catch (error) {
        this.showToast('Warning', 'AlertCircleIcon', 'El registro no se pudo eliminar', 'warning')
      }
    },

    showToast(title, icon, text, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          icon,
          text,
          variant,
        },
      })
    },


    
  },

}
</script>

<style lang="css">
   .title {
      font-size: 32px;
      margin-top: 5px;
      margin-bottom: 50px;
    }    
    /* Centrar Contenido*/
    @media (max-width:575px){
      .center-mobile{
        display:table;
        margin:0 auto;
      }
      .title {
        margin-bottom: 20px;
      }
    }
</style>
