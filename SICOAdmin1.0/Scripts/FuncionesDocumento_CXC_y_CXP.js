
//========================= VARIABLES PARA MANEJAR DATOS DEPOSITOS ==============================
const d = document,
    $renderBody = d.getElementById("renderBody");


let documentosCreditoCliente = [];
let documentosDebitoCliente = [];

//FORMULARIOS ASOCIACION 
const formularioDocumentoMixto = d.getElementById("formDocumentoMixto");


//ELEMENTOS  FORMULARIO DEBITO 
const checkBox = d.getElementById("activeCredito");
const inputDocumentoDebito = d.getElementById("add_documento_debito");
const inputMontoDocumentoDebito = d.getElementById("monto_debito_cxc");
const inputSaldoDebito = d.getElementById("add_saldo_debito");
const tipoDocumentoDebito = d.getElementById("add_tipoDocumento_cxc");
const fechaDocumentoDebito = d.getElementById("fechaDocumento_debito_cxc");
const condicionPagoDebito = d.getElementById("condicio_pago_cxc");
const notaMensualidad = d.getElementById("nota_debito_cxc");


//ELEMENTOS CREDITO
const inputSaldoCredito = d.getElementById("add_saldo_credito");
const fechaDocumentoCredito = d.getElementById("fechaDocumento_credito_cxc");
const notaCredito = d.getElementById("nota_credito_cxc");
//SELECTS FORMULARIOS
const selectDocumetosDebito = d.getElementById("select_documento_debito");
const selectDocumetosCredito = d.getElementById("select_documento_credito");
const selectClientes = d.getElementById("add_cliente_cxc");
const selectPartida = d.getElementById("partida_credito");
//===========================================================



//===============================================================================
//========================= ELEMENTOS BITACORA CXP ==============================
//===============================================================================
const tbId = document.getElementById("tbDoc");
const tbUsuarioCreacion = document.getElementById("tbUsuarioCreacion");
const tbUsuarioModificacion = document.getElementById("tbUsuarioModificacion")

const tbFechaCreacion = document.getElementById("tbFechaCreacion");
const tbFechaModificacion = document.getElementById("tbFechaModificacion");
const notaLog = document.querySelector('#notaLog');

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
let formDocument_CXP = document.querySelector('#formAddDocument_CXP');
let modalTitle = document.querySelector('#ModalTitle_CXP');
let btnModal = document.getElementById("btnModal_CXP");

let formDocument_CXC = document.querySelector('#formAddDocument_CXC');
let modalTitle_CXC = document.querySelector('#ModalTitle_CXC');
let btnModal_CXC = document.getElementById("btnModal_CXC");


//==========================================================

//CLICK

$renderBody.addEventListener("click", (e) => {

    let page = e.target.dataset.value || "";



    //============================================================================================================
    //====================================================== METODDOS DE DOCS_CXP ================================
    //============================================================================================================

    //===================================================
    //=============  BOTON AGREGAR_CXP   ================
    //===================================================


    if (e.target.id === "CreateDocument_CXP") {

        const div_saldo = d.getElementById("grupo_saldo");
        const div_estado = d.getElementById("grupo_estado");
        const div_tipo = d.getElementById("grupo_tipo");


        formDocument_CXP.reset();
        btnModal.value = "Agregar Documento";
        modalTitle.textContent = "Agregar Documento Cuenta por Pagar";

        div_estado.setAttribute('hidden', '');
        div_saldo.setAttribute('hidden', '');
        div_tipo.setAttribute('hidden', '');

        $("#ModalDocument_CXP").modal("show");

        return false;

    }
    //===================================================
    //=============  BOTON EDITAR_CXP   ================
    //===================================================

    else if (e.target.id == "btnEditDoc") {
        let doc = e.target.dataset.id;

        const div_saldo = d.getElementById("grupo_saldo");
        const div_estado = d.getElementById("grupo_estado");
        const div_tipo = d.getElementById("grupo_tipo");


        btnModal.value = "Editar Documento";
        modalTitle.textContent = "Editar Documento  CXP";


        div_estado.removeAttribute('hidden');
        div_saldo.removeAttribute('hidden');
        div_tipo.removeAttribute('hidden');

        showDataDocument_cxp(doc, "Datos");


        $("#ModalDocument_CXP").modal("show");
        return false;
    }
    //===================================================
    //=============  BITACORA_CXP   ================
    //===================================================

    else if (e.target.id == "viewLogDoc") {

        let doc = e.target.dataset.id;

        showDataDocument_cxp(doc, "Bitacora");

        return false;
    }
    //===================================================
    //=========  BOTON AGREGAR_PROVEEDOR   ==============
    //===================================================

    else if (e.target.id === "btnAddProvider") {

        $("#ModalDocument_CXP").modal("hide");

        let numPage = Number(d.getElementById("pagActual").textContent) - 1;
        let objPaginacion = {
            palabraBuscar: d.getElementById("buscar").value.toLowerCase(),
            NumPagina: numPage,
            CantRegistros: d.getElementById("tamanoPagina").value,
            totalPaginas: d.getElementById("totalPag").textContent,

            urlPagina: "Documents/_TableDocument_CXP",
            containerPag: "tableDocument"

        }
        localStorage.setItem("objPaginacion", JSON.stringify(objPaginacion));


        cargarComponent({
            container: "renderLocalDoc",
            url: "Proveedor/_AgregarProveedor",
        })
        return false;
    }

    //===============================================================
    //=============  BOTON REGRESAR A LA TABLA CXP   ================
    //===============================================================
    else if (e.target.id === "regresarr") {


        console.log("Boton de regresar");
        let objP = JSON.parse(localStorage.getItem("objPaginacion"));


        cargarComponent({
            container: "renderLocalDoc",
            url: "Documents/_ShowDocuments_CXP",
            body: objP
        })



        return false;
    }

    //============================================================================================================
    //====================================================== METODDOS DE DOCS_CXC ================================
    //============================================================================================================

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
    else if (e.target.id == "viewLogDoc_cxc") {
        let doc = e.target.dataset.id;

        showDataDocument_cxc(doc, "Bitacora");

        return false;
    }

    //===================================================
    //========  BOTON AGREGAR CLIENTE   ================
    //===================================================

    else if (e.target.id === "btnAddCliente") {

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
    //============= METODDOS DE PAGINACION ==============
    //===================================================

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
        //AVANZA DE PAGINA EN LA TABLA CUENTAS POR PAGAR
        else {

            siguientePagina({
                sig: page,
                totalPage: d.getElementById("totalPag").textContent,
                CantRegistros: d.getElementById("tamanoPagina").value,
                url: "Documents/_TableDocument_CXP",
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
        //RETROCEDE DE PAGINA EN LA TABLA CUENTAS POR PAGAR
        else {
            retrocederPagina({
                ant: page,
                totalPage: d.getElementById("totalPag").textContent,
                tamanoPagina: d.getElementById("tamanoPagina").value,
                url: "Documents/_TableDocument_CXP",
                container: "tableDocument",
                palabraBuscar: d.getElementById("buscar").value.toLowerCase()
            })
        }
    }


    //===================================================
    //===========  BOTON HACER DEPOSITO  ================
    //=========== A DOCUMENTO ESPECIFICO ================
    //===================================================
    else if (e.target.id === "create_deposito_cxc") {

        const selectPartida = d.getElementById("partida_credito");
        const selectCliente = d.getElementById("add_cliente_cxc");
        llenarSelectPartidas(selectPartida);
        llenarSelectCliente(selectCliente);
        $("#crear_documento_asociar_deposito").modal("show");

        return false;
    }
    //===================================================
    //===========  BOTON VER DEPOSITOS CXC  =============
    //===================================================
    else if (e.target.id === "show_depositos_cxc") {

        let pDoc = e.target.dataset.id;

        const table = d.getElementById("tbDepositos");

        limpiarHtml(table);

        showHeaderDeposit(pDoc);
        mostrarRecibosxMensualidad(pDoc);
        return false;
    }

    //===================================================
    //===========  BOTON ELIMINAR DEPOSITOS CXC  ========
    //===================================================
    else if (e.target.id === "remove_deposito_cxc") {
        const DocumentoDebito = d.getElementById("numero_documento").value;
        const DocumentoCredito = e.target.dataset.id;


        swal({
            title: "Retirar Recibo!",
            text: "Seguro que quiere Retirar el Recibo?",
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


                        DocumentoDebito: DocumentoDebito,

                        DocumentoCredito: DocumentoCredito,
                    },
                    cbSuccess: (res) => {

                        if (res.resp == 1) {


                            swal('Bien!',
                                res.msj,
                                'success')
                        }
                        else {
                            swal('Opps!',
                                res.msj,
                                'error')
                        }
                        showHeaderDeposit(DocumentoDebito);
                        mostrarRecibosxMensualidad(DocumentoDebito);

                    }

                });



            });

    }
});


//submit
$renderBody.addEventListener("submit", (e) => {

    e.preventDefault();

    //===================================================
    //============= METODDOS DE DOCS_CXP ================
    //===================================================


    //===================================================
    //===========  AGREGA UN DOCUMENTO CXP  =============
    //===================================================

    if (e.target.id === "formAddDocument_CXP") {

        if (btnModal.value == "Agregar Documento") {
            $("#ModalDocument_CXP").modal("hide");
            fetchMethod({
                url: "Documents/AddDocument_CXP",
                body: {

                    Documento: d.getElementById("documento").value,
                    IdProveedor: d.getElementById("IdProveedor").value,
                    TipoDocumento: d.getElementById("tipoDocumento").value,
                    Monto: d.getElementById("monto").value,
                    Saldo: d.getElementById("saldo").value,
                    Estado: d.getElementById("estado").value,
                    CondicionPago: d.getElementById("pago").value,
                    FechaDocumento: d.getElementById("fechaDocumento").value,
                    Notas: d.getElementById("nota").value,

                },
                cbSuccess: (res) => {
                    if (res.resp == 1) {

                        cargarComponent({
                            container: "tableDocument",
                            url: "Documents/_TableDocument_CXP",
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
        //===========  EDITA UN DOCUMENTO CXP  =============
        //===================================================

        else {
            $("#ModalDocument_CXP").modal("hide");

            fetchMethod({
                url: "Documents/EditDocument_CXP",
                body: {

                    Documento: d.getElementById("documento").value,
                    IdProveedor: d.getElementById("IdProveedor").value,
                    TipoDocumento: d.getElementById("tipoDocumento").value,
                    Monto: d.getElementById("monto").value,
                    Saldo: d.getElementById("saldo").value,
                    Estado: d.getElementById("estado").value,
                    CondicionPago: d.getElementById("pago").value,
                    FechaDocumento: d.getElementById("fechaDocumento").value,
                    Notas: d.getElementById("nota").value,


                },
                cbSuccess: (res) => {
                    if (res.resp == 1) {

                        cargarComponent({
                            container: "tableDocument",
                            url: "Documents/_TableDocument_CXP",
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

    }

    //===================================================
    //============= METODDOS DE DOCS_CXC ================
    //===================================================

    //===================================================
    //===========  AGREGA UN DOCUMENTO CXC  =============
    //===================================================


    else if (e.target.id === "formAddDocument_CXC") {

        if (btnModal_CXC.value == "Agregar Documento") {
            $("#ModalDocument_CXC").modal("hide");
            fetchMethod({
                url: "Documents/AddDocument_CXC",
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
        //===========  EDITA UN DOCUMENTO CXC  =============
        //===================================================

        else {
            $("#ModalDocument_CXC").modal("hide");

            fetchMethod({
                url: "Documents/EditDocument_CXC",
                body: {

                    Documento: d.getElementById("documento_cxc").value,
                    IdProveedor: d.getElementById("IdCliente").value,
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

    }
    //===================================================
    //============= METODDO AGREGAR PROVEEDOR ===========
    //===================================================

    else if (e.target.id === "createProveedor") {

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
    else if (e.target.id === "formAddDeposito_CXC") {



        fetchMethod({
            url: "Documents/GenerateDeposit",
            body: {
                NombreTabla: "DOCUMENTO_CXC",
                NombreTablaAuxiliar: "AUXILIAR_CXC",

                DocumentoDebito: d.getElementById("documento_debito").value,

                DocumentoCredito: d.getElementById("documento_credito").value,

                FechaDocumento: d.getElementById("fechaDeposito").value,

                IdPartida: d.getElementById("partida_deposito").value,

                Monto: d.getElementById("monto_deposito").value,
                CondicionPago: d.getElementById("CondicionPagoDepo").value,

                Nota: d.getElementById("nota_deposito").value,
            },
            cbSuccess: (res) => {
                if (res.resp == 1) {

                    cargarComponent({
                        container: "renderLocalDoc",
                        url: "Documents/_ShowDocuments_CXP",
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
        })

        return false;
    }
    else if (e.target.id === "formDocumentoMixto") {
        var DocumentoDebito = "";
        var DocumentoCredito = "";
        var idCliente = selectClientes.value;
        var verificaForm = true;
        let nuevoDoc;
        if (checkBox.checked) {
            DocumentoDebito = selectDocumetosDebito.value;
            DocumentoCredito = selectDocumetosCredito.value;
            if ((DocumentoCredito == "" && DocumentoDebito == "") || DocumentoCredito == "") {
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
                    NuevoDocumento: nuevoDoc,
                    DocumentoDebito: DocumentoDebito,
                    MontoDebito: inputMontoDocumentoDebito.value,
                    SaldoDebito: inputSaldoDebito.value,

                    TipoDocumento: tipoDocumentoDebito.value,
                    FechaDocumentoDebito: fechaDocumentoDebito.value,
                    CondicionPago: condicionPagoDebito.value,
                    NotaDebito: notaMensualidad.value,
                    IdCliente: selectClientes.value,

                    DocumentoCredito: selectDocumetosCredito.value,

                    SaldoCredito: inputSaldoCredito,
                    FechaDocumentoAsociacion: fechaDocumentoCredito.value,
                    IdPartida: selectPartida.value,
                },
                cbSuccess: (res) => {
                    if (res.resp == 1) {

                        cargarComponent({
                            container: "renderLocalDoc",
                            url: "Documents/_ShowDocuments_CXC",
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
            })

            limpiarFormularioDebito();
            limpiarFormularioCredito();
            //llenarSelectCliente();
            //selectClientes.value = idCliente;
            llenarSelectDocumentosDebitos(idCliente, selectDocumetosDebito);

            llenarSelectDocumentosCreditos(idCliente, selectDocumetosCredito);
        }
        else {

            swal('Opps!',
                'Faltan Datos Importantes',
                'error')
        }
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
        else {

            cambioTamanoPagina({
                totalPage: d.getElementById("totalPag").textContent,
                tamanoPagina: e.target.value,
                url: "Documents/_TableDocument_CXP",
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

    else if (e.target.id === "ChoiceDocumentTable") {

        const optionTable = d.querySelector('#ChoiceDocumentTable').value;

        if (optionTable == "DOCUMENTS_CXC") {


            cargarComponent({
                container: "renderLocalDoc",
                url: "Documents/_ShowDocuments_CXC",
            });
        }
        else if (optionTable == "DOCUMENTS_CXP") {

            cargarComponent({
                container: "renderLocalDoc",
                url: "Documents/_ShowDocuments_CXP",
            });
        }
        return false;
    }

    //==========================================================
    //===========  DESPLIEGA LOS DOCUMENTOS CREDITO  ===========
    //===========  EN BASE A LOS CREDITOS CON SALDO  ===========
    //===================== DEL CLIENTE  =======================
    //==========================================================

    else if (e.target.id === "add_cliente_cxc") {
        const pIdCliente = selectClientes.value;

        llenarSelectDocumentosDebitos(pIdCliente, selectDocumetosDebito);

        llenarSelectDocumentosCreditos(pIdCliente, selectDocumetosCredito);


        return false;
    }

    //===================================================
    //===========  CAMBIA LOS SALDOS DEl   ==============
    //===========  DOCUMENTOS CREDITO  ==================
    //===================================================
    else if (e.target.id === "select_documento_credito") {


        if (selectDocumetosCredito.value != "") {

            const obj = documentosCreditoCliente.find(function (documento) {
                if (documento.Documento === selectDocumetosCredito.value) {
                    return documento.Saldo;
                }
            });

            let valorString = obj.Saldo;
            let valorFloat = parseFloat(valorString);

            let formatoMoneda = valorFloat.toLocaleString('es-CR', {
                style: 'currency',
                currency: 'CRC'
            });


            inputSaldoCredito.textContent = formatoMoneda;
            inputSaldoCredito.value = formatoMoneda;

            console.log(valorFloat);
            console.log(formatoMoneda);
            notaCredito.value = obj.Notas;

            removerRequieredRecibos(false);
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
    else if (e.target.id === "select_documento_debito") {
        actualizarDatosDocumentosDebitosAsociar();
    }
    //===================================================
    //===========  Verifica la fecha del Deposito  ======
    //===================================================
    else if (e.target.id === "fechaDeposito") {

        const inputFecha = d.getElementById("fechaDeposito");
        const botonAgregar = d.getElementById('btnAddDeposito_CXC');
        verificarFecha(inputFecha, botonAgregar);

        return false;
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
    //===========  Verifica la fecha del Doc CXP ========
    //==================  a Crear  ======================
    //===================================================
    else if (e.target.id === "fechaDocumento") {

        const inputFecha = d.getElementById("fechaDocumento");
        const botonAgregar = d.getElementById('btnModal_CXP');
        verificarFecha(inputFecha, botonAgregar);
        return false;

    }

    //===================================================
    //===========  Verifica la fecha de  Ingresar =======
    //===========  Documento Debito Asociacion  =========
    //===================================================
    else if (e.target.id === "fechaDocumento_debito_cxc") {
        verificarFechasDocumentosAsociados();
        return false;

    }

    //===================================================
    //===========  Verifica la fecha de  Ingresar =======
    //===========  Documento Credito Asociacion  =========
    //===================================================
    else if (e.target.id === "fechaDocumento_credito_cxc") {


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
    else if (e.target.id === "activeCredito") {
        const pIdCliente = selectClientes.value;

        if (checkBox.checked) {
            llenarSelectDocumentosDebitos(pIdCliente, selectDocumetosDebito);
            removerRequieredRecibos(false);
            activarInputsFormularioCredito(true);
        } else {
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
    else if (e.target.id === "add_tipoDocumento_cxc") {

        if (tipoDocumentoDebito.value == "reci") {
            activarInputsFormularioCredito(false);
        } else {
            activarInputsFormularioCredito(true);
            removerRequieredRecibos(true);
        }

    }
    else if (e.target.id === "partida_credito") {
        if (selectPartida.value != "") {
            removerRequieredRecibos(false);
        } else {
            removerRequieredRecibos(true);
        }
    }



    $("#monto_debito_cxc").on("keyup", function () {
        inputSaldoDebito.value = inputMontoDocumentoDebito.value;

    })
    //$("#buscar").on("keyup", function () {
    //    var value = $(this).val().toLowerCase();

    //    //if (value.length > 2 || value.length == 0) {
    //    $("#tableTypeActionPers").load("TypeActionPersonal/_TableTypeActionPers",
    //        {

    //            NumPagina: 0,
    //            palabraBuscar: value,
    //            estaBuscando: true,
    //            accion: 'n', //n -> no pasar de pagina
    //            CantRegistros: document.getElementById("tamPaginacion").value,
    //            //CantRegistros: document.getElementById("tamPaginacion").value

    //        }, function (res) {
    //            $("#tableTypeActionPers").html(res);
    //        })

    //    //}


    //});
});



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

                    //MontoDeposito = MontoDeposito.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    var FechaDoc = convertirFecha(FechaDocumento);
                    var FechaAux = convertirFecha(FechaCreacion);
                    total = total + MontoDeposito;

                    /*total = total.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });*/
                    MontoDeposito = MontoDeposito.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    var datos = `
                               <tr id="tbDatos">
                                    <td id="tbDocumento">${DocumentoCredito}</td>
                                    <td id="tbMonto" class="money">${MontoDeposito}</td>
                                    <td id="tbFecha">${FechaAux}</td>
                                    <td>
                                         <button data-id="${DocumentoCredito}" id="remove_deposito_cxc" type="button" class="btn btn-outline-danger">
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
                                <td colspan="8">No existe registros actualmente</td>
                         </tr>

                        `;
                $("#tbDepositos").append(mensaje)
            }

        })

    $("#ModalDeposito").modal("show");
}
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
        /*notaCredito.disabled = false;*/

    } else {
        selectDocumetosCredito.disabled = true;
        selectPartida.disabled = true;
        fechaDocumentoCredito.disabled = true;
        /*notaCredito.disabled = true;*/

    }
}

function activarInputsFormularioDebito() {
    if (checkBox.checked) {
        //DESACTIVAR ELEMENTOS 
        tipoDocumentoDebito.options.item(1).selected = 'selected';

        inputMontoDocumentoDebito.disabled = true;
        tipoDocumentoDebito.disabled = true;
        fechaDocumentoDebito.disabled = true;
        condicionPagoDebito.disabled = true;
        notaMensualidad.disabled = true;
        inputDocumentoDebito.setAttribute('hidden', '');
        selectDocumetosDebito.removeAttribute('hidden');
    } else {
        //DESACTIVAR ELEMENTOS 
        inputMontoDocumentoDebito.disabled = false;
        tipoDocumentoDebito.disabled = false;
        fechaDocumentoDebito.disabled = false;
        condicionPagoDebito.disabled = false;
        notaMensualidad.disabled = false;

        inputDocumentoDebito.removeAttribute('hidden');
        selectDocumetosDebito.setAttribute('hidden', '');

        //LIMPIA LOS DATOS MENOS EL SELECT
        limpiarFormularioDebito();
        
        //inputDocumentoDebito.textContent = "";
        //inputDocumentoDebito.value = "";

        //inputMontoDocumentoDebito.value = "";
        //condicionPagoDebito.value = 0;
        //notaMensualidad.value = "";
        //inputSaldoDebito.value = 0;
        //fechaDocumentoDebito.value = "yyyy-MM-dd";
    }
}

function formatCurrency(amount, currencySymbol, decimalSeparator, thousandsSeparator) {
    const negative = amount < 0 ? '-' : '';
    const i = parseInt(amount = Math.abs(+amount || 0).toFixed(2)).toString();
    const j = (i.length > 3) ? i.length % 3 : 0;

    return negative + currencySymbol + ' ' +
        (j ? i.substr(0, j) + thousandsSeparator : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSeparator) +
        decimalSeparator + Math.abs(amount - i).toFixed(2).slice(2);
}

function actualizarDatosDocumentosDebitosAsociar() {
    if (selectDocumetosDebito.value == "") {

        limpiarFormularioDebito();

    } else {
        const obj = documentosDebitoCliente.find(function (documento) {
            if (documento.Documento === selectDocumetosDebito.value) {
                return documento.Saldo;
            }
        });
        let montoFloat = parseFloat(obj.Monto);
        let saldoFloat = parseFloat(obj.Saldo);
        var montoFomateado = formatCurrency(montoFloat, '', '.', ',');


        let setDate = convertirFecha_yy_MM_dd(obj.FechaDocumento);

        inputDocumentoDebito.textContent = obj.Documento;
        inputDocumentoDebito.value = obj.Documento;

        inputMontoDocumentoDebito.textContent = montoFomateado;
        inputMontoDocumentoDebito.value = montoFomateado;

        fechaDocumentoDebito.valueAsDate = new Date(setDate);
        condicionPagoDebito.textContent = obj.CondicionPago;
        condicionPagoDebito.value = obj.CondicionPago;
        notaMensualidad.value = obj.Notas;
        inputSaldoDebito.textContent = obj.Saldo;
        inputSaldoDebito.value = obj.Saldo;

    }
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

}

function getDateToDay() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
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
}

function limpiarFormularioDebito() {
    inputDocumentoDebito.value = "";

    inputMontoDocumentoDebito.value = "";
    condicionPagoDebito.value = 0;
    notaMensualidad.value = "";
    inputSaldoDebito.value = 0;
    fechaDocumentoDebito.value = "yyyy-MM-dd";

}

function limpiarFormularioCredito() {
    selectDocumetosCredito.value = "";
    inputSaldoCredito.value = 0;
    notaCredito.value = "";
    fechaDocumentoCredito.value = "yyyy-MM-dd";
}
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

//============================================================
//============== PINTA LOS DATOS EN EL MODAL CXP =============
//==============   O EN LA TABLA DE DETALLES =================
//============================================================
function showDataDocument_cxp(pDoc, pAccion) {
    //let prove = document.getElementById("IdProveedor").value;

    //'"@Url.Content("~/Document_CXP/getDataDocument")" + "?pDoc="' + pDoc
    fetch("/Documents/getDataDocument?pDoc=" + pDoc)

        .then(res => res.ok ? res.json() : null)
        .then(res => {


            if (pAccion == "Datos") {

                d.querySelector('#documento').textContent = res.Documento;
                d.querySelector('#documento').value = res.Documento;

                d.querySelector('#monto').textContent = res.Monto;
                d.querySelector('#monto').value = res.Monto;

                d.querySelector('#saldo').textContent = res.Saldo;
                d.querySelector('#saldo').value = res.Saldo;

                d.querySelector('#pago').textContent - res.CondicionPago;
                d.querySelector('#pago').value = res.CondicionPago;

                d.querySelector('#nota').textContent = res.Nota;
                d.querySelector('#nota').value = res.Nota;

                d.querySelector('#fechaDocumento').textContent = res.FechaDocumento;
                d.querySelector('#fechaDocumento').value = res.FechaDocumento;

                if (res.TipoDocumento == "FA") {
                    d.querySelector('#tipoDocumento').options.item(2).selected = 'selected';
                }
                else {
                    d.querySelector('#tipoDocumento').options.item(2).selected = 'selected';
                }

                if (res.Estado == "AD") {
                    d.querySelector('#estado').options.item(1).selected = 'selected';
                } else if (res.Estado == "PD") {
                    d.querySelector('#estado').options.item(2).selected = 'selected';
                } else if (res.Estado == "CL") {
                    d.querySelector('#estado').options.item(3).selected = 'selected';
                }


                d.querySelector('#IdProveedor').value = res.IdProveedor;


            }
            if (pAccion == "Bitacora") {

                tbId.textContent = res.Documento;
                tbId.value = res.Documento;
                tbUsuarioCreacion.textContent = res.UserCreation;
                tbUsuarioCreacion.value = res.UserCreation;

                tbUsuarioModificacion.textContent = res.UserModification;
                tbUsuarioModificacion.value = res.UserModification;

                tbFechaCreacion.textContent = res.CreationDate;
                tbFechaCreacion.value = res.CreationDate;

                tbFechaModificacion.textContent = res.ModificationDate;
                tbFechaModificacion.value = res.ModificationDate;

                notaLog.textContent = res.Nota;
                notaLog.value = res.Nota;
                $("#LogDoc").modal("show");
            }

        })
};

//============================================================
//============== PINTA LOS DATOS EN EL MODAL CXC =============
//==============   O EN LA TABLA DE DETALLES =================
//============================================================

function showHeaderDeposit(pDoc) {

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

}
function showDataDocument_cxc(pDoc, pAccion) {



    fetch("/Documents/getDataDocument_CXC?pDoc=" + pDoc)

        .then(res => res.ok ? res.json() : null)
        .then(res => {


            if (pAccion == "Datos") {

                d.querySelector('#documento_cxc').textContent = res.Documento;
                d.querySelector('#documento_cxc').value = res.Documento;

                d.querySelector('#monto_cxc').textContent = res.Monto;
                d.querySelector('#monto_cxc').value = res.Monto;
                d.querySelector('#nota_cxc').textContent = res.Nota;
                d.querySelector('#nota_cxc').value = res.Nota;

                d.querySelector('#saldo_cxc').textContent = res.Saldo;
                d.querySelector('#saldo_cxc').value = res.Saldo;

                d.querySelector('#pago_cxc').textContent - res.CondicionPago;
                d.querySelector('#pago_cxc').value = res.CondicionPago;



                d.querySelector('#fechaDocumento_cxc').textContent = res.FechaDocumento;
                d.querySelector('#fechaDocumento_cxc').value = res.FechaDocumento;

                if (res.TipoDocumento == "mens") {
                    d.querySelector('#tipoDocumento_cxc').options.item(1).selected = 'selected';
                }
                else {
                    d.querySelector('#tipoDocumento_cxc').options.item(2).selected = 'selected';
                }


                if (res.Estado == "AD") {
                    d.querySelector('#estado_cxc').options.item(1).selected = 'selected';
                } else if (res.Estado == "PD" || res.Estado == "pd") {
                    d.querySelector('#estado_cxc').options.item(2).selected = 'selected';
                } else if (res.Estado == "FN") {
                    d.querySelector('#estado_cxc').options.item(3).selected = 'selected';
                }


                d.querySelector('#IdCliente').value = res.IdCliente;

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

function llenarSelectPartidas(element) {
    limpiarHtml(element);
    const defaultOption = document.createElement('option');


    fetch("/Departure/showActiveDepartures")

        .then(res => res.ok ? res.json() : null)
        .then(res => {


            if (res.length > 0) {
                OpcionPorDefectoSelect(element, "Selecciona una Partida");
                for (var i = 0; i < res.length; i++) {
                    const { Alias, Descripcion, IdPartida } = res[i];

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
function llenarSelectDocumentosCreditos(pIdCliente, element) {
    limpiarHtml(element);
    const defaultOption = document.createElement('option');
    if (pIdCliente !== "") {
        fetch("/Documents/getDocumentosxCliente?pIdCliente=" + pIdCliente)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                documentosCreditoCliente = res.lstDocumentosDisponiles.filter(doc => doc.TipoDocumento == "reci");
                OpcionPorDefectoSelect(element, "Recibos");
                if (documentosCreditoCliente.length > 0) {

                    for (let i = 0; i < documentosCreditoCliente.length; i++) {

                        const { Documento, Estado, Notas, Saldo } = documentosCreditoCliente[i];
                        const option = document.createElement('option');

                        option.value = Documento;
                        option.textContent = Documento;
                        element.appendChild(option);
                    }
                } else {
                    defaultOption.text = "Sin Saldos Disponibles";
                    defaultOption.value = "";
                    inputSaldoCredito.value = 0;

                    defaultOption.disabled = false;
                    defaultOption.selected = true;
                    element.appendChild(defaultOption);

                }
            })
    } else {
        defaultOption.value = "";
        inputSaldoCredito.value = 0;
        notaCredito.value = ""; S
        OpcionPorDefectoSelect(element, "Recibos");
    }
}
//============================================================
//=========== PINTA LOS DOCUMENTOS EN EL SELECT DEBITO =======
//============================================================

function OpcionPorDefectoSelect(element, mensaje) {
    const defaultOption = document.createElement('option');
    defaultOption.text = mensaje;
    defaultOption.value = "";

    defaultOption.selected = true;
    element.appendChild(defaultOption);
}



function llenarSelectDocumentosDebitos(pIdCliente, element) {
    const defaultOption = document.createElement('option');
    limpiarHtml(element);

    if (pIdCliente !== "") {
        fetch("/Documents/getDocumentosxCliente?pIdCliente=" + pIdCliente)
            .then(res => res.ok ? res.json() : null)
            .then(res => {

                documentosDebitoCliente = res.lstDocumentosDisponiles.filter(doc => doc.TipoDocumento == "mens");
                OpcionPorDefectoSelect(element, "Mensualidades");
                if (documentosDebitoCliente.length > 0) {

                    for (let i = 0; i < documentosDebitoCliente.length; i++) {

                        const { Documento } = documentosDebitoCliente[i];
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
            })
    } else { OpcionPorDefectoSelect(element, "Mensualidades"); }
}




    //===================================================
    //=============  BOTON AGREGAR_CXC   ================
    //===================================================
/*
    else if (e.target.id == "CreateDocument_CXC") {
    const btnCreateDoc = document.querySelector('#CreateDocument_CXC');

    //Como se utiliza el mismo boton para el llamado de los documentos
    //se verifica por medio del "name" para llamar ala funcion correspondiente


    const div_saldo = d.getElementById("grupo_saldo_cxc");
    const div_estado = d.getElementById("grupo_estado_cxc");
    const div_tipo = d.getElementById("grupo_tipo_cxc");

    formDocument_CXC.reset();
    btnModal_CXC.value = "Agregar Documento";
    modalTitle_CXC.textContent = "Agregar Documento Cuenta por Cobrar";


    div_estado.setAttribute('hidden', '');
    div_saldo.setAttribute('hidden', '');
    //div_tipo.setAttribute('hidden', '');
    div_tipo.removeAttribute('hidden');
    document.querySelector('#saldo_cxc').removeAttribute('required');
    document.querySelector('#tipoDocumento_cxc').removeAttribute('required');
    document.querySelector('#estado_cxc').removeAttribute('required');

    $("#ModalDocument_CXC").modal("show");
    //}
    return false;
}
*/

  //===================================================
    //===========  BOTON HACER DEPOSITO  ================
    //=========== A DOCUMENTO ESPECIFICO ================
    //===================================================
/*    else if (e.target.id === "add_deposito_cxc") {
        let pDoc = e.target.dataset.id;

        limpiarHtml(selectPartida);
        const selectPartidaDepositoEsp = d.getElementById("partida_deposito");
        llenarSelectPartidas(selectPartidaDepositoEsp);

        fetch("/Documents/getDataDocument_CXC?pDoc=" + pDoc)
            .then(res => res.ok ? res.json() : null)
            .then(res => {

                const { Documento, NombreCliente, Saldo, CondicionPago, Nota } = res;


                d.getElementById("documento_debito").textContent = Documento;
                d.getElementById("documento_debito").value = Documento;


                d.getElementById("IdUser").textContent = NombreCliente;
                d.getElementById("IdUser").value = NombreCliente;


                d.getElementById("saldo_debito").textContent = Saldo;
                d.getElementById("saldo_debito").value = Saldo;

                d.getElementById("nota_deposito").textContent = Nota;
                d.getElementById("nota_deposito").value = Nota;

                d.getElementById("CondicionPagoDepo").textContent = CondicionPago;
                d.getElementById("CondicionPagoDepo").value = CondicionPago;




            })



        $("#ModalAddDeposito").modal("show");
        //$("#ModalAddDeposito").modal("show");
        return false;
    }

 */