const fetchMethod = (props) => {

    let { url, method = "POST", body, cbSuccess } = props;

    fetch(url, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)

    }).then(res => (res.ok ? res.json() : Promise.reject(res)))
        .then(data => cbSuccess(data))
        .catch(error => console.error(error));
}

const validarCampo = (props) => {

    let { objExpresion, input, inputValue, formIsValid, inputsError = undefined } = props;
    //console.log("ObjExpresion: ");
    //console.log(objExpresion);
    let pasoTest = false;

    if (inputsError === undefined) {
        pasoTest = objExpresion.expresionR.test(input.value) || false;
    } else {
        pasoTest = inputsError;
    }
    //input.value.length > 0 ? true : false;


    if (pasoTest) {
        // TRUE => Campo cumple con lo solicitado y pinta los elementos en verde
        document
            .getElementById(objExpresion.grupoError)
            .classList.remove("formulario__grupo-incorrecto");

        document
            .getElementById(objExpresion.grupoError)
            .classList.add("formulario__grupo-correcto");

        if (inputsError === undefined) {
            formIsValid[input.id] = true; // MODIFICAMOS EL VALOR
        } else {
            formIsValid[inputValue] = true;
        }

    } else {
        // FALSE => No cumple, pinta los elementos en ROJO

        document
            .getElementById(objExpresion.grupoError)
            .classList.remove("formulario__grupo-correcto");

        document
            .getElementById(objExpresion.grupoError)
            .classList.add("formulario__grupo-incorrecto");

        if (inputsError === undefined) {
            formIsValid[input.id] = false; // MODIFICAMOS EL VALOR
        } else {
            formIsValid[inputValue] = false;
        }
    }

    // agrega msjError correspondiente => vacio si cumple || msjError => no cumple
    let lblMsj = document.getElementById(objExpresion.labelError);
    lblMsj.textContent = pasoTest ? "" : objExpresion.msjError;
};

const cargarComponent =  (props) => {

    let { container, url, body } = props;

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)

    })
        .then((res) => res.text())
        .then((viewPartial) => document.getElementById(container).innerHTML = viewPartial)
        .catch((er) => console.error("Ha ocurrido un error al cargar el contenido", er));
}
const todosLosCamposLlenos = (formIsValid) => {

    let arr = Object.values(formIsValid);
    let sonVerdaderos = arr.every((e) => e === true);

    return sonVerdaderos;
};

const inputsError = (props) => {

    let { objExpresion, formIsValid } = props;

    let keys = Object.keys(formIsValid);//id
    let values = Object.values(formIsValid); //value

    //validarCampo({
    //    objExpresion: objExpresion,
    //    input: { "input": values[i] },
    //    formIsValid: formIsValid
    //})
    //console.log("Key: ")
    //console.log(keys[0]);

    console.log("Tamano de keys: " + keys.length);
    console.table(formIsValid);


    for (var i = 0; i < keys.length; i++) {

        if (keys[i] === "undefined") return false;

        validarCampo({
            objExpresion: objExpresion[keys[i]],
            inputsError: values[i],
            formIsValid: formIsValid
        })
    }

}

const clearInputsColor = () => {
    const d = document,
        elementos = d.querySelectorAll('.formulario__grupo-correcto'),
        elementos2 = d.querySelectorAll('.formulario__grupo-incorrecto'),
        lbl = d.querySelectorAll('.msj__label');

    // Iterar a través de todos los elementos y remover la clase
    elementos.forEach(elemento => {
        elemento.classList.remove('formulario__grupo-correcto');
    });
    elementos2.forEach(elemento => {
        elemento.classList.remove('formulario__grupo-incorrecto');
    });
    lbl.forEach(elemento => {
        elemento.textContent = "";
    });
}


const darValorRadio = (props) => {
    let { esActivo, elementName } = props;

    if (esActivo) {
        d.getElementsByName(elementName)[0].checked = true;
    } else {
        d.getElementsByName(elementName)[1].checked = true;
    }


}


//Pasar a la pagina siguiente
const siguientePagina = (props) => {
    let { sig, totalPage, CantRegistros, url, container, palabraBuscar } = props;
    let siguiente = sig - 1;//Limpiamos el valor que viene de la vista



    fetch(url, {
        method:"POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            NumPagina: siguiente,
            palabraBuscar:"",
            accion: 'S',
            totalPaginas: totalPage,
            CantRegistros: CantRegistros,
            palabraBuscar: palabraBuscar
        })})
        .then((res) => res.text())
        .then((viewPartial) => document.getElementById(container).innerHTML = viewPartial)
        .catch((er) => console.error("Ha ocurrido un error al cargar el contenido", er));
}


//Pasar a la pagina anterior
const retrocederPagina = (props) => {
    let { ant, totalPage, tamanoPagina, url, container, palabraBuscar } = props;
    var anterior = ant - 1;//Limpiamos el valor que viene de la vista



    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            NumPagina: anterior,
            palabraBuscar: palabraBuscar,
            accion: 'N',
            totalPaginas: totalPage,
            CantRegistros: tamanoPagina
        })
    })
      .then((res) => res.text())
      .then((partialView) => document.getElementById(container).innerHTML = partialView)
      .catch((er) => console.error("Ha ocurrido un error al cargar el contenido", er));
}

// Cambio de tamaño de paginacion
const cambioTamanoPagina = (props) => {
    let { totalPage, tamanoPagina, url, container, palabraBuscar } = props;

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            palabraBuscar: palabraBuscar,
            totalPaginas: totalPage,
            CantRegistros: tamanoPagina
        })
    })
        .then((res) => res.text())
        .then((partialView) => document.getElementById(container).innerHTML = partialView)
        .catch((er) => console.error("Ha ocurrido un error al cargar el contenido", er));

}

const buscarPalabra = (props) => {
    let { url, container, palabraBuscar, tamanoPagina } = props;


    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            NumPagina: 0,
            palabraBuscar: palabraBuscar,
            estaBuscando: true,
            accion: 'n', //n -> no pasar de pagina
            CantRegistros: tamanoPagina,

        })
    })
        .then((res) => res.text())
        .then((partialView) => document.getElementById(container).innerHTML = partialView)
        .catch((er) => console.error("Ha ocurrido un error al cargar el contenido", er));
}