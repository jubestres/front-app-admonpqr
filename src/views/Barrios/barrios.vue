<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Gestión de Barrios'" :tituloBoton="'Crear Barrio'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Formulario de Barrio'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
        @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <Formbarrios v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                :dataValue="dataBarrioById" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="barrios" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="codigo" label="Código" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="EditIcon" @click="editarFormulario(registro.row.id)">Editar</el-button>
            <el-button link type="danger" :icon="DeleteIcon" @click="eliminarBarrio(registro.row.id)">Eliminar</el-button>
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
import Formbarrios from './components/formbarrios.vue';  
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const mostrarFormulario = ref(false);
const editandoFormulario = ref(false);
const formRef = ref();
const dataBarrioById = ref(null);
const barrios = ref([]);

const abrirFormulario = () => {
  mostrarFormulario.value = true;
  editandoFormulario.value = false;
};

const editarFormulario = async (id) => {
  dataBarrioById.value = await datosById(id);
  mostrarFormulario.value = true;
  editandoFormulario.value = true;
};

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await crearBarrio();
  }
};

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await actualizarBarrio();
  }
};

const crearBarrio = async () => {
  const url = 'http://127.0.0.1:8000/api/barrio/save';
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Barrio creado con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerBarrios();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al crear barrio', error);
  }
};

const actualizarBarrio = async () => {
  const url = 'http://127.0.0.1:8000/api/barrios/update';
  const dataFormulario = {
    id: dataBarrioById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    await axios.put(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Barrio actualizado con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerBarrios();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al actualizar barrio', error);
  }
};

const eliminarBarrio = async (id) => {
  const url = 'http://127.0.0.1:8000/api/barrio/delete';
  ElMessageBox.confirm('¿Está seguro de eliminar este barrio?', 'Eliminar Barrio', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    type: 'warning',
  })
  .then(async () => {
    try {
      await axios.delete(url, { data: { id } });
      obtenerBarrios();
      ElMessage({ message: 'Barrio eliminado con éxito', type: 'success' });
    } catch (error) {
      console.error(error);
    }
  })
  .catch(() => {
    ElMessage({ type: 'info', message: 'Eliminación cancelada' });
  });
};

const obtenerBarrios = async () => {
  const url = 'http://127.0.0.1:8000/api/barrio/get';
  try {
    const response = await axios.get(url);
    barrios.value = response.data.result;
  } catch (error) {
    console.error('Error al obtener barrios', error);
  }
};

const datosById = async (id) => {
  const url = 'http://127.0.0.1:8000/api/barrio/datosById';
  try {
    const response = await axios.get(url, { params: { id } });
    return response.data.result;
  } catch (error) {
    console.error('Error al obtener datos del barrio', error);
  }
};

onMounted(() => {
  obtenerBarrios();
});
</script>
