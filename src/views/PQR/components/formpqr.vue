<template>
    <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
      :size="formSize" status-icon>
      <el-form-item label="Fecha de radicación" prop="Fecha de radicacion"  >
        <el-date-picker
          v-model="formulario.fechaderadicacion"
          type="dates"
          placeholder="Seleccione fecha de radicación"
        />
        <!-- <el-input v-model="formulario.fechaderadicacion" /> -->
      </el-form-item>
      <el-form-item label="descripcion" prop="descripcion">
        <el-input v-model="formulario.descripcion" />
      </el-form-item>
      <el-form-item label="Cliente" prop="cliente">
        <el-select v-model="formulario.cliente" placeholder="Seleccione el cliente">
          <el-option v-for="cliente in cliente" :key="cliente.id" :label="cliente.nombre" :value="cliente.id" />
  
        </el-select>
      </el-form-item>
      <el-form-item label="tiposolicitud" prop="tiposolicitud">
        <el-select v-model="formulario.tiposolicitud" placeholder="Seleccione el tipo de solicitud ">
          <el-option v-for="tiposolicitud in tiposolicitud" :key="tiposolicitud.id" :label="tiposolicitud.nombre" :value="tiposolicitud.id" />
  
        </el-select>
      </el-form-item>
  
    </el-form>
  </template>
  
  <script setup>
  
  import { onMounted, reactive, ref, watch } from 'vue'
  
  const propiedad = defineProps({
    cliente: {
      type: Array,
      required: true,
    },
    dataValue: Object,

    tiposolicitud: {
      type: Array,
      required: true,
    },
    dataValue: Object,
  });
  
  const formSize = ref('default')
  const formRef = ref()
  const formulario = reactive({
    fechaderadicacion: '',
    descripcion: '',
    cliente: '',
    tiposolicitud: '',
  
  })
  
  const datosFormulario = () => {
  
    formulario.fechaderadicacion = propiedad.dataValue[0].Fecha_radicacion;
    formulario.descripcion = propiedad.dataValue[0].descripcion;
    formulario.cliente = propiedad.dataValue[0].id_clientes;
    formulario.tiposolicitud = propiedad.dataValue[0].id_tipo_solicituds;
  
  }
  
  const rulesForm = reactive({
    fechaderadicacion: [
      { required: true, message: 'Por favor ingrese fecha de radicacion', trigger: 'blur' }
    ],
    descripcion: [
      {
        required: true,
        message: 'Ingrese la descripcion',
        trigger: 'blur',
      },
    ],
    cliente: [
      {
        required: true,
        message: 'Seleccione cliente',
        trigger: 'blur',
      },
    ],
    tiposolicitud: [
      {
        required: true,
        message: 'Seleccione tipo solicitud',
        trigger: 'blur',
      },
    ],

  })
  
  const limpiarFormulario = () => {
    formRef.value.resetFields()
  }
  
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
}
  
  watch(
    () => propiedad.dataValue,
    (newData) => {
      datosFormulario();
    }
  );
  
  defineExpose({validarFormulario,formulario,limpiarFormulario})
  
  
  
  </script>
  
  
  
  <style scoped></style>