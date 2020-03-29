<template>
    <el-menu default-active="2" class="el-menu-vertical-demo position-fixed h-100" style="z-index:15;top:0;" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1">
            <i v-show="isCollapse==true" class="el-icon-menu" @click="isCollapse=false" />
            <i v-show="isCollapse==false" class="el-icon-s-grid" @click="isCollapse=true" />
        </el-menu-item>
        <!-- <el-menu-item index="2" @click="$router.push({name:'home'})">
            <fa v-show="isCollapse==true" icon="home" fixed-width />
            <span slot="title">Ir home</span>
        </el-menu-item> -->
        <el-submenu index="2">
            <template slot="title">
                <fa v-show="isCollapse==true" icon="address-card" fixed-width />
                <span slot="title">Clientes</span>
            </template>
            <el-menu-item index="2-2" @click="$router.push({name:'tablaClientes'})">
                Lista clientes
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <fa v-show="isCollapse==true" icon="user" fixed-width />
                <span slot="title">Usuarios</span>
            </template>
            <el-menu-item v-if="user.rol===1" index="2-2" @click="$router.push({name:'tablaUsuarios'})">
                Lista usuarios
            </el-menu-item>
            <el-menu-item v-else index="2-2" disabled>
                (Sin permisos)Lista usuarios
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    middleware: 'auth',

    data(){
        return {
            isCollapse: true
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        }),
    },
    methods: {
        handleOpen(key, keyPath){
            // console.log(key, keyPath)
        },
        handleClose(key, keyPath){
            // console.log(key, keyPath)
        }
    }
}
</script>
<style>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
width: 130px;
min-height: 400px;
} */
.el-menu-vertical-demo {
    /* height: 90vh; */
    /* background: #141E30;  /* fallback for old browsers */
    /*  background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
    /* background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.el-menu-item {
    color: white;
    fa {
        color: white;
    }
    span {
        color: white;
    }
    &:hover {
        i {
            color: #30498e !important;
        }
        span {
            color: #30498e !important;
        }
    }
}
</style>
