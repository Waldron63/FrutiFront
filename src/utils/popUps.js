import Swal from 'sweetalert2';

export const showSuccessPopup = (titulo, mensaje) => {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "success",
    confirmButtonText: "OK",
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showErrorPopup = (mensaje) => {
  Swal.fire({
    title: "¡Error!",
    text: mensaje,
    icon: "error",
    confirmButtonText: "Ok",
    timer: 3000,
    timerProgressBar: true,
  });
};
