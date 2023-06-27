
//========================= VARIABLES PARA MANEJAR DATOS DEPOSITOS ==============================
const d = document,
    $renderBody = d.getElementById("renderBody");


const contenedorTabla = d.getElementById("tableDocument");
const tabla = d.getElementById("tbDocuments_CXC");



let documentosRecientes_cxc = [];
let documentosCliente = [];
let documentosCreditoCliente = [];
let documentosDebitoCliente = [];
let lstClientes = [];

//FORMULARIOS ASOCIACION 
const formularioDocumentoMixto = d.getElementById("formDocumentoMixto");
const table_added_recent = d.getElementById("added_recently");

//-----------------------------------------------------------


//ELEMENTOS  FORMULARIO DEBITO 
const checkBox = d.getElementById("activeCredito_cxc");
const inputDocumentoDebito = d.getElementById("add_documento_debito_cxc");
const inputMontoDocumentoDebito = d.getElementById("monto_debito_cxc");
const inputSaldoDebito = d.getElementById("add_saldo_debito_cxc");
const tipoDocumentoDebito = d.getElementById("add_tipoDocumento_cxc");
const fechaDocumentoDebito = d.getElementById("fechaDocumento_debito_cxc");
const condicionPagoDebito = d.getElementById("condicio_pago_cxc");
const notaMensualidad = d.getElementById("nota_debito_cxc");


//LABELS A MODIFICAR
const titleModalAsociacion_cxc = d.getElementById("title_admin_docs");
const label_selec_cliente = d.getElementById("lb_cliente_asociacion");
const label_select_recibos = d.getElementById("lb_select_creditos");
const label_checkbox_cxc = d.getElementById("lb_activeCredito");

const titleFormularioCredito_cxc = d.getElementById("title_credito");
//ELEMENTOS CREDITO
const inputSaldoCredito = d.getElementById("add_saldo_credito");
const fechaDocumentoCredito = d.getElementById("fechaDocumento_credito_cxc");
const notaCredito = d.getElementById("nota_credito_cxc");
//SELECTS FORMULARIOS
const selectDocumetosDebito = d.getElementById("select_documento_debito_cxc");
const selectDocumetosCredito = d.getElementById("select_documento_credito");
const selectClientes = d.getElementById("add_cliente_cxc");
const selectPartida = d.getElementById("partida_credito");
const selectTipoDocumento_cxc = d.getElementById("add_tipoDocumento_cxc");


//===========================================================

//===============================================================================
//========================= ELEMENTOS BITACORA CXC ==============================
//===============================================================================
const tbId_cxc = document.getElementById("tbDoc_cxc");
const tbUsuarioCreacion_cxc = document.getElementById("tbUsuarioCreacion_cxc");
const tbUsuarioModificacion_cxc = document.getElementById("tbUsuarioModificacion_cxc")

const tbFechaCreacion_cxc = document.getElementById("tbFechaCreacion_cxc");
const tbFechaModificacion_cxc = document.getElementById("tbFechaModificacion_cxc");
const notaLog_cxc = document.querySelector('#notaLog_cxc');



//================ ELEMENTOS MODALES ==============================
let formDocument_CXC = document.querySelector('#formAddDocument_CXC');
let modalTitle_CXC = document.querySelector('#ModalTitle_CXC');
let btnModal_CXC = document.getElementById("btnModal_CXC");


//CLICK

$renderBody.addEventListener("click", (e) => {

    let page = e.target.dataset.value || "";


    //============================================================================================================
    //====================================================== METODDOS DE DOCS_CXC ================================
    //============================================================================================================

    //===================================================
    //===========  BOTON HACER DEPOSITO  ================
    //=========== A DOCUMENTO ESPECIFICO ================
    //=========== O CREAR Y RELACIONAR DOC ==============
    //===================================================


    if (e.target.name === "create_deposito_cxc") {
        cambiarNombresInputs_CXC();

        const selectPartida = d.getElementById("partida_credito");
        const selectCliente = d.getElementById("add_cliente_cxc");


        // inputMontoDocumentoDebito.removeAttribute("required");

        limpiarFormularioDebito();
        limpiarFormularioCredito();
        llenarSelectPartidas(selectPartida, "IG");
        llenarSelectCliente(selectCliente);

        llenarSelectTipoDocumento_cxc(selectTipoDocumento_cxc);

        obtenerDocumentos_ClienteCXC("");

        table_added_recent.setAttribute("hidden", "");

        if (checkBox.checked) {
            inputMontoDocumentoDebito.disabled = true;
            inputMontoDocumentoDebito.removeAttribute("required");

        } else {
            inputMontoDocumentoDebito.disabled = false;
            inputDocumentoDebito.setAttribute("required", "");
        }


        $("#crear_documento_asociar_deposito").modal("show");

        return false;
    }
    //===================================================
    //=============  BOTON EDITAR_CXC   ================
    //===================================================

    else if (e.target.id == "btnEditDoc_cxc") {
        let doc = e.target.dataset.id;
        const div_saldo = d.getElementById("grupo_saldo_cxc");
        const div_estado = d.getElementById("grupo_estado_cxc");
        const div_tipo = d.getElementById("grupo_tipo_cxc");

        btnModal_CXC.value = "Editar Documento";
        modalTitle_CXC.textContent = "Editar Documento Cuenta por Cobrar";


        div_estado.removeAttribute('hidden');
        div_saldo.removeAttribute('hidden');
        div_tipo.removeAttribute('hidden');

        showDataDocument_cxc(doc, "Datos");


        $("#ModalDocument_CXC").modal("show");
        return false;
    }

    //===================================================
    //=============  BOTON BITACORA   ===================
    //===================================================
    else if (e.target.name == "viewLogDoc_cxc") {
        let doc = e.target.dataset.id;

        showDataDocument_cxc(doc, "Bitacora");

        return false;
    }

    //===================================================
    //========  BOTON AGREGAR CLIENTE   ================
    //===================================================

    else if (e.target.name === "btnAddCliente") {

        $("#ModalDocument_CXC").modal("hide");

        let numPage = Number(d.getElementById("pagActual").textContent) - 1;
        let objPaginacion = {
            palabraBuscar: d.getElementById("buscar").value.toLowerCase(),
            NumPagina: numPage,
            CantRegistros: d.getElementById("tamanoPagina").value,
            totalPaginas: d.getElementById("totalPag").textContent

        }
        localStorage.setItem("objPaginacion", JSON.stringify(objPaginacion));



        return false;
    }
    //===================================================
    //========  BOTON SIGUIENTE PAGINA  =================
    //===================================================
    else if (e.target.name === "nextPage") {
         const optionTable = document.querySelector('#ChoiceDocumentTable').value;

        //AVANZA DE PAGINA EN LA TABLA CUENTAS POR COBRAR
        //DEPENDIENDO DE LA TABLA SELECCIONADA
        if (optionTable == "DOCUMENTS_CXC") {

            siguientePagina({
                sig: page,
                totalPage: d.getElementById("totalPag").textContent,
                CantRegistros: d.getElementById("tamanoPagina").value,
                url: "Documents/_TableDocument_CXC",
                container: "tableDocument",
                palabraBuscar: d.getElementById("buscar").value.toLowerCase()
            })
        }
        return false;
    }
    //===================================================
    //===========  BOTON PAGINA ANTERIOR   ==============
    //===================================================
    else if (e.target.name === "previousPage") {
        const optionTable = document.querySelector('#ChoiceDocumentTable').value;

        //RETROCEDE DE PAGINA EN LA TABLA CUENTAS POR COBRAR
        //DEPENDIENDO DE LA TABLA SELECCIONADA
        if (optionTable == "DOCUMENTS_CXC") {
            retrocederPagina({
                ant: page,
                totalPage: d.getElementById("totalPag").textContent,
                tamanoPagina: d.getElementById("tamanoPagina").value,
                url: "Documents/_TableDocument_CXC",
                container: "tableDocument",
                palabraBuscar: d.getElementById("buscar").value.toLowerCase()
            })

        }
    }
    //===================================================
    //===========  BOTON VER DEPOSITOS CXC  =============
    //===================================================
    else if (e.target.name === "show_depositos_cxc") {
        var modalDepositos = d.getElementById("crear_documento_asociar_deposito");
        d.getElementById("ModalTitleDeposito_CXC").textContent = "Depositos Realizados";
        d.getElementById("thDepositos").textContent = "Documento #";
        d.getElementById("persona_asociada").textContent = "Nombre Cliente";
        d.getElementById("num_documento").textContent = "Mensualidad #";
        d.getElementById("fecha_documento").textContent = "Fecha De La Mensualidad";
        let pDoc = e.target.dataset.id;

        const table = d.getElementById("tbDepositos");

        limpiarHtml(table);

        showHeaderDeposit_cxc(pDoc);
        mostrarRecibosxMensualidad(pDoc);
        return false;
    }
    //===================================================
    //===========  BOTON ELIMINAR DEPOSITOS CXC  ========
    //===================================================
    else if (e.target.id === "remove_deposito") {
        const DocumentoDebito = d.getElementById("numero_documento").value;
        const DocumentoCredito = e.target.dataset.id;


        swal({
            title: "¿Retirar Recibo?",
            text: "¿Seguro que quiere Retirar el Recibo?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sí, Eliminar!",
            closeOnConfirm: false
        },
            function () {
                fetchMethod({

                    url: "Documents/removeDeposit",
                    body: {
                        NombreTablaAuxiliar: "AUXILIAR_CXC",

                        DocumentoDebito: DocumentoDebito,

                        DocumentoCredito: DocumentoCredito,
                    },
                    cbSuccess: (res) => {

                        if (res.resp == 1) {


                            swal('Bien!',
                                res.msj,
                                'success')

                            cargarComponent({
                                container: "renderLocalDoc",
                                url: "Documents/_ShowDocuments_CXC",
                            })
                            showHeaderDeposit_cxc(DocumentoDebito);
                            mostrarRecibosxMensualidad(DocumentoDebito);

                        }
                        else {
                            swal('Opps!',
                                res.msj,
                                'error')
                        }

                    }

                });
            }
        );
        return false;
    }

    //===================================================
    //========  BOTON MUESTRA DEPOSITOS CREADOS  ========
    //===================================================

    else if (e.target.name === "recientes_agregados_cxc") {
        const btnVerRecientes = d.getElementById("recientes_agregados");

        if (btnVerRecientes.value == "1") {

            table_added_recent.removeAttribute("hidden");
            btnVerRecientes.value = "0";
            llenarTablaDocumentosRecientes_cxc();
        }
        else {
            table_added_recent.setAttribute("hidden", "");
            btnVerRecientes.value = "1";
        }

    }

});

//submit
$renderBody.addEventListener("submit", (e) => {

    e.preventDefault();

    //===================================================
    //============= METODDOS DE DOCS_CXC ================
    //===================================================

    //===================================================
    //===========  EDITA UN DOCUMENTO CXC  =============
    //===================================================


    if (e.target.id === "formAddDocument_CXC") {

        $("#ModalDocument_CXC").modal("hide");

        fetchMethod({
            url: "Documents/EditDocument_CXC",
            body: {

                Documento: d.getElementById("documento_cxc").value,
                IdCliente: d.getElementById("IdCliente").value,
                TipoDocumento: d.getElementById("tipoDocumento_cxc").value,
                Monto: d.getElementById("monto_cxc").value,
                Saldo: d.getElementById("saldo_cxc").value,
                Estado: d.getElementById("estado_cxc").value,
                CondicionPago: d.getElementById("pago_cxc").value,
                FechaDocumento: d.getElementById("fechaDocumento_cxc").value,
                Notas: d.getElementById("nota_cxc").value,

            },
            cbSuccess: (res) => {
                if (res.resp == 1) {

                    cargarComponent({
                        container: "tableDocument",
                        url: "Documents/_TableDocument_CXC",
                    })
                    swal('Bien!',
                        res.msj,
                        'success')
                }
                else {
                    swal('Opps!',
                        res.msj,
                        'error')
                }
            }


        });
        return false;
    }
    //===================================================
    //============= METODDO AGREGAR PROVEEDOR ===========
    //===================================================

    else if (e.target.name === "createProveedor") {

        fetchMethod({
            url: "Proveedor/CrearProveedor",
            body: {
                Nombre: d.getElementById("nombre").value,
                Identificacion: d.getElementById("identificacion").value,
                Tipo: d.getElementById("tipo").value,
                Contacto: d.getElementById("contacto").value,
                Telefono1: d.getElementById("telefono1").value,
                Telefono2: d.getElementById("telefono2").value,
                CorreoElectronico: d.getElementById("correo").value,
                CondicionPago: d.getElementById("condicionPago").value,
                CuentaBancaria: d.getElementById("cuentaBancaria").value,
                Banco: d.getElementById("banco").value,
            },
            cbSuccess: (res) => {
                if (res.status == 1) {

                    cargarComponent({
                        container: "renderLocalDoc",
                        url: "Documents/_ShowDocuments_CXP",
                    })
                    swal('Bien!',
                        res.mensaje,
                        'success')
                }
                else {
                    swal('Opps!',
                        res.mensaje,
                        'error')
                }
            }
        })
        return false;
    }

    //===================================================
    //========= RELACIONA O AGREGAR DOCUMENTO ===========
    //===================================================

    else if (e.target.name === "formDocumentoMixto_cxc") {

        crearDocumento_CXC();

        return false;

    }
});


//change
$renderBody.addEventListener("change", (e) => {

    //===================================================
    //========  CANTIDAD DE REGISTROS A MOSTRAR =========
    //======  DEPENDIENDO DE LA TABLA SELECCIONADA ======
    //===================================================

    if (e.target.id === "tamanoPagina") {

        const optionTable = d.querySelector('#ChoiceDocumentTable').value;
        if (optionTable == "DOCUMENTS_CXC") {


            cambioTamanoPagina({
                totalPage: d.getElementById("totalPag").textContent,
                tamanoPagina: e.target.value,
                url: "Documents/_TableDocument_CXC",
                container: "tableDocument",
                palabraBuscar: d.getElementById("buscar").value.toLowerCase(),
                NumPagina: (d.getElementById("pagActual").textContent - 1)
            });


        }

        return false;
    }
    //===================================================
    //===========  CAMBIA LA TABLA A MOSTRAR  ===========
    //===================================================

    else if (e.target.name === "ChoiceDocumentTable") {

        const optionTable = d.querySelector('#ChoiceDocumentTable').value;

        if (optionTable == "DOCUMENTS_CXC") {


            cargarComponent({
                container: "renderLocalDoc",
                url: "Documents/_ShowDocuments_CXC",
            });
        }
        return false;
    }

    //==========================================================
    //===========  DESPLIEGA LOS DOCUMENTOS CREDITO  ===========
    //===========  EN BASE A LOS CREDITOS CON SALDO  ===========
    //===================== DEL CLIENTE  =======================
    //==========================================================

    else if (e.target.name === "add_cliente_cxc") {
        const pIdCliente = selectClientes.value;
        limpiarFormularioDebito();
        limpiarFormularioCredito;

        obtenerDocumentos_ClienteCXC(pIdCliente);

        return false;
    }

    //===================================================
    //===========  CAMBIA LOS SALDOS DEl   ==============
    //===========  DOCUMENTOS CREDITO  ==================
    //===================================================
    else if (e.target.name === "select_documento_credito") {


        if (selectDocumetosCredito.value != "") {

            const obj = documentosCreditoCliente.find(function (documento) {
                if (documento.Documento === selectDocumetosCredito.value) {
                    return documento.Saldo;
                }
            });

            llenarFormularioCredito(obj);

        } else {
            removerRequieredRecibos(true);
            inputSaldoCredito.value = 0;
            notaCredito.value = "";
        }

        return false;
    }
    //===================================================
    //===========  CAMBIA LOS SALDOS DEl   ==============
    //===========  DOCUMENTOS DEBITO  ==================
    //===================================================
    else if (e.target.name === "select_documento_debito_cxc") {
        if (selectDocumetosDebito.value == "") {

            limpiarFormularioDebito();

        } else {
            const obj = documentosDebitoCliente.find(function (documento) {
                if (documento.Documento === selectDocumetosDebito.value) {
                    return documento.Saldo;
                }
            });
            actualizarDatosDocumentosDebitosAsociar(obj);
        }
        llenarTablaDocumentosRecientes_cxc();
    }
    //===================================================
    //===========  Verifica la fecha del Doc  ===========
    //==================  a Crear  ======================
    //===================================================
    else if (e.target.id === "fechaDocumento_cxc") {

        const inputFecha = d.getElementById("fechaDocumento_cxc");
        const botonAgregar = d.getElementById('btnModal_CXC');
        verificarFecha(inputFecha, botonAgregar);
        return false;
    }
    //===================================================
    //===========  Verifica la fecha de  Ingresar =======
    //===========  Documento Debito Asociacion  =========
    //===================================================
    else if (e.target.name === "fechaDocumento_debito_cxc") {
        verificarFechasDocumentosAsociados();
        return false;

    }
    //===================================================
    //===========  Verifica la fecha de  Ingresar =======
    //===========  Documento Credito Asociacion  =========
    //===================================================
    else if (e.target.name === "fechaDocumento_credito_cxc") {


        if (fechaDocumentoCredito.value != "") {
            removerRequieredRecibos(false);
            verificarFechasDocumentosAsociados();
        }
        else {
            verificarFechasDocumentosAsociados();
            removerRequieredRecibos(true);
        }
        return false;

    }

    //===================================================
    //=======  MUESTRA LAS MENSUALIDADES PENDIENTES =====
    //=========== DEL CLIENTE SELECCIONADO ==============
    //===================================================
    else if (e.target.name === "activeCredito_cxc") {
        const pIdCliente = selectClientes.value;

        if (checkBox.checked) {
            inputDocumentoDebito.removeAttribute("required");
            //d.getElementById("grupo__monto_debito").removeAttribute("hidden");
            d.getElementById("grupo_saldo_debito").removeAttribute("hidden");

            inputMontoDocumentoDebito.removeAttribute("required");
            inputMontoDocumentoDebito.disabled = true;

            obtenerDocumentos_ClienteCXC(pIdCliente);

            removerRequieredRecibos(false);
            activarInputsFormularioCredito(true);
        } else {

            //d.getElementById("grupo__monto_debito").setAttribute("hidden", "");
            //d.getElementById("grupo_saldo_debito").setAttribute("hidden", "");
            inputMontoDocumentoDebito.disabled = false;
            inputDocumentoDebito.setAttribute("required", "");
            limpiarFormularioDebito();
            tipoDocumentoDebito.options.item(0).selected = 'selected';
            removerRequieredRecibos(true);
        }

        activarInputsFormularioDebito();
        return false;
    }
    //===================================================
    //===========  CAMBIA LOS ESTADOS DEL   =============
    //===========  FORMULARIO CREDITO  ==================
    //===========  ACTIVA O DESACTIVA  ==================
    //===================================================
    else if (e.target.name === "add_tipoDocumento_cxc") {
        inputMontoDocumentoDebito.value = 0;
        inputSaldoDebito.value = 0;
        if (tipoDocumentoDebito.value == "reci") {

            //d.getElementById("grupo__monto_debito").removeAttribute("hidden");
            //d.getElementById("grupo_saldo_debito").removeAttribute("hidden");
        
            inputMontoDocumentoDebito.setAttribute("required", "");

            inputMontoDocumentoDebito.disabled = false;

            activarInputsFormularioCredito(false);

        } else if (tipoDocumentoDebito.value == "mens") {

            activarInputsFormularioCredito(true);
            buscarParametroActivo();
            inputMontoDocumentoDebito.disabled = true;
            inputMontoDocumentoDebito.removeAttribute("required");

            removerRequieredRecibos(true);
        } else if (tipoDocumentoDebito.value == "extr") {

            activarInputsFormularioCredito(true);
         
            inputMontoDocumentoDebito.disabled = false;
            inputMontoDocumentoDebito.setAttribute("required", "");

            removerRequieredRecibos(true);
        }

    }
    else if (e.target.name === "partida_credito") {
        if (selectPartida.value != "") {
            removerRequieredRecibos(false);
        } else {
            removerRequieredRecibos(true);
        }
    }



    $("#monto_debito_cxc").on("keyup", function () {
        inputSaldoDebito.value = inputMontoDocumentoDebito.value;

    })


    $("#buscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        const optionTable = d.querySelector('#ChoiceDocumentTable').value;
        
        if (optionTable == "DOCUMENTS_CXC") {
            
            $("#tableDocument").load("Documents/_TableDocument_CXC",
                {

                    NumPagina: 0,
                    palabraBuscar: value,
                    estaBuscando: true,
                    accion: 'n', //n -> no pasar de pagina
                    CantRegistros: document.getElementById("tamanoPagina").value,
                    

                }, function (res) {
                    $("#tableDocument").html(res);
                })

        }


    });
});

//FUNCIONES

function crearDocumento_CXC() {

    var DocumentoDebito = "";
    var DocumentoCredito = "";

    var verificaForm = true;
    let nuevoDoc;

    if (checkBox.checked) {
        DocumentoDebito = selectDocumetosDebito.value;
        DocumentoCredito = selectDocumetosCredito.value;
        if ((DocumentoCredito == "" && inputDocumentoDebito == "") || DocumentoCredito == "") {
            verificaForm = false;
        }
    } else {
        nuevoDoc = true;
        DocumentoDebito = inputDocumentoDebito.value;
        if (DocumentoDebito == "") {
            verificaForm = false;
        }
    }
    if (verificaForm) {
        fetchMethod({
            url: "Documents/AddMixedDocuments",
            body: {
                NombreTabla: "DOCUMENTO_CXC",
                NombreTablaAuxiliar: "AUXILIAR_CXC",
                NuevoDocumento: nuevoDoc,
                DocumentoDebito: DocumentoDebito,
                MontoDebito: inputMontoDocumentoDebito.value,
                SaldoDebito: inputSaldoDebito.value,

                TipoDocumento: tipoDocumentoDebito.value,
                FechaDocumentoDebito: fechaDocumentoDebito.value,
                // CondicionPago: condicionPagoDebito.value,
                NotaDebito: notaMensualidad.value,
                IdCliente: selectClientes.value,

                DocumentoCredito: selectDocumetosCredito.value,

                SaldoCredito: inputSaldoCredito,
                FechaDocumentoAsociacion: fechaDocumentoCredito.value,
                IdPartida: selectPartida.value,
            },
            cbSuccess: (res) => {
                if (res.resp == 1) {


                    swal('Bien!',
                        res.msj,
                        'success')

                    var objNew = {
                        DocDebito: DocumentoDebito,
                        DocCredito: DocumentoCredito,
                        Cliente: selectProveedor_cxp.value
                    };
                    
                    llenarTablaDocumentosRecientes_cxc();

                    cargarComponent({
                        container: "renderLocalDoc",
                        url: "Documents/_ShowDocuments_CXC",
                    })
                    var idCliente = selectClientes.value;
                    obtenerDocumentos_ClienteCXC(idCliente);



                    removerRequieredRecibos(true);
                }
                else {
                    swal('Opps!',
                        res.msj,
                        'error')
                }
            }
        })
        limpiarFormularioDebito();
        limpiarFormularioCredito();

    }
    else {

        swal('Opps!',
            'Faltan Datos Importantes',
            'error')
    }

}

function buscarParametroActivo() {
    fetch("Documents/getParameter")
        .then(res => res.ok ? res.json() : null)
        .then(res => {
            
            const { Mensualidad } = res;
            inputMontoDocumentoDebito.value = Mensualidad;
            inputSaldoDebito.value = Mensualidad;
        });
}

function llenarTablaDocumentosRecientes_cxc() {
    const tableDepositosRecientes = d.getElementById("tbDepositosRecientes");
    limpiarHtml(tableDepositosRecientes);

    var pDoc = selectDocumetosDebito.value;
    doc.getElementById("doc_debito").textContent = "Mensualidad";
    doc.getElementById("doc_credito").textContent = "Deposito";
    doc.getElementById("nombreCliente").textContent = "Cliente";

    if (pDoc != "") {
        fetch("Documents/getDeposits_CXC" + "?pDocument=" + pDoc)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                console.log(res);
                if (res.length > 0) {
                    let total = 0;
                    for (var i = 0; i < res.length; i++) {

                        var { Documento, DocumentoCredito, FechaCreacion, MontoDeposito, NombreCliente } = res[i];

                        


                        var FechaAux = convertirFecha(FechaCreacion);
                        total = total + MontoDeposito;

                        
                        MontoDeposito = MontoDeposito.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });

                        var datos = `
                               <tr id="tbRecientes">
                                    <td id="tbDocumentoDeb">${Documento}</td>
                                    <td id="tbDocumentoCred">${DocumentoCredito}</td>
                                    <td id="tbCliente">${NombreCliente}</td>
                                    <td id="tbMonto" class="money">${MontoDeposito}</td>
                                    <td id="tbFecha">${FechaAux}</td>


                               </tr>`;




                        $("#tbDepositosRecientes").append(datos)
                    }


                } else {


                    var mensaje = `
                           <tr>
                                <td colspan="8">No existen registros actualmente</td>
                         </tr>

                        `;
                    $("#tbDepositosRecientes").append(mensaje)
                }


            })
    } else {
        var mensaje = `
                           <tr>
                                <td colspan="8">No existen registros actualmente</td>
                         </tr>

                        `;
        $("#tbDepositosRecientes").append(mensaje)
    }
}

function mostrarRecibosxMensualidad(pDoc) {
    const tableDepositos = d.getElementById("tbDepositos");
    limpiarHtml(tableDepositos);
    fetch("Documents/getDeposits_CXC" + "?pDocument=" + pDoc)
        .then(res => res.ok ? res.json() : null)
        .then(res => {


            if (res.length > 0) {
                let total = 0;
                for (var i = 0; i < res.length; i++) {

                    var { DocumentoCredito, FechaCreacion, FechaDocumento, MontoDeposito } = res[i];

                    

                    var FechaDoc = convertirFecha(FechaDocumento);
                    var FechaAux = convertirFecha(FechaCreacion);
                    total = total + MontoDeposito;

                    
                    MontoDeposito = MontoDeposito.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    var datos = `
                               <tr id="tbDatos">
                                    <td id="tbDocumento">${DocumentoCredito}</td>
                                    <td id="tbMonto" class="money">${MontoDeposito}</td>
                                    <td id="tbFecha">${FechaAux}</td>
                                    <td>
                                         <button data-id="${DocumentoCredito}" id="remove_deposito" type="button" class="btn btn-outline-danger">
                                        <i class="fa fa-remove mr-2" aria-hidden="true"></i>Desasociar Documento
                                        </button>

                                    </td>

                               </tr>`;

                    const totalConFormato = total.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    d.getElementById("total_depositos").textContent = totalConFormato;
                    d.getElementById("total_depositos").value = totalConFormato;


                    d.getElementById("grupo_total").removeAttribute("hidden", " ")

                    $("#tbDepositos").append(datos)
                }


            } else {
                d.getElementById("grupo_total").setAttribute("hidden", false);

                var mensaje = `
                           <tr>
                                <td colspan="8">No existen registros actualmente</td>
                         </tr>

                        `;
                $("#tbDepositos").append(mensaje)
            }

        })

    $("#ModalDeposito").modal("show");
};



function removerRequieredRecibos(flag) {

    if (flag) {
        selectPartida.removeAttribute("required");
        selectDocumetosCredito.removeAttribute("required");
        fechaDocumentoCredito.removeAttribute("required");

    } else {
        selectPartida.setAttribute("required", "required");
        selectDocumetosCredito.setAttribute("required", "required");
        fechaDocumentoCredito.setAttribute("required", "required");
    }
}

function activarInputsFormularioCredito(flag) {

    if (flag) {
        selectDocumetosCredito.disabled = false;
        selectPartida.disabled = false;
        fechaDocumentoCredito.disabled = false;
    } else {
        selectDocumetosCredito.disabled = true;
        selectPartida.disabled = true;
        fechaDocumentoCredito.disabled = true;
    }
}

function activarInputsFormularioDebito() {
    if (checkBox.checked) {
        //DESACTIVAR ELEMENTOS 


        inputMontoDocumentoDebito.disabled = true;
        tipoDocumentoDebito.disabled = true;
        fechaDocumentoDebito.disabled = true;
        
        notaMensualidad.disabled = true;
        inputDocumentoDebito.setAttribute('hidden', '');
        selectDocumetosDebito.removeAttribute('hidden');

        d.getElementById("grupo_pago_debito").removeAttribute('hidden');
    } else {
        //DESACTIVAR ELEMENTOS 
        inputMontoDocumentoDebito.disabled = false;
        tipoDocumentoDebito.disabled = false;
        fechaDocumentoDebito.disabled = false;
        
        notaMensualidad.disabled = false;

        inputDocumentoDebito.removeAttribute('hidden');
        selectDocumetosDebito.setAttribute('hidden', '');
        d.getElementById("grupo_pago_debito").setAttribute('hidden', '');

        //LIMPIA LOS DATOS MENOS EL SELECT
        limpiarFormularioDebito();
    }
};

function formatCurrency(amount, currencySymbol, decimalSeparator, thousandsSeparator) {
    const negative = amount < 0 ? '-' : '';
    const i = parseInt(amount = Math.abs(+amount || 0).toFixed(2)).toString();
    const j = (i.length > 3) ? i.length % 3 : 0;

    return negative + currencySymbol + ' ' +
        (j ? i.substr(0, j) + thousandsSeparator : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSeparator) +
        decimalSeparator + Math.abs(amount - i).toFixed(2).slice(2);
};


function actualizarDatosDocumentosDebitosAsociar(objDebito) {


    if (objDebito.TipoDocumento == "mens") {
        tipoDocumentoDebito.options.item(1).selected = 'selected';
    } else if (objDebito.TipoDocumento == "extr") {
        tipoDocumentoDebito.options.item(2).selected = 'selected';
    }
    let montoFloat = parseFloat(objDebito.Monto);

    let setDate = convertirFecha_yy_MM_dd(objDebito.FechaDocumento);

    inputDocumentoDebito.textContent = objDebito.Documento;
    inputDocumentoDebito.value = objDebito.Documento;

    inputMontoDocumentoDebito.textContent = objDebito.Monto;
    inputMontoDocumentoDebito.value = objDebito.Monto;

    fechaDocumentoDebito.valueAsDate = new Date(setDate);
    condicionPagoDebito.textContent = objDebito.CondicionPago;
    condicionPagoDebito.value = objDebito.CondicionPago;
    notaMensualidad.value = objDebito.Notas;
    inputSaldoDebito.textContent = objDebito.Saldo;
    inputSaldoDebito.value = objDebito.Saldo;


}


function verificarFechasDocumentosAsociados() {
    const fechaActual = getDateToDay();
    const botonAgregar = d.getElementById('asociar_documento_cxc');

    var inputDebitoValido = true;
    var inputCreditoValido = true;

    if (fechaDocumentoDebito.value > fechaActual) {

        fechaDocumentoDebito.style.border = '2px solid red';
        botonAgregar.disabled = true;
        inputDebitoValido = false;
    }
    else {
        fechaDocumentoDebito.style.border = '1px solid #ced4da';
        inputDebitoValido = true;
    }

    if (fechaDocumentoCredito.value > fechaActual) {

        fechaDocumentoCredito.style.border = '2px solid red';

        botonAgregar.disabled = true;
        inputCreditoValido = false;

    } else {

        fechaDocumentoCredito.style.border = '1px solid #ced4da';
        inputCreditoValido = true;
    }


    if (inputCreditoValido === true && inputDebitoValido === true) {
        botonAgregar.disabled = false;
    }

};


function getDateToDay() {
    const fechaActual = new Date();
    var dia = fechaActual.getDate().toString().padStart(2, "0");
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
}
//=======================================================
//===========  Verifica la fecha de un solo Input =======
//===========  Cuando se Edita Un Documento  ============
//===================================================
function verificarFecha(InputFecha, btnAgregar) {
    const fechaActual = getDateToDay();
    if (InputFecha.value > fechaActual) {

        InputFecha.style.border = '2px solid red';
        btnAgregar.disabled = true;
    } else {
        btnAgregar.disabled = false;
        InputFecha.style.border = '1px solid #ced4da'
    }
};

function limpiarFormularioDebito() {
    inputDocumentoDebito.value = "";

    inputMontoDocumentoDebito.value = "";
    
    notaMensualidad.value = "";
    inputSaldoDebito.value = 0;
    inputMontoDocumentoDebito.value = 0;
    selectTipoDocumento_cxc.value = "";
    
    condicionPagoDebito.value = 0;
    fechaDocumentoDebito.value = "yyyy-MM-dd";
};

function limpiarFormularioCredito() {
    selectDocumetosCredito.value = "";
    inputSaldoCredito.value = 0;
    notaCredito.value = "";
    fechaDocumentoCredito.value = "yyyy-MM-dd";
};
function convertirFecha(FechaDocumento) {

    const dateString = FechaDocumento;
    const dateMilliseconds = Number(dateString.match(/\d+/)[0]); // Extraer el número de milisegundos
    const date = new Date(dateMilliseconds);

    var dia = date.getDate().toString().padStart(2, "0");
    var mes = (date.getMonth() + 1).toString().padStart(2, "0");
    var anio = date.getFullYear().toString();
    var fechaFormateada = dia + "-" + mes + "-" + anio;

    return fechaFormateada;
};
function convertirFecha_yy_MM_dd(FechaDocumento) {

    const dateString = FechaDocumento;
    const dateMilliseconds = Number(dateString.match(/\d+/)[0]); // Extraer el número de milisegundos
    const date = new Date(dateMilliseconds);

    var dia = date.getDate().toString().padStart(2, "0");
    var mes = (date.getMonth() + 1).toString().padStart(2, "0");
    var anio = date.getFullYear().toString();
    var fechaFormateada = anio + "/" + mes + "/" + dia;

    return fechaFormateada;
};



function limpiarHtml(elemento) {

    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
};


//============================================================
//=========== PINTA LAS PARTIDAS EN EL MODAL CXC =============
//=========== ASOCIAR DOCUMENTO X DOC CREDITO ================
//========== O CUALQUIER SELECT QUE SE REQUIERA ==============
//============================================================

function llenarSelectPartidas(element, tipo) {
    limpiarHtml(element);
    const defaultOption = document.createElement('option');
    let Partidas_por_tipo = [];

    fetch("/Departure/showActiveDepartures")

        .then(res => res.ok ? res.json() : null)
        .then(res => {
            Partidas_por_tipo = res.filter(partida => partida.Tipo === tipo);


            if (Partidas_por_tipo.length > 0) {
                OpcionPorDefectoSelect(element, "Selecciona una Partida");
                for (var i = 0; i < Partidas_por_tipo.length; i++) {

                    const { Alias, Descripcion, IdPartida, Tipo } = Partidas_por_tipo[i];

                    const option = document.createElement('option');
                    option.value = IdPartida;
                    option.textContent = Alias + " - " + Descripcion;

                    element.appendChild(option);

                }
            } else {
                defaultOption.text = "No hay Partidas Disponibles";
                defaultOption.value = "";

                defaultOption.disabled = false;
                defaultOption.selected = true;
                crearPorDefecto = false;
                element.appendChild(defaultOption);



            }
        })
};

//============================================================
//=========== PINTA LOS CLIENTES EN EL MODAL CXC =============
//========   ASOCIAR DOCUMENTO X DOC CREDITO =================
//============================================================

function llenarSelectCliente(element) {
    limpiarHtml(element);
    const defaultOption = document.createElement('option');

    fetch("/Documents/getClients")
        .then(res => res.ok ? res.json() : null)
        .then(res => {
            OpcionPorDefectoSelect(element, "Clientes");
            if (res.selectClients.length > 0) {
                lstClientes = res.selectClients;
                for (let i = 0; i < res.selectClients.length; i++) {
                    const { Text, Value } = res.selectClients[i];
                    const option = document.createElement('option');

                    option.value = Value;
                    option.textContent = Text;

                    element.appendChild(option);
                }
            }

            else {
                defaultOption.text = "No hay Clientes Disponibles";
                defaultOption.value = "";

                defaultOption.disabled = false;
                defaultOption.selected = true;

                element.appendChild(defaultOption);

            }

        })
};


//============================================================
//=========== PINTA LOS DOCUMENTOS EN EL SELECT CREDITO ======
//============================================================

function llenarSelectDocumentosCreditos(pId, opcion, datos, element) {

    const defaultOption = document.createElement('option');
    limpiarHtml(element);
    if (pId !== "") {
        if (datos.length > 0) {
            OpcionPorDefectoSelect(element, opcion);
            for (let i = 0; i < datos.length; i++) {

                const { Documento } = datos[i];
                const option = document.createElement('option');

                option.value = Documento;
                option.textContent = Documento;
                element.appendChild(option);

            }
        } else {
            defaultOption.text = "No hay Disponibles";
            defaultOption.value = "";


            defaultOption.disabled = false;
            defaultOption.selected = true;
            crearPorDefecto = false;
            element.appendChild(defaultOption);
        }

    } else { OpcionPorDefectoSelect(element, opcion); }
}

//============================================================
//=========== PINTA LOS DOCUMENTOS EN EL SELECT DEBITO =======
//============================================================

function llenarSelectDocumentosDebitos(pId, opcion, datos, element) {
    const defaultOption = document.createElement('option');
    limpiarHtml(element);
    if (pId !== "") {
        if (datos.length > 0) {
            OpcionPorDefectoSelect(element, opcion);
            for (let i = 0; i < datos.length; i++) {

                const { Documento } = datos[i];
                const option = document.createElement('option');

                option.value = Documento;
                option.textContent = Documento;
                element.appendChild(option);

            }
        } else {
            defaultOption.text = "No hay Pendientes";
            defaultOption.value = "";


            defaultOption.disabled = false;
            defaultOption.selected = true;
            crearPorDefecto = false;
            element.appendChild(defaultOption);
        }

    } else { OpcionPorDefectoSelect(element, opcion); }


}

//============================================================
//============== PINTA LOS DATOS EN EL MODAL CXC =============
//==============   O EN LA TABLA DE DETALLES =================
//============================================================

function showHeaderDeposit_cxc(pDoc) {

    fetch("/Documents/getDataDocument_CXC?pDoc=" + pDoc)

        .then(res => res.ok ? res.json() : null)
        .then(res => {

            var { Documento, Monto, Saldo, FechaDocumento, IdCliente, NombreCliente } = res;
            Monto = Monto.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });
            Saldo = Saldo.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });

            d.querySelector('#numero_documento').textContent = Documento;
            d.querySelector('#numero_documento').value = Documento;

            d.querySelector('#monto_mens').textContent = Monto;
            d.querySelector('#monto_mens').value = Monto;

            d.querySelector('#saldo_mens').textContent = Saldo;
            d.querySelector('#saldo_mens').value = Saldo;

            d.querySelector('#FechaDocumento_dep').textContent = FechaDocumento;
            d.querySelector('#FechaDocumento_dep').value = FechaDocumento;

            d.querySelector('#usuario_dep').textContent = NombreCliente;
            d.querySelector('#usuario_dep').value = NombreCliente;
        })

};


function OpcionPorDefectoSelect(element, mensaje) {
    const defaultOption = document.createElement('option');
    defaultOption.text = mensaje;
    defaultOption.value = "";

    defaultOption.selected = true;
    element.appendChild(defaultOption);
}

//============================================================
//============= FUNCIONES ASINCRONICAS QUE ===================
//============ MANIPULAN LOS DOCUMENTOS CXC ==================
//============================================================

async function obtenerDocumentos_ClienteCXC(pIdCliente) {

    documentosCliente = await getDocumentosXCliente(pIdCliente);

    documentosCreditoCliente = documentosCliente.filter(doc => doc.TipoDocumento == "reci");
    documentosDebitoCliente = documentosCliente.filter(doc => doc.TipoDocumento != "reci");// || doc.TipoDocumento == "extr");
    
    llenarSelectDocumentosDebitos(pIdCliente, "Pendientes", documentosDebitoCliente, selectDocumetosDebito);
    llenarSelectDocumentosCreditos(pIdCliente, "Recibos", documentosCreditoCliente, selectDocumetosCredito);

}
async function getDocumentosXCliente(pIdCliente) {
    if (pIdCliente !== "") {
        const response = await fetch("/Documents/getDocumentosxCliente?pIdCliente=" + pIdCliente);
        const data = await response.json();
        return data.lstDocumentosDisponiles;
    } else {
        return [];
    }
}


function llenarFormularioCredito(objCredito) {

    let valorString = objCredito.Saldo;
    let valorFloat = parseFloat(valorString);

    let formatoMoneda = valorFloat.toLocaleString('es-CR', {
        style: 'currency',
        currency: 'CRC'
    });


    inputSaldoCredito.textContent = formatoMoneda;
    inputSaldoCredito.value = formatoMoneda;

    notaCredito.value = objCredito.Notas;

    removerRequieredRecibos(false);
}


function llenarSelectTipoDocumento_cxc(element) {
    let opcionesTipoDocumentos = ["mens", "extr", "reci"];
    limpiarHtml(element);
    OpcionPorDefectoSelect(element, "Selecciona un Tipo");
    for (var i = 0; i < opcionesTipoDocumentos.length; i++) {
        const option = document.createElement('option');
        if (opcionesTipoDocumentos[i] === "mens") {
            option.value = opcionesTipoDocumentos[i];
            option.textContent = "Mensualidad";
        }
        else if (opcionesTipoDocumentos[i] === "extr") {
            option.value = opcionesTipoDocumentos[i];
            option.textContent = "Cuota Extraordinaria";
        }
        else {
            option.value = opcionesTipoDocumentos[i];
            option.textContent = "Recibo";

        }
        element.appendChild(option);
    }

}
function cambiarNombresInputs_CXC() {
    formularioDocumentoMixto.name = "formDocumentoMixto_cxc";

    checkBox.name = "activeCredito_cxc";
    inputDocumentoDebito.name = "add_documento_debito_cxc";
    inputMontoDocumentoDebito.name = "monto_debito_cxc";
    inputSaldoDebito.name = "add_saldo_debito_cxc";
    tipoDocumentoDebito.name = "add_tipoDocumento_cxc";
    fechaDocumentoDebito.name = "fechaDocumento_debito_cxc";
    condicionPagoDebito.name = "condicio_pago_cxc";
    notaMensualidad.name = "nota_debito_cxc";

    inputSaldoCredito.name = "add_saldo_credito";
    fechaDocumentoCredito.name = "fechaDocumento_credito_cxc";
    notaCredito.name = "nota_credito_cxc";
    selectDocumetosDebito.name = "select_documento_debito_cxc";
    selectDocumetosCredito.name = "select_documento_credito";
    selectClientes.name = "add_cliente_cxc";
    selectPartida.name = "partida_credito";

    titleModalAsociacion_cxc.textContent = "Cuentas Por Cobrar";
    titleFormularioCredito_cxc.textContent = "Recibos del Cliente";
    label_selec_cliente.textContent = "Cliente";
    label_select_transaccion.textContent = "Recibos Disponibles";

    label_checkbox_cxp.textContent = "¿Asociar Documentos Existentes?";

    d.getElementById("recientes_agregados").name = "recientes_agregados_cxc";

    d.getElementById("formularioDebito").style.borderRadius = "10px";
    d.getElementById("formularioDebito").style.border = "3px solid green";

    d.getElementById("formularioCredito").style.borderRadius = "10px";
    d.getElementById("formularioCredito").style.border = "3px solid brown";
}

//============================================================
//============== PINTA LOS DATOS EN EL MODAL CXP =============
//==============   O EN LA TABLA DE DETALLES =================
//============================================================
function showDataDocument_cxc(pDoc, pAccion) {
    //let prove = document.getElementById("IdProveedor").value;

    //'"@Url.Content("~/Document_CXP/getDataDocument")" + "?pDoc="' + pDoc
    fetch("/Documents/getDataDocument_CXC?pDoc=" + pDoc)

        .then(res => res.ok ? res.json() : null)
        .then(res => {


            if (pAccion == "Datos") {

                doc.querySelector('#documento_cxc').textContent = res.Documento;
                doc.querySelector('#documento_cxc').value = res.Documento;

                doc.querySelector('#monto_cxc').textContent = res.Monto;
                doc.querySelector('#monto_cxc').value = res.Monto;

                doc.querySelector('#saldo_cxc').textContent = res.Saldo;
                doc.querySelector('#saldo_cxc').value = res.Saldo;

                doc.querySelector('#pago_cxc').textContent - res.CondicionPago;
                doc.querySelector('#pago_cxc').value = res.CondicionPago;

                doc.querySelector('#nota_cxc').textContent = res.Nota;
                doc.querySelector('#nota_cxc').value = res.Nota;

                doc.querySelector('#fechaDocumento_cxc').textContent = res.FechaDocumento;
                doc.querySelector('#fechaDocumento_cxc').value = res.FechaDocumento;

                if (res.TipoDocumento == "mens") {
                    doc.querySelector('#tipoDocumento_cxc').options.item(1).selected = 'selected';
                }
                else {
                    doc.querySelector('#tipoDocumento_cxc').options.item(2).selected = 'selected';
                }

                if (res.Estado == "AD") {
                    doc.querySelector('#estado_cxc').options.item(1).selected = 'selected';
                } else if (res.Estado == "PD") {
                    doc.querySelector('#estado_cxc').options.item(2).selected = 'selected';
                } else if (res.Estado == "FN") {
                    doc.querySelector('#estado_cxc').options.item(3).selected = 'selected';
                }


                doc.querySelector('#IdCliente').value = res.IdCliente;



            }
            if (pAccion == "Bitacora") {

                tbId_cxc.textContent = res.Documento;
                tbId_cxc.value = res.Documento;
                tbUsuarioCreacion_cxc.textContent = res.UserCreation;
                tbUsuarioCreacion_cxc.value = res.UserCreation;

                tbUsuarioModificacion_cxc.textContent = res.UserModification;
                tbUsuarioModificacion_cxc.value = res.UserModification;

                tbFechaCreacion_cxc.textContent = res.CreationDate;
                tbFechaCreacion_cxc.value = res.CreationDate;

                tbFechaModificacion_cxc.textContent = res.ModificationDate;
                tbFechaModificacion_cxc.value = res.ModificationDate;

                notaLog_cxc.textContent = res.Nota;
                notaLog_cxc.value = res.Nota;

                $("#LogDoc_cxc").modal("show");
            }

        })
};