<template>
  <layout-main>
    <template #slotLayout>
      <Header 
      :titulo="'Area Respuesta'" 
      :tituloBoton="'Crear Area Respuesta'" 
      :abrir="abrirFormulario" />
     


      <Formulario :titulo="'Gestion de Area respuesta'" v-model:is-Open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos">

        <template #slotform>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formarearespuesta v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" ref="formRef"
              />
            </el-col>
          </el-row>
        </template>

      </Formulario>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="Nombre" width="180" />
        <el-table-column prop="address" label="Direccion" width="180" />
        <el-table-column prop="phone" label="Telefono" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default>
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario">

            </el-button>
            <el-button link type="danger" :icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>

    </template>
  </layout-main>
</template>

<script lang="ts" setup>

import LayoutMain from '../../components/LayoutMain.vue';
import formarearespuesta from './components/formarearespuesta.vue'
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { reactive, ref } from 'vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import axios from 'axios';
import { ElMessage } from 'element-plus';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario= async()=>{
  mostrarFormulario.value = true
  editandoFormulario.value = true

}



const tableData = [
  {
    name: 'julian',
    address: 'Bogota Col',
    phone: '33124598',
  },
]


const guardarDatos =async()=>{
  const validacion = await formRef.value?.validarFormulario()
  if(validacion){
    await crearArearespuesta()
  }

}

const crearArearespuesta =async()=>{

  const url='http://127.0.0.1:8000/api/arearespuesta/save'

  const dataFormulario={
    nombre:formRef.value.formulario.nombre,
    codigo:formRef.value.formulario.codigo
  }

  try{

    axios.post(url, dataFormulario)
    .then(function (response) {
      console.log(response);
      formRef.value?.limpiarFormulario()
      ElMessage({
        message: 'El area se creo con exito,',
        type: 'success',
    })
    })
    .catch(function (error){
      console.log(error);
    });

  }catch(error){
    console.error('error al crear cargo', error);
  }


}

const actulizarArearespuesta =async()=>{

console.log('se actualizo el area respuesta');
}

const eliminarArearespuesta =async()=>{

console.log('se elimino el area respuesta');
}

const datosArearespuesta =async()=>{

console.log('se traen datos del area respuesta');
}

const datosArea =async()=>{

console.log('se traen datos del area respuesta');
}

const datosArea =async()=>{

console.log('se traen datos del area respuesta');
}


</script>
