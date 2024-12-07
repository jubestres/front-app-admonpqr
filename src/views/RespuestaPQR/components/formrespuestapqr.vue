<template>
    <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto" :size="formSize" status-icon>
      
      
      <el-form-item label="Cliente" prop="id_cliente">
        <el-select v-model="formulario.id_cliente" placeholder="Seleccione el cliente">
          <el-option v-for="cliente in clientes" :key="cliente.id" :label="cliente.nombre" :value="cliente.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="PQR" prop="id_radicadopqr">
        <el-select v-model="formulario.id_radicadopqr" placeholder="Seleccione el PQR">
          <el-option v-for="pqr in pqrs" :key="pqr.id" :label="pqr.descripcion" :value="pqr.id" />
        </el-select>
      </el-form-item>
  

      <el-form-item label="Área de respuesta" prop="id_arearespuesta">
        <el-select v-model="formulario.id_arearespuesta" placeholder="Seleccione el área">
          <el-option v-for="area in areas" :key="area.id" :label="area.nombre" :value="area.id" />
        </el-select>
      </el-form-item>
  
   
      <el-form-item label="Respuesta al Cliente" prop="respuesta_cliente">
        <el-input v-model="formulario.respuesta_cliente" type="textarea" rows="4" />
      </el-form-item>
  
    </el-form>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, watch } from 'vue'
  import axios from 'axios'
  

  const propiedad = defineProps({
    clientes: Array,
    pqrs: Array,
    areas: Array,
    dataValue: Object
  })
  

  const formSize = ref('default')
  const formRef = ref()
  const formulario = reactive({
    id_cliente: '',
    id_radicadopqr: '',
    id_arearespuesta: '',
    respuesta_cliente: ''
  })

 
  const datosFormulario = () => {
    if (propiedad.dataValue) {
      formulario.id_cliente = propiedad.dataValue.id_cliente || ''
      formulario.id_radicadopqr = propiedad.dataValue.id_radicadopqr || ''
      formulario.id_arearespuesta = propiedad.dataValue.id_arearespuesta || ''
      formulario.respuesta_cliente = propiedad.dataValue.respuesta_cliente || ''
    }
  }
  

  const rulesForm = reactive({
    id_cliente: [{ required: true, message: 'Seleccione un cliente', trigger: 'blur' }],
    id_radicadopqr: [{ required: true, message: 'Seleccione el PQR', trigger: 'blur' }],
    id_arearespuesta: [{ required: true, message: 'Seleccione el área de respuesta', trigger: 'blur' }],
    respuesta_cliente: [{ required: true, message: 'Por favor ingrese la respuesta al cliente', trigger: 'blur' }]
  })
  

  const limpiarFormulario = () => {
    formRef.value?.resetFields()
  }
  
 
  const validarFormulario = () => {
    return new Promise((resolve, reject) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          resolve(true)
        } else {
          reject('Formulario no válido')
        }
      })
    })
  }
  

  watch(() => propiedad.dataValue, () => {
    datosFormulario()
  })
  

  defineExpose({ validarFormulario, formulario, limpiarFormulario })
  </script>
  
  <style scoped></style>
  
  
  