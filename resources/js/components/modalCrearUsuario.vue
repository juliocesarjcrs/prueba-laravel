<template>
    <section class="modalCrearUsuario">
        <modal ref="crearUser" titulo="Crear usuario" tamano="modal-lg">
            <ValidationObserver ref="observer" v-slot="{ invalid }">
                <div class="row justify-content-center mb-3">
                    <div class="col-5 mt-3">
                        <label for="" class="f-12 text-muted ml-2 mb-0">Nombres y apellidos</label>
                        <ValidationProvider v-slot="{ errors }" name="nombres" rules="required">
                            <input v-model="form.name" type="text" name="nombre" value="" class="form-control br-5" />
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                    </div>
                    <div class="col-5 mt-3">
                        <label for="" class="f-12 text-muted f-10 ml-2 mb-0">Correo electrónico</label>
                        <ValidationProvider v-slot="{ errors }" name="correo" rules="required|email">
                            <input v-model="form.email" type="text" name="correo" value="" class="form-control br-5" />             
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                    </div>
                    <div class="col-5 mt-3">
                        <label for="" class="f-12 ml-2 mb-0 lbl-select w-100 text-center">.</label>
                        <el-radio-group v-model="form.rol">
                            <el-radio :label="1">
                                Administrador
                            </el-radio>
                            <el-radio :label="2">
                                Vendedor
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <div class="col-5 mt-3">
                        <label for="" class="f-12 text-muted ml-2 mb-0 lbl-select w-100">Contraseña</label>
                        <ValidationProvider v-slot="{ errors }" name="contraseña" :rules="`${ modoEdicion? '' : 'required|min:6'}`">
                            <el-input v-model="form.password" placeholder="Please input password" show-password :disabled="modoEdicion" />
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
                        Aceptar
                    </button>
                </div>
            </div>
        </modal>
    </section>
</template>

<script>
export default {
    data(){
        return {
            ruta: '/api/usuarios',
            form: {
                id: null,
                name: '',
                email: '',
                rol: 1,
                password: null
            },
            modoEdicion: false
        }
    },
    methods: {
        toggle(data){
            this.clearForm()
            if (data){
                this.modoEdicion = true
                this.form.id = data.id
                this.form.name = data.name
                this.form.email = data.email
                this.form.rol = data.rol
            }
            this.$refs.crearUser.toggle()
        },
        async guardarCliente(){
            try {
                const isValid = await this.$refs.observer.validate()
                if (!isValid){
                    return false
                }
                const { data } = await axios.post(`${this.ruta}/guardarUsuario`, this.form)
                this.$validar(data)
                if(this.modoEdicion){
                    this.notificacion('Mensaje', 'Usuario actualizado', 'success')
                }else{
                    this.notificacion('Mensaje', 'Usuario creado', 'success')  
                }
                this.clearForm()
                this.$emit('actualizar')
                this.$refs.crearUser.toggle()
                
            } catch (e){
                this.error_catch(e)
            }
        },
        clearForm(){
            this.form = {
                name: '',
                email: '',
                rol: 1,
                password: null
            }
            this.modoEdicion= false
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
