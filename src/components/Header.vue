<template>
    <div class="container">

<div class="container_header">
    <h2 class="titulo">Modulo de {{ titulo }}</h2>
<el-row justify="center" align="middle">

    <el-button type="primary" @click="abrir" class="padded-button">{{ tituloBoton }}</el-button> 
</el-row>

</div>


     
    </div>


</template>

<script setup>

defineProps({
    titulo: {type:String, Required:true},
    tituloBoton: {type:String, Required:true},
    abrir: {
        type: Function,
        Required:true
    }
})



</script>

<style scoped>
.container{
margin-bottom: 10px;

}

.conatiner_header{
display: flex;
justify-content: space-between;
border-bottom: 2px solid rgb(238, 233, 233);

}

.padded-button {
    padding: 20px;
    background-color: #7f5af0;
    border: none;
    color: white;

}

</style>