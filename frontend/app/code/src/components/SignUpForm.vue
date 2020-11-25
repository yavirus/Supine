<template>
    <div id="form-div">
        <FormulateForm v-model="formValues" @submit="handleSubmit">
            <FormulateInput name="username" label="Username" validation="required"/>
            <FormulateInput type="email" name="email" label="Email" validation="required|email"/>
            <FormulateInput
             type="password" 
             name="password" 
             label="Password" 
             validation="^required|min:6,length|matches:/[0-9]/"
             :validation-messages="{
                 matches: 'Password must include 1 digit'
             }"/>
            <FormulateInput type="submit" label="Sign Up"/>
        </FormulateForm>
    </div>
</template>

<script>
export default {
    data: () => ({
        formValues: {}
    }),
    methods: {
        handleSubmit: async function() {
          await this.axios
                .post('http://supine.local:8888/api/v1/create-user', 
                    this.formValues)
                .then(resp => alert(resp))
                .catch(err => alert(err));
        }
    }
};
</script>

<style scoped>
    #form-div{
        display: inline-block;
        min-width: 25em;
    }
</style>