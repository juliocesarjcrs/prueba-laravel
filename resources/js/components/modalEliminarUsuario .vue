<template>
    <section class="modalCrearUsuario">
        <modal ref="EliminarUser" titulo="Eliminar" tamano="modal-sm">
            <div class="row justify-content-center mb-3">
                <div class="col-10">
                    <p class="text-center">¿Esta seguro que desea eliminar este {{titulo}}?</p>
                </div>
            </div>

            <div class="row">
                <div class="modal-footer w-100 mx-3">
                    <button type="button" class="btn btn-modal-cerrar" data-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="button" class="btn btn-verde" @click="guardarCliente">
                        Aceptar
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
            ruta: '/api/usuarios',
            id: null,
            titulo : 'cliente'
        }  
    },
    methods: {
        toggle(id, tipo){
            console.log('id', id, 'tipo', tipo);
            
            this.id = id
            this.titulo = tipo
     
            this.$refs.EliminarUser.toggle()
        },
        async guardarCliente(){
            try {
                if(this.titulo==='cliente'){
                    const { data } = await axios.delete(`/api/clientes/${this.id}/eliminarCliente`)
                    this.$validar(data)
                }else{
                    const { data } = await axios.delete(`${this.ruta}/${this.id}/eliminarUsuario`)
                    this.$validar(data)
                }
                this.notificacion('Mensaje', 'Eliminado con éxito', 'success')
                this.$emit('actualizar')
                this.$refs.EliminarUser.toggle()
        
                
            } catch (e){
                this.error_catch(e)
            }
        },
  

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
