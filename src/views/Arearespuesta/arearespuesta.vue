<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Gestión de Áreas de Respuesta'" :tituloBoton="'Crear Área de Respuesta'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Formulario de Área de Respuesta'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
        @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <Formarearespuesta v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                :dataValue="dataAreaById" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="areasRespuesta" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="codigo" label="Código" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="EditIcon" @click="editarFormulario(registro.row.id)">Editar</el-button>
            <el-button link type="danger" :icon="DeleteIcon" @click="eliminarArea(registro.row.id)">Eliminar</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import Formarearespuesta from './components/formarearespuesta.vue'; 
import { Edit as EditIcon, Delete as DeleteIcon } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const mostrarFormulario = ref(false);
const editandoFormulario = ref(false);
const formRef = ref();
const dataAreaById = ref(null);
const areasRespuesta = ref([]);

const abrirFormulario = () => {
  mostrarFormulario.value = true;
  editandoFormulario.value = false;
};

const editarFormulario = async (id) => {
  dataAreaById.value = await datosById(id);
  mostrarFormulario.value = true;
  editandoFormulario.value = true;
};

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await crearAreaRespuesta();
  }
};

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await actualizarAreaRespuesta();
  }
};

const crearAreaRespuesta = async () => {
  const url = 'http://127.0.0.1:8000/api/arearespuesta/save';
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Área de respuesta creada con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerAreas();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al crear área de respuesta', error);
  }
};

const actualizarAreaRespuesta = async () => {
  const url = 'http://127.0.0.1:8000/api/arearespuesta/update';
  const dataFormulario = {
    id: dataAreaById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    await axios.put(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Área de respuesta actualizada con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerAreas();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al actualizar área de respuesta', error);
  }
};

const eliminarArea = async (id) => {
  const url = 'http://127.0.0.1:8000/api/arearespuesta/delete';
  ElMessageBox.confirm('¿Está seguro de eliminar esta área?', 'Eliminar Área de Respuesta', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    type: 'warning',
  })
  .then(async () => {
    try {
      await axios.delete(url, { data: { id } });
      obtenerAreas();
      ElMessage({ message: 'Área eliminada con éxito', type: 'success' });
    } catch (error) {
      console.error(error);
    }
  })
  .catch(() => {
    ElMessage({ type: 'info', message: 'Eliminación cancelada' });
  });
};

const obtenerAreas = async () => {
  const url = 'http://127.0.0.1:8000/api/arearespuesta/get';
  try {
    const response = await axios.get(url);
    areasRespuesta.value = response.data.result;
  } catch (error) {
    console.error('Error al obtener áreas de respuesta', error);
  }
};

const datosById = async (id) => {
  const url = 'http://127.0.0.1:8000/api/arearespuesta/datosById';
  try {
    const response = await axios.get(url, { params: { id } });
    return response.data.result;
  } catch (error) {
    console.error('Error al obtener datos del área de respuesta', error);
  }
};

onMounted(() => {
  obtenerAreas();
});
</script>
