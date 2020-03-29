import {Notification} from 'element-ui'

const Helper = {
    validar(a){
        if(a.error){
            this.notificacion('Advertencia',a.error,'warning')
            throw a
        }
    },
    notificacion(title, message, type = 'info', isHtml = false){
        Notification({
            title:title,
            message:message,
            type:type,
            dangerouslyUseHTMLString: isHtml
        })
    },
    error_catch(e){
        console.log('helper error_catch', e);
        console.warn(e);
    }
}
export default Helper
