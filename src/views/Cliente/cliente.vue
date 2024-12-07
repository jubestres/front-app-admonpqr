<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Gestión de Clientes'" :tituloBoton="'Crear Cliente'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Formulario de Cliente'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
        @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <Formcliente v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                :dataValue="dataClienteById" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="clientes" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="apellido" label="Apellido" />
        <el-table-column prop="cedula" label="Cédula" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="EditIcon" @click="editarFormulario(registro.row.id)">Editar</el-button>
            <el-button link type="danger" :icon="DeleteIcon" @click="eliminarCliente(registro.row.id)">Eliminar</el-button>
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
import Formcliente from './components/formcliente.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const mostrarFormulario = ref(false);
const editandoFormulario = ref(false);
const formRef = ref();
const dataClienteById = ref(null);
const clientes = ref([]);

const abrirFormulario = () => {
  mostrarFormulario.value = true;
  editandoFormulario.value = false;
};

const editarFormulario = async (id) => {
  dataClienteById.value = await datosById(id);
  mostrarFormulario.value = true;
  editandoFormulario.value = true;
};

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await crearCliente();
  }
};

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario();
  if (validacion) {
    await actualizarCliente();
  }
};

const crearCliente = async () => {
  const url = 'http://127.0.0.1:8000/api/cliente/save';
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    apellido: formRef.value.formulario.apellido,
    cedula: formRef.value.formulario.cedula,
    telefono: formRef.value.formulario.telefono,
    correo: formRef.value.formulario.correo,
    radicado: formRef.value.formulario.radicado
  };

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Cliente creado con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerClientes();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al crear cliente', error);
  }
};

const actualizarCliente = async () => {
  const url = 'http://127.0.0.1:8000/api/cliente/update';
  const dataFormulario = {
    id: dataClienteById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    apellido: formRef.value.formulario.apellido,
    cedula: formRef.value.formulario.cedula,
    telefono: formRef.value.formulario.telefono,
    correo: formRef.value.formulario.correo,
    radicado: formRef.value.formulario.radicado
  };

  try {
    await axios.put(url, dataFormulario)
      .then((response) => {
        ElMessage({ message: 'Cliente actualizado con éxito', type: 'success' });
        formRef.value?.limpiarFormulario();
        obtenerClientes();
        mostrarFormulario.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error al actualizar cliente', error);
  }
};

const eliminarCliente = async (id) => {
  const url = 'http://127.0.0.1:8000/api/cliente/delete';
  ElMessageBox.confirm('¿Está seguro de eliminar este cliente?', 'Eliminar Cliente', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    type: 'warning',
  })
  .then(async () => {
    try {
      await axios.delete(url, { data: { id } });
      obtenerClientes();
      ElMessage({ message: 'Cliente eliminado con éxito', type: 'success' });
    } catch (error) {
      console.error(error);
    }
  })
  .catch(() => {
    ElMessage({ type: 'info', message: 'Eliminación cancelada' });
  });
};

const obtenerClientes = async () => {
  const url = 'http://127.0.0.1:8000/api/cliente/get';
  try {
    const response = await axios.get(url);
    clientes.value = response.data.result;
  } catch (error) {
    console.error('Error al obtener clientes', error);
  }
};

const datosById = async (id) => {
  const url = 'http://127.0.0.1:8000/api/cliente/datosById';
  try {
    const response = await axios.get(url, { params: { id } });
    return response.data.result;
  } catch (error) {
    console.error('Error al obtener datos del cliente', error);
  }
};

onMounted(() => {
  obtenerClientes();
});
</script>

