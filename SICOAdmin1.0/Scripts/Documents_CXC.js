
//========================= VARIABLES PARA MANEJAR DATOS DEPOSITOS ==============================
const d = document,
    $renderBody = d.getElementById("renderBody");


const contenedorTabla = d.getElementById("tableDocument");
const tabla = d.getElementById("tbDocuments_CXC");

d.addEventListener('DOMContentLoaded', () => {
    setTimeout(function () {
        localStorage.clear();
    }, 300000);
    //() => {
    //    const tablePosition = tabla.offsetTop - contenedorTabla.offsetTop;
    //    contenedorTabla.scrollTop = tablePosition;
    //};
});
let documentosRecientes = [];
let documentosCreditoCliente = [];
let documentosDebitoCliente = [];
let lstClientes = [];

//FORMULARIOS ASOCIACION 
const formularioDocumentoMixto = d.getElementById("formDocumentoMixto");
const table_added_recent = d.getElementById("added_recently");
//-----------------------------------------------------------
const optionTable = d.querySelector('#ChoiceDocumentTable').value;

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
    if (e.target.id === "create_deposito_cxc") {

        const selectPartida = d.getElementById("partida_credito");
        const selectCliente = d.getElementById("add_cliente_cxc");
        limpiarFormularioDebito();
        limpiarFormularioCredito();
        llenarSelectPartidas(selectPartida);
        llenarSelectCliente(selectCliente);
        llenarSelectDocumentosDebitos("", selectDocumetosDebito);
        llenarSelectDocumentosCreditos("", selectDocumetosCredito)
        table_added_recent.setAttribute("hidden", "");
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
    //========  BOTON SIGUIENTE PAGINA  =================
    //===================================================
    else if (e.target.name === "nextPage") {
        // const optionTable = document.querySelector('#ChoiceDocumentTable').value;

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
        /*const optionTable = document.querySelector('#ChoiceDocumentTable').value;*/

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
    else if (e.target.id === "show_depositos_cxc") {
        var modalDepositos = d.getElementById("crear_documento_asociar_deposito");

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

                            cargarComponent({
                                container: "renderLocalDoc",
                                url: "Documents/_ShowDocuments_CXC",
                            })
                            showHeaderDeposit(DocumentoDebito);
                            mostrarRecibosxMensualidad(DocumentoDebito);

                        }
                        else {
                            swal('Opps!',
                                res.msj,
                                'error')
                        }

                    }

                });



            });
        return false;
    }

    //===================================================
    //========  BOTON MUESTRA DEPOSITOS CREADOS  ========
    //===================================================

    else if (e.target.id === "recientes_agregados") {
        const btnVerRecientes = d.getElementById("recientes_agregados");

        if (btnVerRecientes.value == "1") {
            table_added_recent.scrollIntoView({ behavior: "smooth" });
            table_added_recent.removeAttribute("hidden");
            btnVerRecientes.value = "0";
            llenarTablaDocumentosRecientes();
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

    //===================================================
    //========= RELACIONA O AGREGAR DOCUMENTO ===========
    //===================================================

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
                            Cliente: selectClientes.value
                        };
                        AgregarDocumentosRecientes(objNew);

                        cargarComponent({
                            container: "renderLocalDoc",
                            url: "Documents/_ShowDocuments_CXC",
                        })

                        llenarSelectDocumentosDebitos(idCliente, selectDocumetosDebito);

                        llenarSelectDocumentosCreditos(idCliente, selectDocumetosCredito);
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

    else if (e.target.id === "ChoiceDocumentTable") {

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
            inputDocumentoDebito.removeAttribute("required");
            llenarSelectDocumentosDebitos(pIdCliente, selectDocumetosDebito);
            removerRequieredRecibos(false);
            activarInputsFormularioCredito(true);
        } else {
            inputDocumentoDebito.setAttribute("required", "");
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


    $("#buscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        /*var value = d.getElementById("buscar").value;*/
        if (optionTable == "DOCUMENTS_CXC") {
            //if (value.length > 2 || value.length == 0) {
            $("#tableDocument").load("Documents/_TableDocument_CXC",
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

//FUNCIONES
function AgregarDocumentosRecientes(objDoc) {


    const documentoAgregado = lstClientes.find(function (client) {
        if (client.Value === objDoc.Cliente) {
            return client.Text;
        }
    });

    objDoc.Cliente = documentoAgregado.Text;


    documentosRecientes = [documentosRecientes, objDoc];
    localStorage.setItem('documentosRecientes', JSON.stringify(documentosRecientes));

    llenarTablaDocumentosRecientes();

}

function llenarTablaDocumentosRecientes() {
    const tableDepositosRecientes = d.getElementById("tbDepositosRecientes");
    limpiarHtml(tableDepositosRecientes);
    documentosRecientes = JSON.parse(localStorage.getItem('documentosRecientes')) || [];

    if (documentosRecientes.length > 0) {
        for (var i = 0; i < documentosRecientes.length; i++) {
            var { DocDebito, DocCredito, Cliente } = documentosRecientes[i];
            
            var datos = `
             <tr id="tbDatos">
                 <td>${DocDebito}</td>
                 <td>${DocCredito}</td>
                 <td>${Cliente}</td>

             </tr>`;
            $("#tbDepositosRecientes").append(datos)
        }
    } else {
        var mensaje = `
             <tr>
                <td colspan="8">No existe registros actualmente</td>
             </tr>`;
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
        tipoDocumentoDebito.options.item(1).selected = 'selected';

        inputMontoDocumentoDebito.disabled = true;
        tipoDocumentoDebito.disabled = true;
        fechaDocumentoDebito.disabled = true;
        /*condicionPagoDebito.disabled = true;*/
        notaMensualidad.disabled = true;
        inputDocumentoDebito.setAttribute('hidden', '');
        selectDocumetosDebito.removeAttribute('hidden');
    } else {
        //DESACTIVAR ELEMENTOS 
        inputMontoDocumentoDebito.disabled = false;
        tipoDocumentoDebito.disabled = false;
        fechaDocumentoDebito.disabled = false;
        /*condicionPagoDebito.disabled = false;*/
        notaMensualidad.disabled = false;

        inputDocumentoDebito.removeAttribute('hidden');
        selectDocumetosDebito.setAttribute('hidden', '');

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

        inputMontoDocumentoDebito.textContent = obj.Monto;
        inputMontoDocumentoDebito.value = obj.Monto;

        fechaDocumentoDebito.valueAsDate = new Date(setDate);
        //condicionPagoDebito.textContent = obj.CondicionPago;
        //condicionPagoDebito.value = obj.CondicionPago;
        notaMensualidad.value = obj.Notas;
        inputSaldoDebito.textContent = obj.Saldo;
        inputSaldoDebito.value = obj.Saldo;

    }
};


function verificarFechasDocumentosAsociados() {
    const fechaActual = getDateToDay();
    const botonAgregar = d.getElementById('asociar_documento_cxc');

    var inputDebitoValido = true;
    var inputCreditoValido = true;
    console.log("fecha Actual: "+fechaActual);
    console.log(fechaDocumentoDebito.value);
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
    /*condicionPagoDebito.value = 0;*/
    notaMensualidad.value = "";
    inputSaldoDebito.value = 0;
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
        notaCredito.value = ""; 
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

};