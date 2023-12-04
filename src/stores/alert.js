import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useAlertStore = defineStore("alert", () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  function showToast(params) {
    Toast.fire({
      icon: params.icon,
      title: params.title,
    });
  }

  return { showToast };
});
