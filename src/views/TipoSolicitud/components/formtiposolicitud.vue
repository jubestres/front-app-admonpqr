<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto" :size="formSize" status-icon>
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre" />
    </el-form-item>

    <el-form-item label="Código" prop="codigo">
      <el-input v-model="formulario.codigo" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, watch, defineProps, defineExpose } from 'vue';


const propiedad = defineProps({
  modelValue: { type: Object, default: () => ({ nombre: '', codigo: '' }) }, 
});

const formSize = ref('default');
const formRef = ref();
const formulario = reactive({
  nombre: '',
  codigo: '',
});


const datosFormulario = () => {
  if (propiedad.modelValue) {
    formulario.nombre = propiedad.modelValue.nombre || '';
    formulario.codigo = propiedad.modelValue.codigo || '';
  }
};


const rulesForm = reactive({
  nombre: [
    { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }
  ],
  codigo: [
    { required: true, message: 'Por favor ingrese el código', trigger: 'blur' }
  ],
});


const limpiarFormulario = () => {
  formulario.nombre = '';
  formulario.codigo = '';
  formRef.value?.resetFields();
};


const validarFormulario = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        resolve(true);
      } else {
        reject('Formulario no válido');
      }
    });
  });
};


watch(
  () => propiedad.modelValue,
  (newData) => {
    datosFormulario();
  },
  { immediate: true } 
);


defineExpose({ validarFormulario, formulario, limpiarFormulario });
</script>

<style scoped>

</style>
