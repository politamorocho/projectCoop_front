function cerrarModal(string) {

    $(function() {
        jQuery.noConflict();
        // $("#modalCrearUnidad").modal("hide");
        $(string).modal("hide");
    });

}


function botonNav() {
    const boton = document.getElementById('boton-sidebar')
    const html = document.getElementById('html')
    const botonSidebarLeft = document.getElementById('boton-sidebar_left')
    const navbar = document.getElementById('content-buttons')
    const botonFixed = document.getElementById('content-button_fixed')
    const sidebar = document.getElementById('sidebar')
    const contenedor = document.getElementById('main')

    const ms = document.getElementById('dashbb')

    boton.addEventListener('click', function() {
        sidebar.classList.toggle('toggle');
        contenedor.classList.toggle('main');
        botonFixed.classList.remove('block');
        botonFixed.classList.add('align');
    })

    botonFixed.addEventListener('click', function() {
        sidebar.classList.toggle('toggle');
        contenedor.classList.toggle('main')
    })

    botonSidebarLeft.addEventListener('click', function() {
        html.classList.toggle('nav-open');


    })
    let scroll = document.documentElement.scrollTop
        // console.log(scroll)
    if (scroll >= 25) {
        navbar.classList.add('none');
        botonFixed.classList.add('block');
    } else {
        navbar.classList.remove('none');
        botonFixed.classList.remove('block');
    }

    function mostrarBotonFixed() {
        let scroll = document.documentElement.scrollTop
            // console.log(scroll)
        if (scroll >= 25) {
            navbar.classList.add('none');
            botonFixed.classList.add('block');
        } else {
            navbar.classList.remove('none');
            botonFixed.classList.remove('block');
        }
    }


    window.addEventListener('scroll', mostrarBotonFixed);

}

function tablaAExcel() {
    $(document).ready(function() {
        $('#example').DataTable({
            "dom": 'Blfrtip',


            buttons: [
                'excelHtml5', 'pdfHtml5', 'csvHtml5'
            ],
            "language": {

                "processing": "Procesando...",
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "emptyTable": "Ningún dato disponible en esta tabla",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar:",
                "infoThousands": ",",
                "loadingRecords": "Cargando...",

                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": ">",
                    "previous": "<"
                },
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",

            },
            "lengthMenu": [5, 10, 25, 50, 100],
            "pageLength": 5,



        });
    });
}