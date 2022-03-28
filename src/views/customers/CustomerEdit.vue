<template>
  <!--  eslint-disable -->
  <div>
    <!-- Modal para Editar Cliente -->
    <validation-observer 
      ref="editModal"
      #default="{invalid}">
      <b-modal
        id="modal-customer-edit"
        ref="cutomerEditModal"
        hide-footer
        title="Editar Cliente"
        scrollable
        @hidden="hideCustomerModal">
        <div class="d-block">        
            <form @submit.prevent="updateCustomer">
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
                      v-model="customerDetails.name"
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
                      v-model="customerDetails.identification"
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
                      v-model="customerDetails.email"
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
                      v-model="customerDetails.phone_number"
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
                    v-model="customerDetails.observations"
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
                  <span class="fa fa-check" /> Actualizar
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

  name: 'CustomerEdit',

  props: {
    customerDetails: {
      type: Object,
      default: () => {},
    },
  },

  components: {
    ToastificationContent,
  },

  data() {
    return {}
  },

  methods: {

    async updateCustomer() {

      try {
        const response = await customerService.updateCustomer(this.customerDetails)

        if (response.status === 200) {
          this.hideCustomerModal()
          this.$emit('reload')
          this.showToast('Actualizado', 'CheckIcon', 'Cliente Actualizado', 'success')
        }
      } catch (error) {          
          this.showToast('Advertencia!', 'AlertCircleIcon', 'Ocurrió un error al editar el Cliente', 'warning')
        }
      },

    hideCustomerModal() {
      this.$refs.editModal.reset()
      this.$refs.cutomerEditModal.hide()
      this.$emit('reload')
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
