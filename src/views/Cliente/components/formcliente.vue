<template>
    <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto" :size="formSize" status-icon>
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="formulario.nombre" />
      </el-form-item>
  
      <el-form-item label="Apellido" prop="apellido">
        <el-input v-model="formulario.apellido" />
      </el-form-item>
  
      <el-form-item label="Cédula" prop="cedula">
        <el-input v-model="formulario.cedula" />
      </el-form-item>
  
      <el-form-item label="Teléfono" prop="telefono">
        <el-input v-model="formulario.telefono" />
      </el-form-item>
  
      <el-form-item label="Correo" prop="correo">
        <el-input v-model="formulario.correo" />
      </el-form-item>
  
      <el-form-item label="Radicado" prop="radicado">
        <el-input v-model="formulario.radicado" />
      </el-form-item>
    </el-form>
  </template>
  
  <script setup>
  import { reactive, ref, watch } from 'vue';
  
  const propiedad = defineProps({
    dataValue: Object,  
  });
  
  const formSize = ref('default');
  const formRef = ref();
  const formulario = reactive({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    correo: '',
    radicado: ''
  });
  
  const datosFormulario = () => {
    if (propiedad.dataValue) {
      formulario.nombre = propiedad.dataValue[0]?.nombre || '';
      formulario.apellido = propiedad.dataValue[0]?.apellido || '';
      formulario.cedula = propiedad.dataValue[0]?.cedula || '';
      formulario.telefono = propiedad.dataValue[0]?.telefono || '';
      formulario.correo = propiedad.dataValue[0]?.correo || '';
      formulario.radicado = propiedad.dataValue[0]?.radicado || '';
    }
  };
  
  const rulesForm = reactive({
    nombre: [
      { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }
    ],
    apellido: [
      { required: true, message: 'Por favor ingrese el apellido', trigger: 'blur' }
    ],
    cedula: [
      { required: true, message: 'Por favor ingrese la cédula', trigger: 'blur' }
    ],
    telefono: [
      { required: true, message: 'Por favor ingrese el teléfono', trigger: 'blur' }
    ],
    correo: [
      { required: true, message: 'Por favor ingrese el correo', trigger: 'blur' }
    ],
    radicado: [
      { required: true, message: 'Por favor ingrese el radicado', trigger: 'blur' }
    ]
  });
  
  const limpiarFormulario = () => {
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
    () => propiedad.dataValue,
    (newData) => {
      datosFormulario();
    }
  );
  
  defineExpose({ validarFormulario, formulario, limpiarFormulario });
  </script>
  
  <style scoped>
  </style>
  