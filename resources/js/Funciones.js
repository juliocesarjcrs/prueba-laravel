import Vue from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment'


let vue = new Vue;

export default class Helper{

    /*
    * 2019-03-13 18:39
    * controlar el error de los axios en el catch
    */
    static error_catch(e){
        console.warn(e);
        Helper.cargando(0);
    }

    /*
    | graba el monitoreo en la base de datos
    | de las acciones que el usuario hace con un click
    */
    static monitorear(evento=false,datos=false){
        try {

            axios.post(`/api/monitorear`,{
                url_origen: location.pathname,
                evento : evento,
                datos:datos?JSON.stringify(datos):null
            }).then(({data})=>{
                // console.log(`monitoreado`);
            }).catch(err=>{
                console.warn('No fue posible monitorear el evento',err);
            })

        } catch (e){
            console.warn(e);
        }
    }

    static delay(callback,tiempo=400){
        if(typeof(callback)=='function'){
            if(window['tiempo_gbp']==undefined){
                window['tiempo_gbp']=0;
            }
            if (tiempo_gbp){
                clearInterval(tiempo_gbp)
            }
            tiempo_gbp=setTimeout(()=>{
                callback();
            },tiempo)
        }else{
            console.warn('El primer parámetro debe ser una función.');
        }
    }

    static obtener_extension(archivo){
        return (/[.]/.exec(archivo)) ? /[^.]+$/.exec(archivo)[0] : undefined;
    }
    static validar(data = {}){

        if (data.error){
            console.warn(data);
            vue.$Helper.notificacion('error','Mensaje',data.error);
            vue.$Helper.cargando(0);
            this.monitorear('Error',data);
            return true;
        }
        return false;
    }
    static notificacion(tipo='Info',titulo='',mensaje=''){
        vue.$notify({
            title: titulo,
            message: mensaje,
            type: tipo
        });
    }
    static ucfirst(texto){
        if (texto) {
            return texto.charAt(0).toUpperCase() + texto.slice(1);
        }
    }
    static aux_select(data,columna){
        data.map((currentValue,index)=>{
            currentValue.text = this.ucfirst(currentValue[columna]);
        })
        return data;
    }
    static cargando(bandera = true){
        if (bandera) {
            vue.$vs.loading({ type:'material' })
            return false;
        }
        vue.$vs.loading.close();
    }
    static mensaje(tipo,title='',text='',type='info',callback1=false,callback2=false){
        switch (tipo) {
            case 1:{
                Swal({title,text,type});
            }
            break;
            case 2: { // para confirmar
                Swal.fire({
                    title,
                    text,
                    type,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        if (callback1) {
                            callback1()
                        }
                    } else {
                        if (callback2) {
                            callback1();
                        }
                    }
                })
            }
            break;
            case 3: {
                Swal.fire({
                    html:`
                    <div class="row">
                    <div class="col-12 text-left border-bottom my-auto">
                    <h6 class="mb-0" style="color:#1b1464; padding-bottom: 19px; margin-left: 26px; "> <i class="mdi mdi-cogs" style="font-size: 2em; position:absolute; left: 3px; top: -10px;"></i> Essi Repuestos</h6>
                    </div>
                    <div class="col-12 text-center mt-5 mb-3">
                    <h4>${title}</h4>
                    <p class="mb-0 mt-2">${text}</p>
                    </div>
                    </div>
                    `,
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: true,
                    confirmButtonText:'Si',
                    cancelButtonText:'No',
                }).then((result) => {
                    if (result.value) {
                        if (callback1) {
                            callback1()
                        }
                    }else {
                        if (callback2) {
                            callback1();
                        }
                    }
                })
            }
            case 4: {
                Swal.fire({
                    title,
                    text,
                    type,
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.value) {
                        if (callback1) {
                            callback1()
                        }
                    }
                })
            }
            break;
            default:
            console.log('Eliminado');
        }

    }
    static valueMax(data,index){
        let dataMax = data.sort(function(a,b){return b[index]-a[index]});
        return dataMax[0];
    }

    static fechaEsperada(fecha_ejecucion,dias_frecuencia){
        var estado=true;
        var fecha_esperada = '';
        var i=1;
        while(estado){
            fecha_esperada = moment(fecha_ejecucion).add((i*parseInt(dias_frecuencia)),'days').format('Y-MM-DD');
            if(fecha_esperada>=moment().format('Y-MM-DD')){
                estado=false;
            }
            i++;
        }
        return fecha_esperada
    }

    static mensajeError(error) {
        Swal(error.data.error, `De presentarse continuamente este error comunicarse con el departamento de soporte técnico. Ref  000${error.data.id}`, 'warning');
    }

    /**
    * Función para crear un mensaje de error de manera general cuando ingresa al catch despues de un AXIOS,
    * Creado: Eduard Cala
    * fecha: 02 Abril 2019
    */
    static errorCatch(error, msj) {
        // Helper.cargando2(0);
        Helper.cargando(0);
        console.error(msj, error);
        Helper.notificacion('error','Error',msj);
    }

    static thenAxios(res, titulo = "Sin titulo",tipo=1) {
        let respuesta = false;
        if (res.data.alert) {
            Helper.notificacion('warning','Alerta',res.data.alert);
        } else if (!res.data.error) {
            if(tipo){
                Helper.mensaje(1, titulo, res.data, 'success');
            }
            respuesta = true;
        } else {
            Helper.mensajeError(res);
        }
        Helper.cargando(0);
        return respuesta;
    }

    /*
    tipos
    0=>usuario,
    1=>Usuarios miniatura,
    2=>maquina
    3=>Cliente
    */
    static getImagen(val, tipo = 0) {
        if (val) {
            var arr = ['/usuarios/', '/usuarios/miniatura/','/','/clientes/']
            return `/api/storage${arr[tipo]}${val}`
        }
        var arr = ['sin_user1.png', 'sin_user1.png','sin_user1.png','sin-imagen.jpg']
        return `/img/sinfoto/${arr[tipo]}`
    }

    static abecedario(mayuscula=true,posicion=-1){
        let mayus = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];
        let minus = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];
        if(mayuscula && posicion == -1) return mayus;
        if(posicion == -1) return minus;
        if(mayuscula) return mayus[posicion];
        return minus[posicion];
    }
    /**
    * Validar información del importar Excel
    * Creado por: Eduard Cala
    * fecha: 18 Mayo 2019
    *Params: tabla=>parametro con el nombre de la tabla a la cual se le van añadir los registros
    *Params: datos=>parametro con el arreglo que arroja el EXCEL
    *Params: ruta_validar=>parametro para identificar la ruta a la cual se validara en Backend
    */
    static validarImportar(tabla, datos, ruta_validar, recargar = true) {
        return new Promise(resolve => {
            //columnas del Excel
            const columnasExcel = (t) => {
                let columnas;
                switch (t) {
                    case "bodegas_actualizaciones_items":
                    columnas = [{key: "cantidad", value: 'CANTIDAD'}, {key: "codigo_cliente", value: 'CODIGO CLIENTE'}];
                    break;
                    default:
                    return 'Error no se reconoce la tabla';
                }
                return columnas;
            }
            //Validar campo de manera individual
            const validacionCampo = (campo, caracteristica) => {
                let mensajeError = "";
                switch (caracteristica.tipo) {
                    case 'varchar': {
                        //Validación de longitud
                        let numero_caracteres = parseInt(caracteristica.longitud);
                        let numeroCaracteresContar = campo != null && campo != undefined ? campo.length : 0;
                        if (numeroCaracteresContar > numero_caracteres) {
                            mensajeError += `El numero de caracteres es mayor al permitido, se ingresaron ${numeroCaracteresContar} y el máximo son ${numero_caracteres}`;
                        }
                        //validación de null
                        let esNulo = caracteristica.null;
                        if (!esNulo) {
                            if (numeroCaracteresContar == 0) {
                                mensajeError += mensajeError == "" ? `El campo no debe ser nulo` : `, El campo no debe ser nulo`;
                            }
                        }
                        return mensajeError == "" ? false : mensajeError;
                    }
                    break;

                    case 'int': {
                        let numero_maximo = 2147483647;
                        let valor_campo = campo != null && campo != undefined ? campo : 0;
                        if(typeof valor_campo == "string") valor_campo = valor_campo.replace(/e/g, '');
                        if (isNaN(parseInt(valor_campo))) {
                            mensajeError += mensajeError == "" ? `El campo no tiene un valor entero valido` : `, El campo no tiene un valor entero valido`;
                        } else {
                            let exp = new RegExp("^[0-9]{1,}$");
                            if (!exp.test(valor_campo)) {
                                mensajeError += mensajeError == "" ? `El campo debe tener solo numeros` : `, El campo debe tener solo numeros`;
                            }
                            if (parseInt(valor_campo) > numero_maximo) {
                                mensajeError += mensajeError == "" ? `El valor del campo debe ser maximo de ${numero_maximo}` : `, El valor del campo debe ser maximo de ${numero_maximo}`;
                            }
                        }
                        return mensajeError == "" ? false : mensajeError;
                    }
                    break;

                    case 'decimal': {
                        let arreglo = caracteristica.longitud.split(",");
                        let maximo_entero = parseInt(arreglo[0]) - parseInt(arreglo[1]);
                        let maximo_decimal = parseInt(arreglo[1]);
                        const calcularNumero = (maxi) => {
                            let resultado = "";
                            for (let i = 0; i < maxi; i++) {
                                resultado += `9`;
                            }
                            return resultado;
                        }
                        let numeroMaximo = parseFloat(`${calcularNumero(maximo_entero)}.${calcularNumero(maximo_decimal)}`);
                        let valor_campo = campo != null && campo != undefined ? campo : 0;
                        let punto = false;
                        if (typeof valor_campo == "string") {
                            valor_campo = valor_campo.replace(/e/g, '');
                            valor_campo = valor_campo.replace(/,/g, '');
                            punto = valor_campo.indexOf('.') >= 0 ? true : false;
                            //Verificar de que no halla mas de un punto
                            let v = valor_campo.split(".");
                            if ((v.length - 1) > 1) {
                                mensajeError += `El campo tiene mas de un punto verifica el valor`;
                            }
                        }
                        let exp = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
                        let exp_negativa = new RegExp("^-\[0-9]+(\.[0-9]{1,2})?$");
                        if (!exp.test(valor_campo) && !exp_negativa.test(valor_campo)) {
                            mensajeError += mensajeError == "" ? `El campo debe tener maximo ${arreglo[0]} enterors y ${arreglo[1]} decimales` : `, El campo debe tener maximo ${arreglo[0]} enterors y ${arreglo[1]} decimales`;
                        }
                        if (isNaN(parseFloat(valor_campo))) {
                            mensajeError += mensajeError == "" ? `El campo no tiene un valor decimal valido` : `, El campo no tiene un valor decimal valido`;
                        } else {
                            valor_campo = isNaN(parseFloat(valor_campo)) ? 0 : parseFloat(valor_campo);
                            const formato_miles = (numero) => {
                                return new Intl.NumberFormat("ar-FR").format(numero);
                            }
                            if (valor_campo > numeroMaximo) {
                                mensajeError += mensajeError == "" ? `El valor del campo debe ser maximo de ${formato_miles(numeroMaximo)}` : `, El valor del campo debe ser maximo de ${formato_miles(numeroMaximo)}`;
                            }
                        }
                        return mensajeError == "" ? false : mensajeError;
                    }
                    break;

                    case 'tinyint': {
                        let valor_campo = campo != null && campo != undefined ? campo : 0;
                        if (typeof valor_campo == "string") {
                            valor_campo = valor_campo.replace(/e/g, '');
                        }
                        if (isNaN(parseInt(valor_campo))) {
                            mensajeError += `El campo no tiene un valor entero valido`;
                        } else {
                            //validación de null
                            let esNulo = caracteristica.null;
                            let valorMinimo = 0;
                            if (!esNulo) {
                                valorMinimo = 1;
                            }
                            let exp = new RegExp(`^[0-9]{${valorMinimo},${caracteristica.longitud}}$`);
                            if (!exp.test(valor_campo)) {
                                mensajeError += mensajeError == "" ? `El campo debe tener solo numeros y debe ser maximo de ${caracteristica.longitud} caracteres` : `, El campo debe tener solo numeros y debe ser maximo de ${caracteristica.longitud} caracteres`;
                            }
                        }
                        return mensajeError == "" ? false : mensajeError;
                    }
                    break;

                    default:
                    return false;
                }
            }
            //Realizar la validación despues de hacer el axios
            const validarInformacion = (datosTabla) => {
                //Extracto solo para bodegas_actualizaciones_items
                if(tabla == "bodegas_actualizaciones_items") datosTabla.push({campo:"codigo_cliente",tipo:"varchar",longitud:20,null:false});
                let informacion = datosTabla.filter(o => o.campo != "id" && o.campo != "created_by" && o.campo != "updated_by" && o.campo != "created_at" && o.campo != "updated_at" && o.campo != "deleted_at");
                let columnas = columnasExcel(tabla);
                if (columnas == 'Error no se reconoce la tabla') {
                    return 'Error no se reconoce la tabla';
                }
                let mensaje = '';
                let listaErrores = [];
                let campo;
                let caracteristica;
                let informacionError = {};
                let i = 1;
                for (let d of datos) {
                    i++;
                    for (let c of columnas) {
                        campo = d[c.value];
                        caracteristica = informacion.find(o => o.campo == c.key);
                        mensaje = validacionCampo(campo, caracteristica);
                        if (mensaje != false) {
                            informacionError = {};
                            informacionError.linea = i;
                            informacionError.campo = c.value;
                            informacionError.mensaje = mensaje;
                            listaErrores.push(informacionError);
                        }
                    }
                }
                return listaErrores;
            }
            const armarListaErrorServer = (lista) => {
                if (!lista) {
                    Helper.notificacion('success','Sin errores','Se cargo el excel sin errores')
                    if (recargar) {
                        location.reload();
                    }
                } else {
                    $('.lineas-errores').remove();
                    //Recorrer cada linea
                    let columnas = columnasExcel(tabla);
                    let erroresColumna;
                    let html;
                    for (let l of lista) {
                        html = `<div class="row lineas-errores">
                        <div class="col-md-12">
                        <p class="h6 text-danger shadow-sm rounded py-2"> <a><i class="mdi f-20 mx-2 mdi-playlist-remove"></i></a> Error fila ${l.linea}</p>
                        </div>
                        <div class="col-md-12">`;
                        for (let c of columnas) {
                            if (l.lista[`${c.value}`] != undefined) {
                                for (let error of l.lista[c.value]) {
                                    html += `<p class="h6 border-bottom mx-3"><a class="text-warning"><i class="mdi f-20 mx-2 mdi-shield-remove-outline"></i></a> <strong>Columna: <span class="text-danger">${c.value}</span></strong></br><span class="ml-5"><strong>Error</strong>: ${error}</span></p>`;
                                }
                            }
                        }
                        html += `</div></div>`;
                        $('.listado-errores').append(html);
                    }
                    $('#erroresExcel').modal("show");
                    return lista;
                }
            }
            const despuesValidar = (evaluacion) => {
                return new Promise(resolve => {
                    if (evaluacion.length == 0) {
                        axios.post(`/api/${ruta_validar}`, datos)
                        .then(res => {
                            if (!res.data.error) {
                                if(res.data.errores){
                                    armarListaErrorServer(res.data.errores);
                                    resolve(res.data.errores);
                                }else{
                                    Helper.notificacion('success','Exito',res.data);
                                    resolve([]);
                                }
                            } else {
                                Helper.mensajeError(res);
                            }
                        })
                        .catch(err => {
                            console.warn(err);
                            return 'Error con la conexión';
                        });
                    } else {
                        //Crear un distinct de las lineas del Excel
                        var distinct = new Set();
                        for (let v of evaluacion) {
                            distinct.add(v.linea);
                        }
                        let lista_distinct = [...distinct];
                        $('.lineas-errores').remove();
                        //Recorrer cada linea
                        let erroresColumna;
                        let html;
                        for (let l of lista_distinct) {
                            erroresColumna = evaluacion.filter(o => o.linea == l);
                            html = `<div class="row lineas-errores">
                            <div class="col-md-12">
                            <p class="h6 text-danger shadow-sm rounded py-2"> <a><i class="mdi f-20 mx-2 mdi-playlist-remove"></i></a> Error fila ${l}</p>
                            </div>
                            <div class="col-md-12">`;
                            for (let error of erroresColumna) {
                                html += `<p class="h6 border-bottom mx-3"><a class="text-warning"><i class="mdi f-20 mx-2 mdi-shield-remove-outline"></i></a> <strong>Columna: <span class="text-danger">${error.campo}</span></strong></br><span class="ml-5"><strong>Error</strong>: ${error.mensaje}</span></p>`;
                            }
                            html += `</div></div>`;
                            $('.listado-errores').append(html);
                        }
                        $('#erroresExcel').modal("show");
                        resolve(evaluacion);
                    }
                });
            }
            //Traer la información de la tabla
            Helper.cargando();
            axios(`/api/tabla/estructura/${tabla}`)
            .then(async function(res) {
                let evaluacion = validarInformacion(res.data.log);
                evaluacion = await despuesValidar(evaluacion);
                // despuesValidar([]);
                Helper.cargando(0);
                resolve(evaluacion);
            })
            .catch(err => {
                console.warn(err);
                resolve('Error con la conexión');
            });
        });
    }

    /**Agregado por Eduard Cala
    *  Fecha: Martes 13 de Agosto 2019
    *  Descripcion: Segun cambio de Yiret se debe realizar lo siguiente:
    *  1. Los dias de diferencia entre la fecha actual y la fecha  de proveedor cotizacion (ultimo registro de proveedor precio) = FECHA
    *  1.1.Si no hay una fecha  de proveedor cotizacion (ultimo registro de proveedor precio) debe haber un punto rojo sin numero de dias
    *  1.2 Si los dias son menores a los dias de actualizar solamente debe ir el numero de dias
    *  1.3 Si los dias son mayores o iguales a los dias de actualizar y menor a dias vencidos debe ir el punto amarillo y los dias vencidos (restando al total de días los dias actualizar)
    *  1.4 Si los dias son mayores o iguales a los dias vencidos debe ir el punto naranja y los dias vencidos (restando al total de días los dias vencidos)
    */
    static fechaActualizado(fecha,dias,actualizar,vencida){
        let respuesta = {
            tipo_color:'',
            cantidad_dias:null
        };
        if(fecha == null){
            // Si no hay una fecha  de proveedor cotizacion (ultimo registro de proveedor precio) debe haber un punto rojo sin numero de dias
            respuesta.tipo_color = 'color-rojo';
        }else{
            // Si los dias son menores a los dias de actualizar solamente debe ir el numero de dias
            if(dias < actualizar){
                respuesta.cantidad_dias = dias;
            }else if(dias >= actualizar && dias < vencida){
                // Si los dias son mayores o iguales a los dias de actualizar y menor a dias vencidos debe ir el punto amarillo y los dias vencidos (restando al total de días los dias actualizar)
                respuesta.tipo_color = 'color-amarillo';
                respuesta.cantidad_dias = dias - actualizar;
            }else if(dias >= vencida){
                // Si los dias son mayores o iguales a los dias vencidos debe ir el punto naranja y los dias vencidos (restando al total de días los dias vencidos)
                respuesta.tipo_color = 'color-naranja';
                respuesta.cantidad_dias = dias - vencida;
            }
        }
        return respuesta;
    }
}
