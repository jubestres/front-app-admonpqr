<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Gestión de Proyectos'" :tituloBoton="'Crear Proyecto'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Formulario de Proyecto'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
        @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <Formproyectos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                :dataValue="dataProyectoById" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="proyectos" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="codigo" label="Código" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="EditIcon" @click="editarFormulario(registro.row.id)">Editar</el-button>
            <el-button link type="danger" :icon="DeleteIcon" @click="eliminarProyecto(registro.row.id)">Eliminar</el-button>
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
import Formproyectos from './components/formproyectos.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const mostrarFormulario = ref(false);
const editandoFormulario = ref(false);
const formRef = ref();
const dataProyectoById = ref(null);
const proyectos = ref([]);

const abrirFormulario = () => {
  mostrarFormulario.value = true;
  editandoFormulario.value = false;
};

const editarFormulario = async (id) => {
  dataProyectoById.value = await datosById(id);
  mostrarFormulario.value = true;
  editandoFormulario.value = true;
};

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await crearProyecto();
  }
};

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await actualizarProyecto();
  }
};

const crearProyecto = async () => {
  const url = 'http://127.0.0.1:8000/api/proyecto/save';
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Proyecto creado con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerProyectos();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al crear proyecto', error);
  }
};

const actualizarProyecto = async () => {
  const url = 'http://127.0.0.1:8000/api/proyecto/update';
  const dataFormulario = {
    id: dataProyectoById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    codigo: formRef.value.formulario.codigo,
  };

  try {
    await axios.put(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Proyecto actualizado con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerProyectos();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al actualizar proyecto', error);
  }
};

const eliminarProyecto = async (id) => {
  const url = 'http://127.0.0.1:8000/api/proyecto/delete';
  ElMessageBox.confirm('¿Está seguro de eliminar este proyecto?', 'Eliminar Proyecto', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    type: 'warning',
  })
  .then(async () => {
    try {
      await axios.delete(url, { data: { id } });
      obtenerProyectos();
      ElMessage({ message: 'Proyecto eliminado con éxito', type: 'success' });
    } catch (error) {
      console.error(error);
    }
  })
  .catch(() => {
    ElMessage({ type: 'info', message: 'Eliminación cancelada' });
  });
};

const obtenerProyectos = async () => {
  const url = 'http://127.0.0.1:8000/api/proyecto/get';
  try {
    const response = await axios.get(url);
    proyectos.value = response.data.result;
  } catch (error) {
    console.error('Error al obtener proyectos', error);
  }
};

const datosById = async (id) => {
  const url = 'http://127.0.0.1:8000/api/proyecto/datosById';
  try {
    const response = await axios.get(url, { params: { id } });
    return response.data.result;
  } catch (error) {
    console.error('Error al obtener datos del proyecto', error);
  }
};

onMounted(() => {
  obtenerProyectos();
});
</script>
