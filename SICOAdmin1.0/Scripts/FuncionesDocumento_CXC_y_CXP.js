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

            console.log(res);
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

function showDataDocument_cxc(pDoc, pAccion) {
    //let prove = document.getElementById("IdProveedor").value;


    fetch("/Documents/getDataDocument_CXC?pDoc=" + pDoc)

        .then(res => res.ok ? res.json() : null)
        .then(res => {

            console.log(res);
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


function convertirFecha(FechaDocumento) {

    const dateString = FechaDocumento;
    const dateMilliseconds = Number(dateString.match(/\d+/)[0]); // Extraer el número de milisegundos
    const date = new Date(dateMilliseconds);

    var dia = date.getDate().toString().padStart(2, "0");
    var mes = (date.getMonth() + 1).toString().padStart(2, "0");
    var anio = date.getFullYear().toString();
    var fechaFormateada = dia + "/" + mes + "/" + anio;
    console.log(fechaFormateada);
    return fechaFormateada;
};

function limpiarHtml(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function llenarSelectPartidas() {
    const selectPartida = d.querySelector('#partida_deposito');
    fetch("/Departure/showActiveDepartures")

        .then(res => res.ok ? res.json() : null)
        .then(res => {

            for (var i = 0; i < res.length; i++) {
                const { Alias, Descripcion, IdPartida, Tipo } = res[i];
                const option = document.createElement('option');
                //option.value = res[i].IdPartida;
                //option.textContent = res[i].Descripcion;
                option.value = IdPartida;
                option.textContent = Alias + " - " + Descripcion + " - " + Tipo;


                selectPartida.appendChild(option);
            }
            
        })


}
//================ ELEMENTOS MODALES ==============================
let formDocument_CXP = document.querySelector('#formAddDocument_CXP');
let modalTitle = document.querySelector('#ModalTitle_CXP');
let btnModal = document.getElementById("btnModal_CXP");

let formDocument_CXC = document.querySelector('#formAddDocument_CXC');
let modalTitle_CXC = document.querySelector('#ModalTitle_CXC');
let btnModal_CXC = document.getElementById("btnModal_CXC");


//==========================================================


const d = document,
    $renderBody = d.getElementById("renderBody");





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
    //=============  BOTON AGREGAR_CXC   ================
    //===================================================

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
        div_tipo.setAttribute('hidden', '');



        $("#ModalDocument_CXC").modal("show");
        //}
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



        //d.getElementById("grupo_saldo").style.visibility = 'visible';
        //d.getElementById("grupo_estado").style.visibility = 'visible';
        //d.getElementById("grupo_tipo").style.visibility = 'visible';

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
    //===========  BOTON HACER DEPOSITO CXC  ============
    //===================================================
    else if (e.target.id === "add_deposito_cxc") {
        let pDoc = e.target.dataset.id;
        const selectPartida = d.getElementById("partida_deposito");
        limpiarHtml(selectPartida);

        llenarSelectPartidas();

        fetch("/Documents/getDataDocument_CXC?pDoc=" + pDoc)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                
                const { Documento,NombreCliente, Saldo} = res;


                d.getElementById("documento_debito").textContent = Documento;
                d.getElementById("documento_debito").value = Documento;

            
                d.getElementById("IdUser").textContent = NombreCliente;
                d.getElementById("IdUser").value = NombreCliente;

                
                d.getElementById("saldo_debito").textContent = Saldo;
                d.getElementById("saldo_debito").value = Saldo;

            })



        $("#ModalAddDeposito").modal("show");
        //$("#ModalAddDeposito").modal("show");
        return false;
    }
    //===================================================
    //===========  BOTON VER DEPOSITOS CXC  =============
    //===================================================
    else if (e.target.id === "show_depositos_cxc") {

        let pDoc = e.target.dataset.id;

        const table = d.getElementById("tbDepositos");

        limpiarHtml(table);



        fetch("Documents/getDeposits_CXC" + "?pDocument=" + pDoc)
            .then(res => res.ok ? res.json() : null)
            .then(res => {

                let total = 0;
                for (var i = 0; i < res.length; i++) {
                    const { Documento, DocumentoCredito, FechaCreacion, FechaDocumento, MontoDeposito,
                        MontoMensualidad, NombreCliente, SaldoMensualidad } = res[i];


                    var FechaDoc = convertirFecha(FechaDocumento);
                    var FechaAux = convertirFecha(FechaCreacion);

                    d.getElementById("numero_documento").textContent = Documento;
                    d.getElementById("numero_documento").value = Documento;

                    d.getElementById("FechaDocumento_dep").textContent = FechaDoc;
                    d.getElementById("FechaDocumento_dep").value = FechaDoc;

                    d.getElementById("usuario_dep").textContent = NombreCliente;
                    d.getElementById("usuario_dep").value = NombreCliente;

                    d.getElementById("monto_mens").textContent = MontoMensualidad;
                    d.getElementById("monto_mens").value = MontoMensualidad;

                    d.getElementById("saldo_mens").textContent = SaldoMensualidad;
                    d.getElementById("saldo_mens").value = SaldoMensualidad;

                    total = total + MontoDeposito;

                    var datos = `
                   <tr id="tbDatos">
                        <td id="tbDocumento">${DocumentoCredito}</td>
                        <td id="tbMonto">${MontoDeposito}</td>
                        <td id="tbFecha">${FechaAux}</td>

                   </tr>`;
                    $("#tbDepositos").append(datos)
                }
                d.getElementById("total_depositos").textContent = total;
                d.getElementById("total_depositos").value = total;
            })

        $("#ModalDeposito").modal("show");
        return false;
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

    else if (e.target.id === "fechaDeposito") {
      
        const inputFecha = d.getElementById("fechaDeposito");
        const botonAgregar = d.getElementById('btnAddDeposito_CXC');
        verificarFecha(inputFecha, botonAgregar);

        return false;
    }
    else if (e.target.id === "fechaDocumento_cxc") {

        const inputFecha = d.getElementById("fechaDocumento_cxc");
        const botonAgregar = d.getElementById('btnModal_CXC');
        verificarFecha(inputFecha, botonAgregar);
        return false;
    }
    else if (e.target.id === "fechaDocumento") {

        const inputFecha = d.getElementById("fechaDocumento");
        const botonAgregar = d.getElementById('btnModal_CXP');
        verificarFecha(inputFecha, botonAgregar);
        return false;

    }





    //fechaDocumento_cxc

});

function verificarFecha(InputFecha,btnAgregar) {

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;


    if (InputFecha.value > fechaFormateada) {
        console.log("Fecha Invalida");

        //console.log("Fecha Seleccionada => " + InputFecha.value);
        //console.log("Fecha Seleccionada => " + InputFecha.value);
        InputFecha.style.border = '2px solid red';
        
        btnAgregar.disabled = true;

    } else {
        btnAgregar.disabled = false;
        InputFecha.style.border = '1px solid #ced4da'
    }

}