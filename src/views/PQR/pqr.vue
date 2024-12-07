<template>
    <LayoutMain>
        <template #slotLayout>
          <Header :titulo="'PQR'" :tituloBoton="'Crear PQR'" :abrir="abrirFormulario" />
  
  
  
            <Formulario :titulo="'Gestion de PQR'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <Formpqr v-model:modelValue="mostrarFormulario" :is-edit="editandoFormulario" 
                  ref="formRef":cliente="cliente" :tiposolicitud="tiposolicitud"  :dataValue="dataPQRById" />
            
                        </el-col>
                    </el-row>
                </template>
  
            </Formulario>
  
            <el-table :data="PQR" stripe style="width: 100%">
                <el-table-column prop="Fecha_radicacion" label="Fecha de radicacion" />
                <!-- prop hace referencia al nombre que viene de la data -->
                <el-table-column prop="Descripcion" label="Descripcion" />
                <!-- cuando le de editar lo que se va enviar es el id del cliente no el nombre
                 este nombre asi es para que se vea bonita la informacion por que si me sale el 1
                 queda uno perdido... hagale y cualquier cosa estoy calificando. entonces estoy pdte -->
                 <el-table-column prop="cliente.id_clientes" label="Cliente">
                <template #default="scope">
                    {{ scope.row.cliente.nombre }} {{ scope.row.cliente.apellido }}
                </template>
                </el-table-column>
                
              
                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default="registro">
                        <el-button link type="primary" size="large" :icon="EditIcon" 
                            @click="editarFormulario(registro.row.id)"> Editar
                        </el-button>
                        <el-button link type="danger" :icon="DeleteIcon"
                            @click="eliminarPQR(registro.row.id)"></el-button> Eliminar
                    </template>
                </el-table-column>
            </el-table>
  
        </template>
  
  
    </LayoutMain>
  </template>
  
  
  <script lang="ts" setup>
  import { onMounted, reactive, ref, watch } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import { Edit as EditIcon, Delete as DeleteIcon } from '@element-plus/icons-vue';
  import Formpqr from './components/formpqr.vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios';
  
  
  const mostrarFormulario = ref(false)
  const editandoFormulario = ref(false)
  const formRef = ref()
  const dataPQRById = ref()
  const tiposolicitud = ref([])
  const cliente = ref([])
  const PQR = ref([])
  
  
  const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
  }
  
  const editarFormulario = async (id) => {
    dataPQRById.value = await datosById(id)
    mostrarFormulario.value = true
    editandoFormulario.value = true
  }
  
  const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearPQR()
    }
  }
  
  const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarPQR()
    }
  }
  
  const crearPQR = async () => {
  
    const url = 'http://127.0.0.1:8000/api/pqr/save'
  
    const dataFormulario = {
        Fecha_radicacion: formRef.value.formulario.fechaderadicacion,
        descripcion: formRef.value.formulario.descripcion,
        id_cliente: formRef.value.formulario.cliente,
        id_tipo_solicituds: formRef.value.formulario.tiposolicitud
    }
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'La PQR se creo con exito',
                    type: 'success',
                })
                datosPQR()
                mostrarFormulario.value = false
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error al crear PQR ', error)
    }
  }
  
  const actualizarPQR = async () => {
  
    const url = 'http://127.0.0.1:8000/api/pqr/update'
  
    const dataFormulario = {
        id:dataPQRById.value[0].id,
        fechaderadicacion: formRef.value.formulario.fechaderadicacion,
        descripcion: formRef.value.formulario.descripcion,
        id_cliente: formRef.value.formulario.cliente,
        id_tipo_solicituds: formRef.value.formulario.tiposolicitud
    }
    try {
        axios.put(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'La PQR se actualizo con exito    .',
                    type: 'success',
                })
                datosPQR()
                mostrarFormulario.value = false
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error al crear PQR ', error)
    }
  
  }
  
  const datosById = async (id) => {
  
    const url = 'http://127.0.0.1:8000/api/pqr/datosById'
  
    try {
      const response = await axios.get
      (url, { params: { id } });
  return response.data.result;
  
  
    } catch (error) {
        console.error('error al crear PQR ', error)
    }
  
  }
  const eliminarPQR = async (id) => {
  
    const url = 'http://127.0.0.1:8000/api/pqr/delete'
  
    ElMessageBox.confirm(
        '¿Esta seguro de eliminar la PQR? ',
        'Eliminar Registro',
        {
            confirmButtonText: 'SI',
            cancelButtonText: 'Cancelar',
            type: 'error',
        }
    )
        .then(() => {
  
            try {
                axios.delete(url, { data: { id } })
                    .then(function (response) {
                        datosPQR()
  
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
  
            } catch (error) {
                console.error('error al crear PQR ', error)
            }
            ElMessage({
                type: 'success',
                message: 'Se elimino correctamente el registro',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Eliminacion cancelada',
            })
        })
  
  }
  const datosPQR = async () => {
  
    const url = 'http://127.0.0.1:8000/api/pqr/get'
  
    try {
        axios.get(url)
            .then(function (response) {
                PQR.value = response.data.result
               // console.log(response);
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error al crear PQR ', error)
    }
  
  
  }
  const getclientes = async () => {
  
    const url = 'http://127.0.0.1:8000/api/cliente/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                cliente.value = response.data.result
               // console.log(response);
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error al crear PQR ', error)
    }
  
  
  
  
  }
  
  const gettiposolicitud = async () => {
  
  const url = 'http://127.0.0.1:8000/api/tiposolicitud/datos'
  
  try {
      axios.get(url)
          .then(function (response) {
              tiposolicitud.value = response.data.result
             // console.log(response);
  
          })
          .catch(function (error) {
              console.log(error);
          });
  
  } catch (error) {
      console.error('error al crear PQR ', error)
  }
  
  
  
  
  }
  
  onMounted(() => {
    getclientes()
    gettiposolicitud()
    datosPQR()
  })
  
  </script>