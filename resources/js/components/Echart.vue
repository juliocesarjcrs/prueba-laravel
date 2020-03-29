<template>
    <div :style="{height,width}" style="position:relative;">
        <div ref="grafica" style="height:100%; width:100%; position:relative" />
    </div>
</template>

<script>
import "echarts-liquidfill"
export default {
    name: 'Echarts',
    props: {
        options: [Object],
        id: {
            type: String,
            default: 'ECharts'
        },
        // clase:{
        //   type:String,
        //   default:'w-100'
        // },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        },
        init: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            instance: null
        }
    },
    watch: {
        options: {
            handler(val){
                this.instance.setOption(val,true,true,true)
            },
            deep: true
        }
    },
    mounted(){
        let that = this
        this.ajustar()
        // console.log('paso por aqui ')
    },
    methods: {
        handleResize(){
            this.instance.resize()
            // console.log(' me resize');
        },
        setOption(val, notMerge = false, lazyUpdate = false){
            this.instance.setOption(val, notMerge, lazyUpdate)
        },
        ajustar(){
            window.iii = this.instance = echarts.init(this.$refs['grafica'])
            console.log('ajustar echart');
            // this.$nextTick(() => {
                if (this.init) this.instance.setOption(this.options)
                window.addEventListener('resize', this.handleResize)
                this.instance.resize()
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
.w-responsive{
    width: 700px;
    @media(min-width: 1001){
        width: 450px!important;
    }
}
</style>
