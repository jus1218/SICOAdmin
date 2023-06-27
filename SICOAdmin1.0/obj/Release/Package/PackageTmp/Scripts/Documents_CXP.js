const doc = document,
    $rendBody = doc.getElementById("renderBody");


//LISTAS A MANEJAR

let lstProveedores = [];
let documentosCreditoProveedor = [];
let documentosDebitoProveedor = [];
let documentosRecientes_cxp = [];

//FORMULARIOS ASOCIACION 
const formularioAsociacion = doc.getElementById("formDocumentoMixto");
const table_added_recent_cxp = doc.getElementById("added_recently");

const btnVerRecientesAgregados_cxp = doc.getElementById("recientes_agregados");
//-----------------------------------------------------------
const optionTable_cxp = doc.querySelector('#ChoiceDocumentTable').value;

//ELEMENTOS  FORMULARIO DEBITO 
const checkBox_cxp = doc.getElementById("activeCredito_cxc");
const inputDocumentoDebito_cxp = doc.getElementById("add_documento_debito_cxc");
const inputMontoDocumentoDebito_cxp = doc.getElementById("monto_debito_cxc");
const inputSaldoDebito_cxp = doc.getElementById("add_saldo_debito_cxc");
const tipoDocumentoDebito_cxp = doc.getElementById("add_tipoDocumento_cxc");
const fechaDocumentoDebito_cxp = doc.getElementById("fechaDocumento_debito_cxc");
const condicionPagoDebito_cxp = doc.getElementById("condicio_pago_cxc");
const notaMensualidad_cxp = doc.getElementById("nota_debito_cxc");


//LABELS A MODIFICAR

const label_selec_proveedor = doc.getElementById("lb_cliente_asociacion");
const label_select_transaccion = doc.getElementById("lb_select_creditos");
const label_checkbox_cxp = doc.getElementById("lb_activeCredito");

const titleModalAsociacion_cxp = doc.getElementById("title_admin_docs");
const titleFormularioCredito_cxp = doc.getElementById("title_credito");

//ELEMENTOS CREDITO

const inputSaldoCredito_cxp = doc.getElementById("add_saldo_credito");
const fechaDocumentoCredito_cxp = doc.getElementById("fechaDocumento_credito_cxc");
const notaCredito_cxp = doc.getElementById("nota_credito_cxc");

//SELECTS FORMULARIOS
const selectDocumetosDebito_cxp = doc.getElementById("select_documento_debito_cxc");
const selectDocumetosCredito_cxp = doc.getElementById("select_documento_credito");
const selectProveedor_cxp = doc.getElementById("add_cliente_cxc");
const selectPartida_cxp = doc.getElementById("partida_credito");
const selectTipoDocumento_cxp = doc.getElementById("add_tipoDocumento_cxc");

const selectEditPartida = d.getElementById("edit_partida");


//===============================================================================
//========================= ELEMENTOS BITACORA CXP ==============================
//===============================================================================
const tbId = document.getElementById("tbDoc");
const tbUsuarioCreacion = document.getElementById("tbUsuarioCreacion");
const tbUsuarioModificacion = document.getElementById("tbUsuarioModificacion")

const tbFechaCreacion = document.getElementById("tbFechaCreacion");
const tbFechaModificacion = document.getElementById("tbFechaModificacion");
const notaLog = document.querySelector('#notaLog');


//================ ELEMENTOS MODALES ==============================
let formDocument_CXP = document.querySelector('#formAddDocument_CXP');
let modalTitle = document.querySelector('#ModalTitle_CXP');
let btnModal = document.getElementById("btnModal_CXP");


const div_saldo = doc.getElementById("grupo_saldo");
const div_estado = doc.getElementById("grupo_estado");
const div_tipo = doc.getElementById("grupo_tipo");





//EVENTOS
//CLICK

$rendBody.addEventListener("click", (e) => {

    let page = e.target.dataset.value || "";
    //============================================================================================================
    //====================================================== METODDOS DE DOCS_CXP ================================
    //============================================================================================================

    //===================================================
    //=============  BOTON AGREGAR_CXP   ================
    //===================================================


    if (e.target.name === "create_deposito_cxp") {
        cambiarNombresInputs_CXP();

        d.getElementById("grupo__monto_debito").removeAttribute("hidden");
        d.getElementById("grupo_saldo_debito").removeAttribute("hidden");
        inputMontoDocumentoDebito.setAttribute("required", "");


        inputDocumentoDebito.setAttribute("required", "");



        limpiarFormularioDebito();
        limpiarFormularioCredito();

        llenarSelectPartidas(selectPartida, "SL");
        llenarSelectProveedor(selectProveedor_cxp);

        llenarSelectTipoDocumento_cxp(selectTipoDocumento_cxp);

        obtenerDocumentos_Proveedor_cxp("");

        table_added_recent_cxp.setAttribute("hidden", "");

        $("#crear_documento_asociar_deposito").modal("show");

        return false;
    }
    //===================================================
    //=============  BOTON EDITAR_CXP   ================
    //===================================================

    else if (e.target.id === "btnEditDoc_cxp") {
        let doc = e.target.dataset.id;

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

    else if (e.target.name == "viewLogDoc_cxp") {

        let doc = e.target.dataset.id;

        showDataDocument_cxp(doc, "Bitacora");

        return false;
    }
    //===================================================
    //=========  BOTON AGREGAR_PROVEEDOR   ==============
    //===================================================

    else if (e.target.id === "btnAddProvider") {

        $("#ModalDocument_CXP").modal("hide");

        let numPage = Number(doc.getElementById("pagActual").textContent) - 1;
        let objPaginacion = {
            palabraBuscar: doc.getElementById("buscar").value.toLowerCase(),
            NumPagina: numPage,
            CantRegistros: doc.getElementById("tamanoPagina").value,
            totalPaginas: doc.getElementById("totalPag").textContent,

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



        let objP = JSON.parse(localStorage.getItem("objPaginacion"));


        cargarComponent({
            container: "renderLocalDoc",
            url: "Documents/_ShowDocuments_CXP",
            body: objP
        })



        return false;
    }
    //===================================================
    //========  BOTON SIGUIENTE PAGINA  =================
    //===================================================
    else if (e.target.name === "nextPage") {
        const optionTable = document.querySelector('#ChoiceDocumentTable').value;

        //AVANZA DE PAGINA EN LA TABLA CUENTAS POR COBRAR
        //DEPENDIENDO DE LA TABLA SELECCIONADA
        if (optionTable == "DOCUMENTS_CXP") {

            siguientePagina({
                sig: page,
                totalPage: doc.getElementById("totalPag").textContent,
                CantRegistros: doc.getElementById("tamanoPagina").value,
                url: "Documents/_TableDocument_CXP",
                container: "tableDocument",
                palabraBuscar: doc.getElementById("buscar").value.toLowerCase()
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
        if (optionTable == "DOCUMENTS_CXP") {
            retrocederPagina({
                ant: page,
                totalPage: doc.getElementById("totalPag").textContent,
                tamanoPagina: doc.getElementById("tamanoPagina").value,
                url: "Documents/_TableDocument_CXP",
                container: "tableDocument",
                palabraBuscar: doc.getElementById("buscar").value.toLowerCase()
            })

        }

    }
    //===================================================
    //===========  BOTON VER FACRURAS CXP  =============
    //===================================================
    else if (e.target.name === "show_depositos_cxp") {
        let pDoc = e.target.dataset.id;
        const table = d.getElementById("tbDepositos");
        d.getElementById("thDepositos").textContent = "Documento #";
        d.getElementById("num_documento").textContent = "Factura #";
        d.getElementById("persona_asociada").textContent = "Nombre Proveedor";
        d.getElementById("fecha_documento").textContent = "Fecha De La Factura";

        d.getElementById("ModalTitleDeposito_CXC").textContent = "Transacciones Realizadas";
        mostrarFacturasxRecibos(pDoc);
        limpiarHtml(table);
        showHeaderDeposit_cxp(pDoc);


        return false;
    }
    //===================================================
    //===========  BOTON ELIMINAR FACTURA CXP  ========
    //===================================================
    else if (e.target.id === "remove_deposito_cxp") {
        const DocumentoCredito = d.getElementById("numero_documento").value;
        const DocumentoDebito = e.target.dataset.id;


        swal({
            title: "¿Retirar Transacción?",
            text: "¿Seguro que quiere Retirar la Transacción?",
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
                        NombreTablaAuxiliar: "AUXILIAR_CXP",

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
                                url: "Documents/_ShowDocuments_CXP",
                            })
                            showHeaderDeposit_cxp(DocumentoDebito);
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

    else if (e.target.name === "recientes_agregados_cxp") {
        const btnVerRecientes = doc.getElementById("recientes_agregados");

        if (btnVerRecientes.value == "1") {

            table_added_recent_cxp.removeAttribute("hidden");
            btnVerRecientesAgregados_cxp.value = "0";
            llenarTablaDocumentosRecientes_cxp();
        }
        else {
            table_added_recent.setAttribute("hidden", "");
            btnVerRecientesAgregados_cxp.value = "1";
        }

    }

});

//EVENTO SUBMIT
$rendBody.addEventListener("submit", (e) => {
    e.preventDefault();

    //===================================================
    //===========  AGREGA UN DOCUMENTO CXP  =============b  
    //===================================================

    if (e.target.id === "formAddDocument_CXP") {

        if (btnModal.value == "Agregar Documento") {
            $("#ModalDocument_CXP").modal("hide");
            fetchMethod({
                url: "Documents/AddDocument_CXP",
                body: {

                    Documento: doc.getElementById("documento").value,
                    IdProveedor: doc.getElementById("IdProveedor").value,
                    TipoDocumento: doc.getElementById("tipoDocumento").value,
                    Monto: doc.getElementById("monto").value,
                    Saldo: doc.getElementById("saldo").value,
                    Estado: doc.getElementById("estado").value,
                    CondicionPago: doc.getElementById("pago").value,
                    FechaDocumento: doc.getElementById("fechaDocumento").value,
                    Notas: doc.getElementById("nota").value,

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

                    Documento: doc.getElementById("documento").value,
                    IdProveedor: doc.getElementById("IdProveedor").value,
                    TipoDocumento: doc.getElementById("tipoDocumento").value,
                    Monto: doc.getElementById("monto").value,
                    Saldo: doc.getElementById("saldo").value,
                    Estado: doc.getElementById("estado").value,
                    CondicionPago: doc.getElementById("pago").value,
                    FechaDocumento: doc.getElementById("fechaDocumento").value,
                    Notas: doc.getElementById("nota").value,


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
    //============= METODDO AGREGAR PROVEEDOR ===========
    //===================================================

    else if (e.target.id === "createProveedor") {

        fetchMethod({
            url: "Proveedor/CrearProveedor",
            body: {
                Nombre: doc.getElementById("nombre").value,
                Identificacion: doc.getElementById("identificacion").value,
                Tipo: doc.getElementById("tipo").value,
                Contacto: doc.getElementById("contacto").value,
                Telefono1: doc.getElementById("telefono1").value,
                Telefono2: doc.getElementById("telefono2").value,
                CorreoElectronico: doc.getElementById("correo").value,
                CondicionPago: doc.getElementById("condicionPago").value,
                CuentaBancaria: doc.getElementById("cuentaBancaria").value,
                Banco: doc.getElementById("banco").value,
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

    else if (e.target.name === "formDocumentoMixto_cxp") {

        /*crearDocumento_CXP();*/
        var DocumentoDebito = "";
        var DocumentoCredito = "";
        var idProveedor = selectProveedor_cxp.value;

        var verificaForm = true;
        let nuevoDoc;

        if (checkBox.checked) {
            DocumentoDebito = selectDocumetosDebito_cxp.value;
            DocumentoCredito = selectDocumetosCredito_cxp.value;
            if ((DocumentoCredito == "" && inputDocumentoDebito_cxp == "") || DocumentoCredito == "") {
                verificaForm = false;
            }
        } else {
            nuevoDoc = true;
            DocumentoDebito = inputDocumentoDebito_cxp.value;
            if (DocumentoDebito == "") {
                verificaForm = false;
            }
        }
        if (verificaForm) {
            fetchMethod({
                url: "Documents/AddMixedDocuments",
                body: {
                    NombreTabla: "DOCUMENTO_CXP",
                    NombreTablaAuxiliar: "AUXILIAR_CXP",
                    NuevoDocumento: nuevoDoc,
                    DocumentoDebito: DocumentoDebito,
                    MontoDebito: inputMontoDocumentoDebito_cxp.value,
                    SaldoDebito: inputSaldoDebito_cxp.value,

                    TipoDocumento: selectTipoDocumento_cxp.value,
                    FechaDocumentoDebito: fechaDocumentoDebito_cxp.value,
                    // CondicionPago: condicionPagoDebito.value,
                    NotaDebito: notaMensualidad_cxp.value,
                    IdCliente: selectProveedor_cxp.value,

                    DocumentoCredito: selectDocumetosCredito_cxp.value,

                    SaldoCredito: inputSaldoCredito_cxp,
                    FechaDocumentoAsociacion: fechaDocumentoCredito_cxp.value,
                    IdPartida: selectPartida_cxp.value,
                },
                cbSuccess: (res) => {
                    if (res.resp == 1) {


                        swal('Bien!',
                            res.msj,
                            'success')

                        var objNew = {
                            DocDebito: DocumentoDebito,
                            DocCredito: DocumentoCredito,
                            Proveedor: selectProveedor_cxp.value
                        };

                        
                        llenarTablaDocumentosRecientes_cxp();

                        cargarComponent({
                            container: "renderLocalDoc",
                            url: "Documents/_ShowDocuments_CXP",
                        })

                        obtenerDocumentos_Proveedor_cxp(idProveedor);
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
});



//EVENTO CHANGE

$rendBody.addEventListener("change", (e) => {

    //===================================================
    //========  CANTIDAD DE REGISTROS A MOSTRAR =========
    //======  DEPENDIENDO DE LA TABLA SELECCIONADA ======
    //===================================================

    if (e.target.id === "tamanoPagina") {

        const optionTable = doc.querySelector('#ChoiceDocumentTable').value;

        if (optionTable == "DOCUMENTS_CXP") {


            cambioTamanoPagina({
                totalPage: doc.getElementById("totalPag").textContent,
                tamanoPagina: e.target.value,
                url: "Documents/_TableDocument_CXP",
                container: "tableDocument",
                palabraBuscar: doc.getElementById("buscar").value.toLowerCase(),
                NumPagina: (doc.getElementById("pagActual").textContent - 1)
            });

        }

        return false;
    }

    //===================================================
    //===========  CAMBIA LA TABLA A MOSTRAR  ===========
    //===================================================

    else if (e.target.id === "ChoiceDocumentTable") {
        const optionTable = doc.querySelector('#ChoiceDocumentTable').value;
        if (optionTable == "DOCUMENTS_CXP") {
            cargarComponent({
                container: "renderLocalDoc",
                url: "Documents/_ShowDocuments_CXP",
            });
        }
        return false;
    }
    //===================================================
    //===========  Verifica la fecha del Doc CXP ========
    //==================  a Editar  ======================
    //===================================================
    else if (e.target.id === "fechaDocumento") {

        const inputFecha = doc.getElementById("fechaDocumento");
        const botonAgregar = doc.getElementById('btnModal_CXP');
        verificarFecha(inputFecha, botonAgregar);
        return false;

    }
    //===================================================
    //===========  Verifica la fecha de  Ingresar =======
    //===========  Documento Debito Asociacion  =========
    //===================================================
    else if (e.target.name === "fechaDocumento_debito_cxp") {
        verificarFechasDocumentosAsociados();
        return false;
    }
    //===================================================
    //===========  Verifica la fecha de  Ingresar =======
    //===========  Documento Credito Asociacion  =========
    //===================================================
    else if (e.target.name === "fechaDocumento_credito_cxp") {


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
    //==========================================================
    //===========  DESPLIEGA LOS DOCUMENTOS CREDITO  ===========
    //===========  EN BASE A LOS CREDITOS CON SALDO  ===========
    //=================== DEL PROVEEDOR  =======================
    //==========================================================
    else if (e.target.name === "add_cliente_cxp") {
        const pIdProveedor = selectClientes.value;
        limpiarFormularioDebito();
        limpiarFormularioCredito;
        obtenerDocumentos_Proveedor_cxp(pIdProveedor);
        return false;
    }
    //===================================================
    //===========  CAMBIA LOS SALDOS DEl   ==============
    //===========  DOCUMENTOS CREDITO  ==================
    //===================================================
    else if (e.target.name === "select_documento_credito_cxp") {
        if (selectDocumetosCredito_cxp.value != "") {

            const obj = documentosCreditoProveedor.find(function (documento) {
                if (documento.Documento === selectDocumetosCredito_cxp.value) {
                    return documento.Saldo;
                }
            });

            llenarFormularioCredito(obj);
            
        }
        else {
            removerRequieredRecibos(true);
            inputSaldoCredito.value = 0;
            notaCredito.value = "";
        }
        llenarTablaDocumentosRecientes_cxp();
        return false;
    }
    //===================================================
    //===========  CAMBIA LOS SALDOS DEl   ==============
    //===========  DOCUMENTOS DEBITO  ==================
    //===================================================
    else if (e.target.name === "select_documento_debito_cxp") {
        if (selectDocumetosDebito.value === "") {

            limpiarFormularioDebito();

        } else {
            const obj = documentosDebitoProveedor.find(function (documento) {
                if (documento.Documento === selectDocumetosDebito_cxp.value) {
                    return documento.Saldo;
                }
            });

            actualizarDatosDocumentosDebitosAsociar(obj);
        }
        return false;
    }
    //===================================================
    //=======  MUESTRA LAS MENSUALIDADES PENDIENTES =====
    //=========== DEL CLIENTE SELECCIONADO ==============
    //===================================================
    else if (e.target.name === "activeCredito_cxp") {
        const pIdProveedor = selectProveedor_cxp.value;

        if (checkBox_cxp.checked) {
            inputDocumentoDebito_cxp.removeAttribute("required");
            /*llenarSelectDocumentosDebitos(pIdCliente, selectDocumetosDebito);*/

            obtenerDocumentos_Proveedor_cxp(pIdProveedor);

            removerRequieredRecibos(false);
            activarInputsFormularioCredito(true);
        } else {
            doc.querySelector('#tipoDocumento_cxc').options.item(0).selected = 'selected';

            inputDocumentoDebito_cxp.setAttribute("required", "");
            removerRequieredRecibos(true);
        }

        activarInputsFormularioDebito();

        return false;
    }

    else if (e.target.name === "partida_credito_cxp") {
        if (selectPartida_cxp.value != "") {
            removerRequieredRecibos(false);
        } else {
            removerRequieredRecibos(true);
        }
    }
    //===================================================
    //===========  CAMBIA LOS ESTADOS DEL   =============
    //===========  FORMULARIO CREDITO  ==================
    //===========  ACTIVA O DESACTIVA  ==================
    //===================================================
    else if (e.target.name === "add_tipoDocumento_cxp") {

        if (tipoDocumentoDebito.value == "fact") {
            activarInputsFormularioCredito(false);
        } else {
            activarInputsFormularioCredito(true);
            removerRequieredRecibos(true);
        }

    }

    $("#buscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        const optionTable = doc.querySelector('#ChoiceDocumentTable').value;
        if (optionTable == "DOCUMENTS_CXP") {
            //if (value.length > 2 || value.length == 0) {
            $("#tableDocument").load("Documents/_TableDocument_CXP",
                {

                    NumPagina: 0,
                    palabraBuscar: value,
                    estaBuscando: true,
                    accion: 'n', //n -> no pasar de pagina
                    CantRegistros: document.getElementById("tamanoPagina").value,
                    //CantRegistros: document.getElementById("tamPaginacion").value

                }, function (res) {
                    $("#tableDocument").html(res);
                })

        }


    });
});



function AgregarDocumentosRecientes_cxp(objDoc) {


    const documentoAgregado = lstProveedores.find(function (proveedor) {
        if (proveedor.Value === objDoc.Proveedor) {
            return proveedor.Text;
        }
    });

    objDoc.Proveedor = documentoAgregado.Text;


    documentosRecientes_cxp = [documentosRecientes_cxp, objDoc];
    localStorage.setItem('documentosRecientes_cxp', JSON.stringify(documentosRecientes_cxp));
    limpiarStorage_cxp = true;
    llenarTablaDocumentosRecientes_cxp();

}


function llenarTablaDocumentosRecientes_cxp() {
    const tableDepositosRecientes = d.getElementById("tbDepositosRecientes");
    var pDoc = selectDocumetosCredito_cxp.value;
    limpiarHtml(tableDepositosRecientes);
    doc.getElementById("doc_debito").textContent = "Trasacción";
    doc.getElementById("doc_credito").textContent = "Factura";
    doc.getElementById("nombreCliente").textContent = "Proveedor";
    if (pDoc != "") {
        fetch("Documents/getDeposits_CXP" + "?pDocument=" + pDoc)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                console.log(res);
                if (res.length > 0) {
                    let total = 0;
                    for (var i = 0; i < res.length; i++) {

                        var { DocumentoDebito, DocumentoCredito, FechaCreacion, FechaDocumento, MontoAux, NombreProveedor } = res[i];

                        //MontoDeposito = MontoDeposito.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });


                        var FechaAux = convertirFecha(FechaCreacion);
                        total = total + MontoAux;

                        /*total = total.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });*/
                        MontoAux = MontoAux.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });

                        var datos = `
                               <tr id="tbRecientes">
                                    <td id="tbDocumentoDeb">${DocumentoCredito}</td>
                                    <td id="tbDocumentoCred">${DocumentoDebito}</td>
                                    <td id="tbCliente">${NombreProveedor}</td>
                                    <td id="tbMonto" class="money">${MontoAux}</td>
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


function mostrarFacturasxRecibos(pDoc) {
    const tableDepositos = d.getElementById("tbDepositos");
    limpiarHtml(tableDepositos);
    fetch("Documents/getDeposits_CXP" + "?pDocument=" + pDoc)
        .then(res => res.ok ? res.json() : null)
        .then(res => {


            if (res.length > 0) {
                let total = 0;
                for (var i = 0; i < res.length; i++) {
                    console.log(res);
                    var { DocumentoCredito, DocumentoDebito, FechaCreacion, MontoAux } = res[i];

                    //MontoDeposito = MontoDeposito.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });


                    var FechaAux = convertirFecha(FechaCreacion);
                    total = total + MontoAux;

                    /*total = total.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });*/
                    MontoAux = MontoAux.toLocaleString("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    var datos = `
                               <tr id="tbDatos">
                                    <td id="tbDocumento">${DocumentoDebito}</td>
                                    <td id="tbMonto" class="money">${MontoAux}</td>
                                    <td id="tbFecha">${FechaAux}</td>
                                    <td>
                                         <button data-id="${DocumentoDebito}" id="remove_deposito_cxp" type="button" class="btn btn-outline-danger">
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
};


function llenarSelectTipoDocumento_cxp(element) {
    let opcionesTipoDocumentos = ["tran", "fact"];
    limpiarHtml(element);
    OpcionPorDefectoSelect(element, "Selecciona un Tipo");
    for (var i = 0; i < opcionesTipoDocumentos.length; i++) {
        const option = document.createElement('option');
        if (opcionesTipoDocumentos[i] === "fact") {
            option.value = opcionesTipoDocumentos[i];
            option.textContent = "Factura";
        } else {
            option.value = opcionesTipoDocumentos[i];
            option.textContent = "Transaccion";

        }
        element.appendChild(option);
    }

}




//============================================================
//============= FUNCIONES ASINCRONICAS QUE ===================
//============ MANIPULAN LOS DOCUMENTOS CXC ==================
//============================================================

async function obtenerDocumentos_Proveedor_cxp(pIdProveedor) {

    let documentosProveedor = await getDocumentosXProveedor(pIdProveedor);
    documentosDebitoProveedor = documentosCreditoProveedor = [];

    documentosDebitoProveedor = documentosProveedor.filter(doc => doc.TipoDocumento == "tran");

    documentosCreditoProveedor = documentosProveedor.filter(doc => doc.TipoDocumento == "fact");


    llenarSelectDocumentosDebitos(pIdProveedor, "Transacciones", documentosDebitoProveedor, selectDocumetosDebito);
    llenarSelectDocumentosCreditos(pIdProveedor, "Facturas", documentosCreditoProveedor, selectDocumetosCredito);

}
async function getDocumentosXProveedor(pIdProveedor) {

    if (pIdProveedor !== "") {
        const response = await fetch("/Documents/getDocumentosxProveedor?pIdProveedor=" + pIdProveedor);
        const data = await response.json();
        return data.lstDocumentosDisponiles;
    } else {
        return [];
    }
}

function llenarSelectProveedor(element) {
    limpiarHtml(element);
    const defaultOption = document.createElement('option');

    fetch("/Documents/getProviders")
        .then(res => res.ok ? res.json() : null)
        .then(res => {
            OpcionPorDefectoSelect(element, "Proveedores");
            if (res.selectProviders.length > 0) {
                lstProveedores = res.selectProviders;
                for (let i = 0; i < res.selectProviders.length; i++) {
                    const { Text, Value } = res.selectProviders[i];
                    const option = document.createElement('option');

                    option.value = Value;
                    option.textContent = Text;

                    element.appendChild(option);
                }
            }

            else {
                defaultOption.text = "No hay Proveedores Disponibles";
                defaultOption.value = "";

                defaultOption.disabled = false;
                defaultOption.selected = true;

                element.appendChild(defaultOption);

            }

        })

}



function showHeaderDeposit_cxp(pDoc) {

    fetch("/Documents/getDataDocument_CXP?pDoc=" + pDoc)

        .then(res => res.ok ? res.json() : null)
        .then(res => {

            var { Documento, Monto, Saldo, FechaDocumento, IdProveedor, NombreCliente } = res;
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



//============================================================
//============== PINTA LOS DATOS EN EL MODAL CXP =============
//==============   O EN LA TABLA DE DETALLES =================
//============================================================
function showDataDocument_cxp(pDoc, pAccion) {
    //let prove = document.getElementById("IdProveedor").value;

    //'"@Url.Content("~/Document_CXP/getDataDocument")" + "?pDoc="' + pDoc
    fetch("/Documents/getDataDocument_CXP?pDoc=" + pDoc)

        .then(res => res.ok ? res.json() : null)
        .then(res => {

            if (pAccion == "Datos") {

                doc.querySelector('#documento').textContent = res.Documento;
                doc.querySelector('#documento').value = res.Documento;

                doc.querySelector('#monto').textContent = res.Monto;
                doc.querySelector('#monto').value = res.Monto;

                doc.querySelector('#saldo').textContent = res.Saldo;
                doc.querySelector('#saldo').value = res.Saldo;

                doc.querySelector('#pago').textContent - res.CondicionPago;
                doc.querySelector('#pago').value = res.CondicionPago;

                doc.querySelector('#nota').textContent = res.Nota;
                doc.querySelector('#nota').value = res.Nota;

                doc.querySelector('#fechaDocumento').textContent = res.FechaDocumento;
                doc.querySelector('#fechaDocumento').value = res.FechaDocumento;

                if (res.TipoDocumento == "fact") {
                    doc.querySelector('#tipoDocumento').options.item(1.).selected = 'selected';
                }
                else {
                    doc.querySelector('#tipoDocumento').options.item(2).selected = 'selected';
                }

                if (res.Estado == "AD") {
                    doc.querySelector('#estado').options.item(1).selected = 'selected';
                } else if (res.Estado == "PD") {
                    doc.querySelector('#estado').options.item(2).selected = 'selected';
                } else if (res.Estado == "CL") {
                    doc.querySelector('#estado').options.item(3).selected = 'selected';
                }


                doc.querySelector('#IdProveedor').value = res.IdProveedor;

                //selectEditPartida.value = res.IdPartida;

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


function cambiarNombresInputs_CXP() {
    formularioAsociacion.name = "formDocumentoMixto_cxp";

    titleModalAsociacion_cxp.textContent = "Cuentas Por Pagar";



    titleFormularioCredito_cxp.textContent = "Trasacciones del Proveedor";
    label_selec_proveedor.textContent = "Proveedor";
    label_select_transaccion.textContent = "Facturas Pendientes";
    label_checkbox_cxp.textContent = "¿Asociar Facturas Existentes?";

    checkBox.name = "activeCredito_cxp";
    inputDocumentoDebito.name = "add_documento_debito_cxp";
    inputMontoDocumentoDebito.name = "monto_debito_cxp";
    inputSaldoDebito.name = "add_saldo_debito_cxp";
    tipoDocumentoDebito.name = "add_tipoDocumento_cxp";
    fechaDocumentoDebito.name = "fechaDocumento_debito_cxp";
    condicionPagoDebito.name = "condicio_pago_cxp";
    notaMensualidad.name = "nota_debito_cxp";
    selectTipoDocumento_cxp.name = "add_tipoDocumento_cxp";


    btnVerRecientesAgregados_cxp.name = "recientes_agregados_cxp";

    inputSaldoCredito.name = "add_saldo_credito";
    fechaDocumentoCredito.name = "fechaDocumento_credito_cxp";
    notaCredito.name = "nota_credito_cxp";
    selectDocumetosDebito.name = "select_documento_debito_cxp";
    selectDocumetosCredito.name = "select_documento_credito_cxp";
    selectClientes.name = "add_cliente_cxp";
    selectPartida.name = "partida_credito_cxp";

    d.getElementById("formularioDebito").style.borderRadius = "10px";
    d.getElementById("formularioDebito").style.border = "3px solid blue";

    d.getElementById("formularioCredito").style.borderRadius = "10px";
    d.getElementById("formularioCredito").style.border = "3px solid red";
}