<template>
    <div class="main-layout" style="height:100vh;">
        <navbar />
        <menu-lateral v-if="user" />
        <div class="position-relative" style="padding-left:65px;">
            <child />
        </div>

        <!-- <div class="row mx-0">
            <div class="col-sm-10 col-lg-10 container-fluid ml-3" style="background-color: #faebd775;">
                <child />
            </div>
        </div> -->
    </div>
    <!-- <div class="main-layout">
        <navbar />

        <div class="row mx-0">
            <menu-lateral v-if="user" />
            <div class="col-sm-10 col-lg-10 container-fluid ml-3" style="background-color: #faebd775;">
                <child />
            </div>
        </div>
    </div> -->
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '~/components/Navbar'

export default {
    name: 'MainLayout',
    components: {
        Navbar,
        MenuLateral: () => import('~/components/Menu_old2')

    },
    computed: mapGetters({
        user: 'auth/user'
    }),
}
</script>
<style lang="scss">
main{
    padding-left: 65px !important
}
</style>
