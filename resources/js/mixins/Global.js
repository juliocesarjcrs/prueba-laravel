
import Helper from '~/services/helper'

export default {
    methods: {
        $validar(a){
            // console.log('Desde Global mix $validar', a);
            Helper.validar(a)
        },
        error_catch(e){
            // console.log('Desde Global mix error_catch');
            Helper.error_catch(e)
        },
        confirmar(message, title, callback = false, callback2 = false){
            this.$confirm(message, title,{
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                type: 'warning',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                if (callback) callback()
            }).catch(() => {
                if (callback2) callback2()
            })
        },
        aceptar(message, title, callback = false){
            this.$confirm(message, title, {
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                // cancelButtonText: 'No',
                type: 'warning'
                // center: true,
            }).then(() => {
                if (callback) callback()
            })
        },
        notificacion(title, message, type = 'info', isHtml = true){
            Helper.notificacion(title, message, type, isHtml)
        },
        crear_formData(data){
            let fd = new FormData()
            for (var key in data){
                if (Array.isArray(data[key])){
                    for (var key2 in Object.entries(data[key])){
                        fd.append(`${key}[${key2}]`, data[key][key2])
                    }
                } else {
                    fd.append(key, data[key])
                }
            }
            return fd
        },
        foto_default(param){
            let fotos = {
                // bandera:'/photo-default.jpeg',
                bandera: 'sin_foto/Flag.png',
                cliente: 'sin_foto/sin_cliente1.png',
                usuario: 'sin_foto/sin_user1.png',
                proyecto: 'sin_foto/sin_producto1.png'
            }
            return fotos[param]
        },
        icon_extension(fileName){
            let fileTypes = {
                image: {
                    extension: ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'svg'],
                    icon: 'mdi mdi-image color-img'
                },
                pdf: {
                    extension: ['pdf'],
                    icon: 'mdi mdi-file-pdf-box color-pdf'
                },
                video: {
                    extension: ['avi', 'mp4', 'mpg', 'mpeg', 'wmv', 'div'],
                    icon: 'mdi mdi-movie color-video'
                },
                other: {
                    icon: 'mdi mdi-file color-dark'
                }
            }
            let fileType = fileName.split('.').pop()
            let isImage = fileTypes.image.extension.includes(fileType.toLowerCase())
            let isPdf = fileTypes.pdf.extension.includes(fileType.toLowerCase())
            let isVideo = fileTypes.video.extension.includes(fileType.toLowerCase())
            if (isImage){
                return fileTypes.image.icon
            } else if (isPdf){
                return fileTypes.pdf.icon
            } else if (isVideo){
                return fileTypes.video.icon
            } else {
                return fileTypes.other.icon
            }
        },
        file_type(fileName){
            let fileTypes = {
                image: {
                    extension: ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'svg'],
                },
                pdf: {
                    extension: ['pdf'],
                },
                video: {
                    extension: ['avi', 'mp4', 'mpg', 'mpeg', 'wmv', 'div'],
                }
            }
            let fileType = fileName.split('.').pop()
            let isImage = fileTypes.image.extension.includes(fileType.toLowerCase())
            let isPdf = fileTypes.pdf.extension.includes(fileType.toLowerCase())
            let isVideo = fileTypes.video.extension.includes(fileType.toLowerCase())
            if (isImage){
                return 'image/*'
            } else if (isPdf){
                return 'application/pdf'
            } else if (isVideo){
                return 'video/*'
            } else {
                return '*'
            }
        },
        /*funcion tranforma el string base 62de copper a un tipo file*/
        dataURLtoFile(dataurl, filename){
            var arr = dataurl.split(',')
            var mime = arr[0].match(/:(.*?);/)[1]
            var bstr = atob(arr[1])
            var n = bstr.length
            var u8arr = new Uint8Array(n)
            while (n--){
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], filename, {type: mime})
        },
        // genera imagen miniatura a partir de un string base64
        thumbnailify(base64Image, targetSize, callback){
            var img = new Image();

            img.onload = function (){
                var width = img.width,
                height = img.height,
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext("2d");

                canvas.width = canvas.height = targetSize;

                ctx.drawImage(
                    img,
                    width > height ? (width - height) / 2 : 0,
                    height > width ? (height - width) / 2 : 0,
                    width > height ? height : width,
                    width > height ? height : width,
                    0, 0,
                    targetSize, targetSize
                );

                callback(canvas.toDataURL());
            };
            img.src = base64Image;

        },

        async updateBasicos(rulApi,formData){
            try {
                let {data} = await axios.post(rulApi,formData)
                this.$validar(data)
                this.notificacion('Guardado', 'Datos Cuardados con exito', 'success')
            } catch (e){
                this.error_catch(e)
            }
        },
    }
}
