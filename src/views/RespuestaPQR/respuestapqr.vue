<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Gestión de Respuesta PQR'" :tituloBoton="'Crear Respuesta'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestion de Respuesta PQR'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <Formrespuestapqr v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :clientes="clientes" :pqrs="pqrs" :areas="areas" :dataValue="dataRespuestaById" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="respuestas" stripe style="width: 100%">
        <el-table-column prop="id_cliente" label="Cliente" />
        <el-table-column prop="id_radicadopqr" label="PQR" />
        <el-table-column prop="id_arearespuesta" label="Área de Respuesta" />
        <el-table-column prop="respuesta_cliente" label="Respuesta al Cliente" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="EditIcon" @click="editarFormulario(registro.row.id)">Editar</el-button>
            <el-button link type="danger" :icon="DeleteIcon" @click="eliminarRespuesta(registro.row.id)">Eliminar</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue'
import Formulario from '../../components/Formulario.vue'
import Header from '../../components/Header.vue'
import { Edit as EditIcon, Delete as DeleteIcon } from '@element-plus/icons-vue';
import Formrespuestapqr from './components/formrespuestapqr.vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataRespuestaById = ref(null)
const clientes = ref([])
const pqrs = ref([])
const areas = ref([])
const respuestas = ref([])

const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataRespuestaById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await crearRespuesta()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await actualizarRespuesta()
  }
}

const crearRespuesta = async () => {
  const url = 'http://127.0.0.1:8000/api/respuestapqr/save'
  const dataFormulario = {
    id_cliente: formRef.value.formulario.id_cliente,
    id_radicadopqr: formRef.value.formulario.id_radicadopqr,
    id_arearespuesta: formRef.value.formulario.id_arearespuesta,
    respuesta_cliente: formRef.value.formulario.respuesta_cliente
  }

  try {
    await axios.post(url, dataFormulario)
    ElMessage({
      message: 'Respuesta PQR creada con éxito',
      type: 'success'
    })
    formRef.value?.limpiarFormulario()
    obtenerRespuestas()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al crear respuesta PQR', error)
  }
}

const actualizarRespuesta = async () => {
  const url = 'http://127.0.0.1:8000/api/respuestapqr/update'
  const dataFormulario = {
    id: dataRespuestaById.value.id,
    id_cliente: formRef.value.formulario.id_cliente,
    id_radicadopqr: formRef.value.formulario.id_radicadopqr,
    id_arearespuesta: formRef.value.formulario.id_arearespuesta,
    respuesta_cliente: formRef.value.formulario.respuesta_cliente
  }

  try {
    await axios.put(url, dataFormulario)
    ElMessage({
      message: 'Respuesta PQR actualizada con éxito',
      type: 'success'
    })
    formRef.value?.limpiarFormulario()
    obtenerRespuestas()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al actualizar respuesta PQR', error)
  }
}

const eliminarRespuesta = async (id) => {
  const url = 'http://127.0.0.1:8000/api/respuestapqr/delete'
  ElMessageBox.confirm('¿Está seguro de eliminar esta respuesta?', 'Eliminar Respuesta', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    type: 'warning'
  }).then(async () => {
    try {
      await axios.delete(url, { data: { id } })
      ElMessage({
        type: 'success',
        message: 'Respuesta eliminada con éxito'
      })
      obtenerRespuestas()
    } catch (error) {
      console.error('Error al eliminar respuesta', error)
    }
  })
}

const obtenerRespuestas = async () => {
  const url = 'http://127.0.0.1:8000/api/respuestapqr/get'
  try {
    const response = await axios.get(url)
    respuestas.value = response.data.result
  } catch (error) {
    console.error('Error al obtener respuestas', error)
  }
}

const obtenerClientes = async () => {
  const url = 'http://127.0.0.1:8000/api/cliente/get'
  try {
    const response = await axios.get(url)
    clientes.value = response.data.result
  } catch (error) {
    console.error('Error al obtener clientes', error)
  }
}

const obtenerPQRs = async () => {
  const url = 'http://127.0.0.1:8000/api/pqr/get'
  try {
    const response = await axios.get(url)
    pqrs.value = response.data.result
  } catch (error) {
    console.error('Error al obtener PQRs', error)
  }
}

const obtenerAreas = async () => {
  const url = 'http://127.0.0.1:8000/api/arearespuesta/get'
  try {
    const response = await axios.get(url)
    areas.value = response.data.result
  } catch (error) {
    console.error('Error al obtener áreas', error)
  }
}

onMounted(() => {
  obtenerClientes()
  obtenerPQRs()
  obtenerAreas()
  obtenerRespuestas()
})
</script>

<style scoped></style>
