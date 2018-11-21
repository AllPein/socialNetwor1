<template>
	<v-app v-if='!user' id='inspire'>
		<v-content>
	      <v-container fluid fill-height>
	        <v-layout align-center justify-center>
	          <v-flex lg10 xs12 sm10 md10>
	            <v-card class="elevation-12">
	              <v-toolbar color='pink lighten-3' dark>
	                <v-toolbar-title>Login</v-toolbar-title>
	                <v-spacer></v-spacer> 
	              </v-toolbar>
	              <v-card-text>
	                <v-form>
	                	<!-- login -->
	                  <v-text-field
	                  v-model='email' 
	                  prepend-icon="person" 
	                  name="login" 
	                  label="E-mail" 
	                  type="text" 
	                  color='pink lighten-3'>
	                  </v-text-field>
	                  <!-- pas -->
	                  <v-text-field
	                  v-model='password' 
	                  prepend-icon="lock" 
	                  name="password" 
	                  label="Password" 
	                  id="password" type="password" 
	                  color='pink lighten-3'>
	                  </v-text-field>
	                </v-form>
	              </v-card-text>
	              <v-card-actions>
	                <v-btn v-if='email&&password' style='margin-left:40px' color="pink lighten-3" dark @click='signIn'>Login</v-btn>
	                <v-btn v-else disabled style='margin-left:40px'>Login</v-btn>
	                <small class='ml-3'>Do not have an account? <router-link to='/register'>Sign up</router-link></small>
	                <v-alert :value="err" type="error" class='ml-5'>{{err}}</v-alert>
	              </v-card-actions>
	            </v-card>
	          </v-flex>
	        </v-layout>
	      </v-container>
    	</v-content>
	</v-app>
</template>

<script>
	import {auth} from '../firebase'
	import firebase from 'firebase'
	export default {
  		name: 'Login',
  		data() {
  			return {
  				err:'',
  				password: '',
  				email: '',
  			}
  		},
  		computed: {
  			user(){
  				return this.$root.$data.user
  			}
  		},
  		methods: {
  			signIn () {
      			if (this.user) {
        			this.$router.replace('/') 
	      		}
	      		auth.signInWithEmailAndPassword(this.email, this.password)
	        	.then( () => {
	          		this.$router.replace('/')
	        	})
	        	.catch((err) => {
	          		this.err = err.message
	        	})
    		}
  		}
	}
</script>
