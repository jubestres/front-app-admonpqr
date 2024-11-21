<template>
    <el-form
      ref="formRef"
      style="max-width: 100%"
      :model="Formulario"
      :rules="rulesForm"
      label-width="auto"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="Formulario.nombre" />
      </el-form-item>
      <el-form-item label="Codigo" prop="codigo">
        <el-input v-model="Formulario.codigo" />
    </el-form-item>
<el-form-item label="Area" prop="area">

        <el-select v-model="Formulario.area" placeholder="Seleccione un area">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>

</el-form>
</template>

  
  <script setup>
  import { reactive, ref } from 'vue'
  
  const formSize = ref('default')
  const formRef = ref()
  const Formulario = reactive({
    nombre: '',
    codigo: '',
    Idarea: '',
  
  })
  
  
  const rulesForm = reactive({
    nombre: [
      { required: true, message: 'Por favor ingrese el nombre del area', trigger: 'blur' },
      
    ],
    codigo: [
      {
        required: true,
        message: 'Ingrese el codigo',
        trigger: 'change',
      },
      ],
      area: [
      {
        required: true,
        message: 'Selecciones un valor',
        trigger: 'blur',
      },
      ],
    })  
   



  const limpiarFormulario =()=>{
    formRef.value.resetFields()
  }

  const validarFormulario = () => {

  
    return new Promise ((resolve)=>{
      formRef.value?.validate((valid)=>{
        if (valid) {
          resolve(true)
        } else {
          resolve(false)
        }

      })     
    })

   }
  
  
  defineExpose({validarFormulario, Formulario, limpiarFormulario})



  </script>
  
  <style scoped>
  </style>
  
  