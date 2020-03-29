<template>
    <section class="modalCrearUsuario">
        <modal ref="crearCliente" titulo="Crear usuario" tamano="modal-lg">
            <ValidationObserver ref="observer" v-slot="{ invalid }">
                <div class="row justify-content-center mb-3">
                    <div class="col-5 mt-3">
                        <label for="" class="f-12 text-muted  ml-2 mb-0">Nombres y apellidos</label>
                        <ValidationProvider v-slot="{ errors }" name="nombres" rules="required|max:100">
                            <input v-model="form.nombre" type="text" name="nombre" value="" class="form-control br-5" />
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                    </div>
                    <div class="col-5 mt-3">
                        <label for="" class="f-12 text-muted  ml-2 mb-0">Correo electrónico</label>
                        <ValidationProvider v-slot="{ errors }" name="correo" rules="required|email">
                            <input v-model="form.correo" type="text" name="correo" value="" class="form-control br-5" />             
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                    </div>

                    <div class="col-5">
                        <label for="" class="f-12 text-muted ml-2 mb-0">Numero Documento</label>
                        <ValidationProvider v-slot="{ errors }" name="Numero Identificación" rules="required|numeric|max:12">
                            <input v-model="form.numero_identificacion" type="text" name="nombre" value="" class="form-control br-5" />
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                    </div>

                    <div class="col-5">
                        <label for="" class="f-12 text-muted ml-2 mb-0 lbl-select w-100">Tipo documento</label>
                        <el-select v-model="form.tipoDocumento" placeholder="Seleccionar">
                            <el-option v-for="item in opciones" :key="item.id" :label="item.nombre" :value="item.id" />
                        </el-select>
                    </div>
                    <div class="col-5">
                        <label for="" class="f-12 text-muted  ml-2 mb-0">Dirección</label>
                        <ValidationProvider v-slot="{ errors }" name="dirección" rules="required">
                            <input v-model="form.direccion" type="text" class="form-control br-5" />
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                    </div>
                </div>
            </validationobserver>

            <div class="row">
                <div class="modal-footer w-100 mx-3">
                    <button type="button" class="btn btn-modal-cerrar" data-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="button" class="btn btn-verde" style="font-size: 12px;" @click="guardarCliente">
                        Guardar
                    </button>
                </div>
            </div>
        </modal>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            ruta: '/api/clientes',
            opciones: [
                { id: 1, nombre: 'C.C' },
                { id: 2, nombre: 'NIT' }
            ],
            form: {
                id: null,
                nombre: '',
                tipoDocumento: 1,
                numero_identificacion: '',
                correo: '',
                direccion: '',
            }
        }
    },
    methods: {
        toggle(data){
            this.clearForm()
            if (data){
                this.form.id = data.id
                this.form.nombre = data.nombre
                this.form.tipoDocumento = data.tipo_identificacion === 'C.C' ? 1 : 2
                this.form.numero_identificacion = data.numero_identificacion
                this.form.correo = data.correo
                this.form.direccion = data.direccion
            }
            this.$refs.crearCliente.toggle()
        },
        async guardarCliente(){
            try {
                const isValid = await this.$refs.observer.validate()
                if (!isValid){
                    return false
                }
                const { data } = await axios.post(`${this.ruta}/guardarclientes`, this.form)
                this.$validar(data)
                this.notificacion('Mensaje', 'Cliente creado', 'success')
                this.clearForm()
                this.$emit('actualizar')
                this.$refs.crearCliente.toggle()
                
            } catch (e){
                this.error_catch(e)
            }
        },
        clearForm(){
            this.form = {
                nombre: '',
                tipoDocumento: 1,
                numero_identificacion: '',
                correo: '',
                direccion: '',
            }

             this.$refs.observer.reset()
        }

    }
}
</script>

<style lang="scss" scoped>
.modalCrearUsuario {
    .img-usuario {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .lbl-carpeta-raiz {
        font-size: 10px;
        margin-bottom: 0px;
        position: absolute;
        top: -18px;
    }
    .btn-verde {
        color: #fff;
        background-color: #28a745;
        border-color: #28a745;
        font-size: 12px;
    }
}
</style>
