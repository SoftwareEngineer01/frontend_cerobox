<template>
  <!--  eslint-disable -->
  <div>
    <!-- Modal para Agregar Centro de Costos -->
    <validation-observer 
      ref="addModal"
      #default="{invalid}">
      <b-modal
        id="modal-customer-add"
        ref="cutomerAddModal"
        hide-footer
        title="Agregar Cliente"
        scrollable
        @hidden="hideCustomerModal">
        <div class="d-block">        
            <form @submit.prevent="addCustomer">
              <div class="form-row">
                <!-- Nombre -->
                <div class="form-group col-md-6">
                  <label for="name">Nombre</label>
                  <validation-provider
                    #default="{ errors }"
                    name="nombre"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="customer.name"
                      type="text"
                      class="form-control"
                      placeholder="Nombre del Cliente"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </div>

                <!-- Identificación -->
                <div class="form-group col-md-6">
                  <label for="identification">Identificación</label>
                  <validation-provider
                    #default="{ errors }"
                    name="identificación"
                    rules="required"
                  >
                    <b-form-input
                      id="identification"
                      v-model="customer.identification"
                      type="text"
                      class="form-control"
                      placeholder="Identificación del Cliente"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </div>

              </div>    


              <div class="form-row">

                <!-- Email -->
                <div class="form-group col-md-6">
                  <label for="email">Email</label>
                  <validation-provider
                    #default="{ errors }"
                    name="email"
                    rules="required"
                  >
                    <b-form-input
                      id="email"
                      v-model="customer.email"
                      type="text"
                      class="form-control"
                      placeholder="Email del Cliente"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </div>

                <!-- Teléfono -->
                <div class="form-group col-md-6">
                  <label for="phone_number">Teléfono</label>
                  <validation-provider
                    #default="{ errors }"
                    name="teléfono"
                    rules="required"
                  >
                    <b-form-input
                      id="phone_number"
                      v-model="customer.phone_number"
                      type="text"
                      class="form-control"
                      placeholder="Teléfono del Cliente"
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
                    v-model="customer.observations"
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
                  @click="hideCustomerModal"
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

export default {

  name: 'CustomerAdd',

  components: {
    ToastificationContent,
  },

  data() {
    return {
      customer: {
        name: '',
        identification: '',
        email: '',
        phone_number: '',
        observations: '',
      },
    }
  },

  methods: {

    async addCustomer() {

      try {
        const response = await customerService.addCustomer(this.customer)

        if (response.status === 201) {
          this.hideCustomerModal()
          this.$emit('reload')
          this.showToast('Agregado', 'CheckIcon', 'Cliente Agregado', 'success')
        }
      } catch (error) {          
          this.showToast('Advertencia!', 'AlertCircleIcon', 'Ocurrió un error al agregar el Cliente', 'warning')
        }
      },

    hideCustomerModal() {
      this.$refs.addModal.reset()
      this.$refs.cutomerAddModal.hide()
      this.cleanForm()
    },

    cleanForm() {
      this.validationErrors = ''      
      this.customer = {
        name: '',
        identification: '',
        email: '',
        phone_number: '',
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
