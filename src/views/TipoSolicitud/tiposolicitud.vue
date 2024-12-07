<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Gestión de Tipos de Solicitud'" :tituloBoton="'Crear Tipo de Solicitud'" :abrir="abrirFormulario" />

      <Formulario 
        :titulo="'Formulario de Tipo de Solicitud'" 
        v-model:modelValue="mostrarFormulario" 
        :is-edit="editandoFormulario"
        @save="guardarDatos" 
        @update="actualizarDatos"
      >
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <Formtiposolicitud 
                v-model:modelValue="mostrarFormulario" 
                :is-edit="editandoFormulario" 
                ref="formRef"
                :dataValue="dataTipoSolicitudById"
              />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="tiposolicitudes" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="codigo" label="Código" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large":icon="EditIcon" @click="editarFormulario(registro.row.id)">Editar</el-button>
            <el-button link type="danger" :icon="DeleteIcon" @click="eliminarTipoSolicitud(registro.row.id)">Eliminar</el-button>
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
import { Edit as EditIcon, Delete as DeleteIcon } from '@element-plus/icons-vue';
import Formtiposolicitud from './components/formtiposolicitud.vue'; 
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const mostrarFormulario = ref(false);
const editandoFormulario = ref(false);
const formRef = ref();
const dataTipoSolicitudById = ref(null);
const tiposolicitudes = ref([]);

const abrirFormulario = () => {
  mostrarFormulario.value = true;
  editandoFormulario.value = false;
};

const editarFormulario = async (id: number) => {
  dataTipoSolicitudById.value = await datosById(id);
  mostrarFormulario.value = true;
  editandoFormulario.value = true;
};

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await crearTipoSolicitud();
  }
};

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await actualizarTipoSolicitud();
  }
};

const crearTipoSolicitud = async () => {
  const url = 'http://127.0.0.1:8000/api/tiposolicitud/save';
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    const response = await axios.post(url, dataFormulario);
    ElMessage({ message: 'Tipo de Solicitud creado con éxito', type: 'success' });
    formRef.value?.limpiarFormulario();
    obtenerTiposSolicitud();
    mostrarFormulario.value = false;
  } catch (error) {
    console.error('Error al crear tipo de solicitud', error);
    ElMessage({ message: 'Error al crear tipo de solicitud', type: 'error' });
  }
};

const actualizarTipoSolicitud = async () => {
  const url = 'http://127.0.0.1:8000/api/tiposolicitud/update';
  const dataFormulario = {
    id: dataTipoSolicitudById.value?.id,
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    const response = await axios.put(url, dataFormulario);
    ElMessage({ message: 'Tipo de Solicitud actualizado con éxito', type: 'success' });
    formRef.value?.limpiarFormulario();
    obtenerTiposSolicitud();
    mostrarFormulario.value = false;
  } catch (error) {
    console.error('Error al actualizar tipo de solicitud', error);
    ElMessage({ message: 'Error al actualizar tipo de solicitud', type: 'error' });
  }
};

const eliminarTipoSolicitud = async (id: number) => {
  const url = 'http://127.0.0.1:8000/api/tiposolicitud/delete';
  ElMessageBox.confirm('¿Está seguro de eliminar este tipo de solicitud?', 'Eliminar Tipo de Solicitud', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    type: 'warning',
  })
  .then(async () => {
    try {
      await axios.delete(url, { data: { id } });
      obtenerTiposSolicitud();
      ElMessage({ message: 'Tipo de Solicitud eliminado con éxito', type: 'success' });
    } catch (error) {
      console.error('Error al eliminar tipo de solicitud', error);
      ElMessage({ message: 'Error al eliminar tipo de solicitud', type: 'error' });
    }
  })
  .catch(() => {
    ElMessage({ type: 'info', message: 'Eliminación cancelada' });
  });
};

const obtenerTiposSolicitud = async () => {
  const url = 'http://127.0.0.1:8000/api/tiposolicitud/get';
  try {
    const response = await axios.get(url);
    tiposolicitudes.value = response.data.result;
  } catch (error) {
    console.error('Error al obtener tipos de solicitud', error);
  }
};

const datosById = async (id: number) => {
  const url = 'http://127.0.0.1:8000/api/tiposolicitud/datosById';
  try {
    const response = await axios.get(url, { params: { id } });
    return response.data.result;
  } catch (error) {
    console.error('Error al obtener datos del tipo de solicitud', error);
  }
};

onMounted(() => {
  obtenerTiposSolicitud();
});
</script>
