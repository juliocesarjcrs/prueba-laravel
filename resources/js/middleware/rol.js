import store from '~/store'

export default async (to, from, next) => {
    if(!store.getters['auth/check']){
        next({ name: 'login' })
    }
    else if(store.getters['auth/user'].rol ===2){
        next({ name: 'error' })
    } else {
        next()
    }
}
