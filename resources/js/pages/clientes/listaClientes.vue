<template>
    <section>
        <div class="container">
            <div class="row mx-1 my-3">
                <span class="text-dark f-600 f-14">Lista de Clientes</span>
                <div class="col my-auto">
                    <hr />
                </div>
                <button type="button" name="button" class="btn btn-general">
                    <el-tooltip class="item" effect="dark" content="Agregar Cliente" placement="top-start">
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
                        <el-table-column align="left" prop="nombre" label="Usuario" />
                        <el-table-column align="left" prop="numero_identificacion" label="Identificación" />
                        <el-table-column align="left" width="70" label="Tipo">
                            <template slot-scope="scope">
                                <span v-if="scope.row.tipo_identificacion===1">CC</span>
                                <span v-if="scope.row.tipo_identificacion===2">Nit</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="correo" label="email" />
                        <el-table-column prop="direccion" label="Dirección" />
                        <el-table-column align="left" width="70">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="Editar Cliente" placement="top-start">
                                    <fa icon="pencil-alt" fixed-width class="cursor-pointer" style="cursor:pointer;" @click="$refs.modalUsuario.toggle(scope.row)" />
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Eliminar Cliente" placement="top-start">
                                    <fa icon="window-close" fixed-width class="cursor-pointer" style="cursor:pointer;" @click="$refs.modalEliminarUsuario.toggle(scope.row.id, 'cliente')" />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <modal-crear-cliente ref="modalUsuario" @actualizar="listRegistros" />
        <modal-eliminar-usuario ref="modalEliminarUsuario" @actualizar="listRegistros" />
    </section>
</template>

<script>
import axios from 'axios'
export default {
    middleware: 'auth',
    data(){
        return {
            ruta: '/api/clientes',
            tableRegistros: [],
        }
    },
    mounted(){ 
        this.listRegistros()
    },
    methods: {
        async listRegistros(){
            try {
                const { data } = await axios(`${this.ruta}/listarclientes`)
                this.$validar(data)
                this.tableRegistros = data.clientes
                console.log('this.tableRegistros', this.tableRegistros );
                
            } catch (e){
                this.error_catch(e)
            }
        },

    }
}
</script>

<style lang="css" scoped>
</style>
