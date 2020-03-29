<template>
    <section>
        <div class="container">
            <div class="row mx-1 my-3">
                <span class="text-dark f-600 f-14">Lista de Usuarios</span>
                <div class="col my-auto">
                    <hr />
                </div>
                <button type="button" name="button" class="btn btn-general">
                    <el-tooltip class="item" effect="dark" content="Agregar Usuario" placement="top-start">
                        <i class="el-icon-circle-plus-outline" @click="$refs.modalUsuario.toggle(null)" />
                    </el-tooltip>
                </button>
            </div>
        </div>
        <div class="container">
            <div class="row mx-2 my-3">
                <div class="col-12">
                    <el-table :data="tableRegistros" height="350" style="width: 100%">
                        <el-table-column align="center" prop="id" label="Código" width="75" />
                        <el-table-column align="left" label="Rol" width="130">
                            <template slot-scope="scope">
                                <span v-if="scope.row.rol == 1">Administrador</span>
                                <span v-else>Vendedor</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="left" prop="name" label="Usuario" />
                        <el-table-column prop="email" label="email" />
                        <el-table-column align="left" width="70">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="Editar Usuario" placement="top-start">
                                    <fa icon="pencil-alt" fixed-width class="cursor-pointer" style="cursor:pointer;" @click="$refs.modalUsuario.toggle(scope.row)" />
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Eliminar Usuario" placement="top-start">
                                    <fa v-if="scope.row.id !== user.id" icon="window-close" fixed-width class="cursor-pointer" style="cursor:pointer;" @click="$refs.modalEliminarUsuario.toggle(scope.row.id, 'usuario')" />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <modal-crear-usuario ref="modalUsuario" @actualizar="listRegistros" />
        <modal-eliminar-usuario ref="modalEliminarUsuario" @actualizar="listRegistros" />
    </section>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    // middleware: 'auth',
    middleware: 'rol',
    data(){
        return {
            ruta: '/api/usuarios',
            tableRegistros: [],
        }
    },
    computed: mapGetters({
        user: 'auth/user'
    }),
    mounted(){ 
        this.listRegistros()
    },
    methods: {
        agregarProducto(){
            this.$refs.modalCreatedProduct.toggle(null)
        },
        editProduct(data){
            this.$refs.modalCreatedProduct.toggle(data)
        },
        async listRegistros(){
            try {
                const { data } = await axios(`${this.ruta}/listarUsuarios`)
                this.$validar(data)
                this.tableRegistros = data.usuarios.data
                this.pagination= data.pagination
            } catch (e){
                this.error_catch(e)
            }
        },

    }
}
</script>

<style lang="css" scoped>
</style>
