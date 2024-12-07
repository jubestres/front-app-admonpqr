<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Gestión de Radicados PQR'" :tituloBoton="'Crear Radicado'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Formulario de Radicado PQR'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
        @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <Formradicadopqr v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                :dataValue="dataRadicadoById" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="radicadosPQR" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="codigo" label="Código" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="EditIcon" @click="editarFormulario(registro.row.id)">Editar</el-button>
            <el-button link type="danger" :icon="DeleteIcon" @click="eliminarRadicado(registro.row.id)">Eliminar</el-button>
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
import Formradicadopqr from './components/formradicadopqr.vue'; 
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const mostrarFormulario = ref(false);
const editandoFormulario = ref(false);
const formRef = ref();
const dataRadicadoById = ref(null);
const radicadosPQR = ref([]);

const abrirFormulario = () => {
  mostrarFormulario.value = true;
  editandoFormulario.value = false;
};

const editarFormulario = async (id) => {
  dataRadicadoById.value = await datosById(id);
  mostrarFormulario.value = true;
  editandoFormulario.value = true;
};

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await crearRadicado();
  }
};

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await actualizarRadicado();
  }
};

const crearRadicado = async () => {
  const url = 'http://127.0.0.1:8000/api/radicadopqr/save';
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Radicado PQR creado con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerRadicados();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al crear radicado PQR', error);
  }
};

const actualizarRadicado = async () => {
  const url = 'http://127.0.0.1:8000/api/radicadopqr/update';
  const dataFormulario = {
    id: dataRadicadoById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    await axios.put(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Radicado PQR actualizado con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerRadicados();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al actualizar radicado PQR', error);
  }
};

const eliminarRadicado = async (id) => {
  const url = 'http://127.0.0.1:8000/api/radicadopqr/delete';
  ElMessageBox.confirm('¿Está seguro de eliminar este radicado?', 'Eliminar Radicado', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    type: 'warning',
  })
  .then(async () => {
    try {
      await axios.delete(url, { data: { id } });
      obtenerRadicados();
      ElMessage({ message: 'Radicado eliminado con éxito', type: 'success' });
    } catch (error) {
      console.error(error);
    }
  })
  .catch(() => {
    ElMessage({ type: 'info', message: 'Eliminación cancelada' });
  });
};

const obtenerRadicados = async () => {
  const url = 'http://127.0.0.1:8000/api/radicadopqr/get';
  try {
    const response = await axios.get(url);
    radicadosPQR.value = response.data.result;
  } catch (error) {
    console.error('Error al obtener radicados', error);
  }
};

const datosById = async (id) => {
  const url = 'http://127.0.0.1:8000/api/radicadopqr/datosById';
  try {
    const response = await axios.get(url, { params: { id } });
    return response.data.result;
  } catch (error) {
    console.error('Error al obtener datos del radicado', error);
  }
};

onMounted(() => {
  obtenerRadicados();
});
</script>

<style scoped>

</style>
