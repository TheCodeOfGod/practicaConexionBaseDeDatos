document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreLugar = urlParams.get('nombre');

    if (!nombreLugar) {
        console.error('No se proporcionó un nombre de lugar');
        return;
    }

    fetch(`/api/lugares?nombre=${encodeURIComponent(nombreLugar)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const lugar = data[0];

                // Mostrar características
                const caracteristicas = document.querySelectorAll('.caract');
                if (lugar.caracterstica_1) caracteristicas[0].textContent = lugar.caracterstica_1;
                if (lugar.caracteristica_2) caracteristicas[1].textContent = lugar.caracteristica_2;
                if (lugar.caracteristica_3) caracteristicas[2].textContent = lugar.caracteristica_3;

                // Mostrar nombre del lugar
                const nombreLugarElement = document.querySelector('.breadcrumbs__link--active');
                if (nombreLugarElement) nombreLugarElement.textContent = lugar.nombre_lugar;

                // mostrar categoria en la ruta
                const categoriaLugar = document.getElementById('categoria_lugar');
                if (categoriaLugar) categoriaLugar.textContent = lugar.nombre_categoria;

                // Mostrar titulo del establecimiento
                const titulo = document.querySelector('.titulo');
                if (titulo) titulo.textContent = lugar.nombre_lugar;

                // Actualizar dirección
                const direccion = document.querySelector('.direccion');
                if (direccion) {
                    const direccionCompleta = `${lugar.calle} #${lugar.numero}, ${lugar.colonia}, ${lugar.ciudad}`;
                    direccion.innerHTML = `<img src="https://cdn.icon-icons.com/icons2/2444/PNG/512/location_map_pin_direction_icon_148665.png" alt="">${direccionCompleta}`;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Aquí puedes agregar código para mostrar un mensaje de error al usuario
        });
});