<template>
  <!--  eslint-disable -->
  <div>
    <!-- Modal para Agregar Servicios -->
    <validation-observer 
      ref="addModal"
      #default="{invalid}">
      <b-modal
        id="modal-service-add"
        ref="serviceAddModal"
        hide-footer
        title="Agregar Servicio"
        scrollable
        @hidden="hideServiceModal">
        <div class="d-block">        
            <form @submit.prevent="addService">
              
              <!-- Clientes --> 
              <div class="form-row">                   
                <div class="form-group col-md-12">
                  <label for="name">Clientes</label>                                
                  <validation-provider 
                    #default="{ errors }"
                    rules="required">
                    <v-select
                      v-model="service.customer_id"
                      label="name"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="customers"
                      :reduce="customers => customers.id"
                      :clearable="false"
                      input-id="nombre"
                      placeholder="Seleccione el cliente"
                    />
                      <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                          {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                </div>
              </div>

              <div class="form-row">
                <!-- Tipo Servicio -->
                <div class="form-group col-md-12">
                  <label for="name">Tipo Servicio</label>                                
                  <validation-provider 
                    #default="{ errors }"
                    rules="required">
                    <v-select
                      v-model="service.id_type_service"
                      label="name"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="type_services"
                      :reduce="type_services => type_services.id"
                      :clearable="false"
                      input-id="nombre"
                      placeholder="Seleccione el cliente"
                    />
                      <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                          {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                </div>
              </div>             
            
              <div class="form-row">
                <!-- Fecha Inicio -->
                <div class="form-group col-md-6">
                    <label for="start_date">Fecha Inicio</label>
                    <validation-provider
                      #default="{ errors }"
                      name="start_date"
                      rules="required"
                    >
                      <b-form-input
                        id="start_date"
                        v-model="service.start_date"
                        type="date"
                        class="form-control"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </div>

                <!-- Fecha Fin -->
                <div class="form-group col-md-6">
                    <label for="start_date">Fecha Fin</label>
                    <validation-provider
                      #default="{ errors }"
                      name="end_date"
                      rules="required"
                    >
                      <b-form-input
                        id="end_date"
                        v-model="service.end_date"
                        type="date"
                        class="form-control"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </div>
              </div>

              <!-- Descripción -->
              <div class="form-row">                
                <div class="form-group col-md-12">
                  <label for="name">Descripción</label>
                  <validation-provider
                    #default="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <b-form-textarea
                      id="name"
                      v-model="service.name"
                      type="text"
                      class="form-control"
                      placeholder="Descripción del Servicio"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </div>
              </div>

              <div class="form-row">
                <!-- Observacion -->
                <div class="form-group col-md-12">
                  <label for="observacion">Observación</label>
                  <validation-provider
                    #default="{ errors }"
                    name="observación"
                    rules="required"
                  >
                  <b-form-textarea
                    id="observacion"
                    v-model="service.observations"
                    placeholder="Escriba la Observación..."
                    rows="3"
                    max-rows="6"
                    :state="errors.length > 0 ? false:null"
                  ></b-form-textarea>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </div>
              </div>

              <hr>

              <div class="text-right">
                <button
                  type="button"
                  class="btn btn-danger btn-sm mx-1"
                  @click="hideServiceModal"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  :disabled="invalid"
                >
                  <span class="fa fa-check" /> Guardar
                </button>
              </div>
            </form>        
        </div>
      </b-modal>
    </validation-observer>
  </div>
</template>

<script>

/*eslint-disable*/

// Notificaciones
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// Servicios
import * as customerService from '@/services/customers'
import * as service from '@/services/service'
import vSelect from 'vue-select'

export default {

  name: 'CustomerAdd',

  components: {
    ToastificationContent,
    vSelect
  },

  data() {
    return {
      service: {
        name: '',
        customer_id: '',
        id_type_service: '',
        start_date: '',
        end_date: '',
        observations: '',
      },
      customers: [],
      type_services : [
        {
          id: 1,
          name: 'Básico'
        },
        {
          id: 2,
          name: 'Avanzado'
        }
      ],
    }
  },

  created() {
    this.getCustomers()
  },

  methods: {

    async addService() {

      try {
        const response = await service.addService(this.service)

        if (response.status === 201) {
          this.hideServiceModal()
          this.$emit('reload')
          this.showToast('Agregado', 'CheckIcon', 'Servicio Agregado', 'success')
        }
      } catch (error) {          
          this.showToast('Advertencia!', 'AlertCircleIcon', 'Ocurrió un error al agregar el Servicio', 'warning')
        }
    },

    async getCustomers() {
      try {
        const response = await customerService.getCustomers()

        if (response.status === 200) {
          this.customers = response.data
        }
      } catch (error) {
        this.loading = false
      }
    },

    hideServiceModal() {
      this.$refs.addModal.reset()
      this.$refs.serviceAddModal.hide()
      this.cleanForm()
    },

    cleanForm() {
      this.service = {
        name: '',
        customer_id: '',
        id_type_service: '',
        start_date: '',
        end_date: '',
        observations: '',
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

<style>

</style>
