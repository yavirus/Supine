<template>
    <div class="reg-form">
        <form class="form-horizontal"  id="sign-up-form" method="post" name="sign-up-form">
                <div class="form-group row" id="uname-form">
                    <div class="col-sm-10">
                        <input class="form-control"  type="text" id="new_uname" name="new_uname" placeholder="Username" v-on:input="checkUname">
                        <small class="text-danger" v-if="unameErr">
                            Username Must Contain Only Words, Numbers and _
                        </small>
                    </div>
                </div>
                <div class="form-group row" id="email-form">
                    <div class="col-sm-10">
                        <input class="form-control" type="email" id="new-email" name="new_email" placeholder="Email" v-on:input="checkEmail">
                        <small class="text-danger" v-if="emailErr">
                            Email Is Not Valid
                        </small>
                    </div>
                </div>
                <div class="form-group row" id="pass-form">
                    <div class="col-sm-10">
                        <input class="form-control" type="password" id="new-pass" name="new_password" placeholder="Password" v-on:input="checkPass">
                        <small class="text-danger" v-if="passErr">
                            Password must contain 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter
                        </small>
                    </div>
                </div>
                <div class="form-group row"  id="repass-form">
                <div class="col-sm-10">
                    <input class="form-control" type="password" id="re-pass" name="re_pass" placeholder="Repeate Password" v-on:input="checkRePass">
                    <small class="text-danger" v-if="rePassErr">
                            Passwords don't match or password is invalid
                    </small>
                </div>
                </div>
                <input v-if="allValid" class="btn btn-outline-secondary" id="sign-up-btn" type="button" value="sign-up" v-on:click="sendUserData">

            </form>
    </div>
</template>

<script>
export default {
    name: 'SignUpForm',
    data() {
        return {
            unameErr: undefined,
            emailErr: undefined,
            passErr: undefined,
            rePassErr: undefined,
            passVal: '',
            allValid: false,
        }
        
    },
    methods: {
        checkUname: function() {
            let input = document.getElementById('new_uname');
            if(/^[a-zA-Z0-9_]+$/.test(input.value)){
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                this.unameErr = false;
                if(this.unameErr === false && this.emailErr === false && this.passErr === false && this.rePassErr === false){
                    this.allValid = true;
                } 
            }
            else{
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                this.unameErr = true;
                this.allValid = false;
            }
            
        },
        
        checkEmail: function(){
            let input = document.getElementById('new-email');
            if(/\S+@\S+\.\S+/.test(input.value)){
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                this.emailErr = false;
                 if(this.unameErr === false && this.emailErr === false && this.passErr === false && this.rePassErr === false){
                    this.allValid = true;
                } 
            }
            else{
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                this.emailErr = true;
                this.allValid = false;
            }
        },

        checkPass: function(){
            let input = document.getElementById('new-pass');
            if(/^[A-Za-z]\w{7,15}$/.test(input.value)){
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                this.passErr = false;
                this.passVal = input.value;
                 if(this.unameErr === false && this.emailErr === false && this.passErr === false && this.rePassErr === false){
                    this.allValid = true;
                } 
            }
            else{
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                this.passErr = true;
                this.passVal = input.value;
                this.allValid = false;
            }
        },

        checkRePass: function(){
            let input = document.getElementById('re-pass');
            if(input.value == this.passVal & !this.passErr){
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                this.rePassErr = false;
                 if(this.unameErr === false && this.emailErr === false && this.passErr === false && this.rePassErr === false){
                    this.allValid = true;
                } 
            }
            else{
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                this.rePassErr = true;
                this.allValid = false;
            }
        },

        sendUserData: function(){

        }
    },
}
</script>

<style scoped>
    .form-horizontal{

        width: 50%;
    }
    .container form{
        margin-left: 26%;

    }
    .container{
        margin-top: 7%;
    }
    #sign-up-btn{
        margin-left: 52.5%;
        width: 30%;
    }

</style>