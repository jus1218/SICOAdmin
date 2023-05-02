const doc = document,
    $rendBody = doc.getElementById("renderBody");


/*const optionTable = doc.querySelector('#ChoiceDocumentTable').value;*/
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


    if (e.target.id === "CreateDocument_CXP") {

        const div_saldo = doc.getElementById("grupo_saldo");
        const div_estado = doc.getElementById("grupo_estado");
        const div_tipo = doc.getElementById("grupo_tipo");


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

        const div_saldo = doc.getElementById("grupo_saldo");
        const div_estado = doc.getElementById("grupo_estado");
        const div_tipo = doc.getElementById("grupo_tipo");


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


        console.log("Boton de regresar");
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




});

//EVENTO SUBMIT
$rendBody.addEventListener("submit", (e) => {
    e.preventDefault();

    //===================================================
    //===========  AGREGA UN DOCUMENTO CXP  =============
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
    //==================  a Crear  ======================
    //===================================================
    else if (e.target.id === "fechaDocumento") {

        const inputFecha = doc.getElementById("fechaDocumento");
        const botonAgregar = doc.getElementById('btnModal_CXP');
        verificarFecha(inputFecha, botonAgregar);
        return false;

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

                if (res.TipoDocumento == "FA") {
                    doc.querySelector('#tipoDocumento').options.item(2).selected = 'selected';
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


function showDataDocument_cxc(pDoc, pAccion) {
    fetch("/Documents/getDataDocument_CXC?pDoc=" + pDoc)

        .then(res => res.ok ? res.json() : null)
        .then(res => {


            if (pAccion == "Datos") {

                doc.querySelector('#documento_cxc').textContent = res.Documento;
                doc.querySelector('#documento_cxc').value = res.Documento;

                doc.querySelector('#monto_cxc').textContent = res.Monto;
                doc.querySelector('#monto_cxc').value = res.Monto;
                doc.querySelector('#nota_cxc').textContent = res.Nota;
                doc.querySelector('#nota_cxc').value = res.Nota;

                doc.querySelector('#saldo_cxc').textContent = res.Saldo;
                doc.querySelector('#saldo_cxc').value = res.Saldo;

                doc.querySelector('#pago_cxc').textContent - res.CondicionPago;
                doc.querySelector('#pago_cxc').value = res.CondicionPago;

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
                } else if (res.Estado == "PD" || res.Estado == "pd") {
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