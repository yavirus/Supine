<template>
    <div class="reg">
        <div class="container ">
            <div class="page-header">
                <h1 style="font-size: 500%">Supine</h1>
            </div>
            <SignUpForm/>
        </div>
    </div>
</template>

<script>
import SignUpForm from '@/components/SignUpForm.vue'
export default {
    name: 'Reg',
    components: {
        SignUpForm
    }
}
</script>

<style scoped>
    .page-header{
        margin-right: 8%;
        text-align: center;
        color: #FF7514;
        margin-bottom: 5%;
    }
</style>