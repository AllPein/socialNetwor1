<template>
	<v-app id='inspire'>
		<v-content>
	      <v-container fluid fill-height>
	        <v-layout align-center justify-center>
	          <v-flex lg10 xs12 sm10 md10>
	            <v-card class="elevation-12" height='750'>
	              <v-toolbar color='pink lighten-3' dark>
	                <v-toolbar-title>Registration</v-toolbar-title>
	                <v-spacer></v-spacer> 
	              </v-toolbar>
	              <v-card-text>
	                <v-form>
	                	<v-container>
                        	<v-layout row wrap>
                          		<v-flex xs12 sm6>
                          			<v-text-field
                          			:rules='[rules.required]'
					                v-model='displayName' 
					                prepend-icon="person" 
					                name="displayName" 
					                label="First Name" 
					                type="text" 
					                color='pink lighten-3'>
					                </v-text-field>
	                			</v-flex>
	                			<v-flex xs12 sm6>
                          			<v-text-field
                          			:rules='[rules.required]'
					                v-model='surname' 
					                prepend-icon="person" 
					                name="surname" 
					                label="Last Name" 
					                type="text" 
					                color='pink lighten-3'>
					                </v-text-field>
	                			</v-flex>
	                			<v-flex xs12 sm6>
	                				<v-text-field
	                				:rules='[rules.required]'
	                				prepend-icon='place'
	                				v-model='country'
	                				name="country"
	                				label="Country"
	                				color='pink lighten-3'>	                			
	                				</v-text-field>
	                			</v-flex>
	                			<v-flex xs12 sm6>
	                				<v-text-field
	                				:rules='[rules.phone]'
	                				prepend-icon='phone'
	                				v-model='phone'
	                				name="phone"
	                				type='number'
	                				label="Phone number"
	                				color='pink lighten-3'>
	                				</v-text-field>
	                			</v-flex>
	                			<v-flex xs12 sm6>
	                				<h2 class='display-1 font-weight-thin'>Birth date</h2>
									<v-date-picker v-model="birthDate" header-color='pink lighten-3' color='pink lighten-3'></v-date-picker>
									<h2 class='d-block mt-3'>{{ birthDate }}</h2>
								</v-flex>
								<v-flex xs12 sm6>
									<v-flex xs12 sm10>
										<h2 class='mt-3 font-weight-regular'>Select profile picture</h2>
	                					<v-btn 
				                        :loading="loading4"
				                        :disabled="loading4"
				                        color="pink lighten-3"
				                        dark
				                        @click.native="loader = 'loading4'">
				                        <input  type="file" id='input' accept="image/*" @change="imageChange">Select
				                        <v-icon right dark>photo</v-icon>
				                        </v-btn>
	                				</v-flex>
	                				<v-flex xs12 sm10>
				                    	<img :src="imgsrc" id='image' />
									</v-flex>
	                					<v-btn color="error" fab small @click='removeImage' id='btn'><v-icon>delete</v-icon></v-btn>  
									<v-flex xs12 sm10>
	                					<v-text-field
	                					:rules='[rules.email]'
	                					prepend-icon='email'
		                				v-model='email'
		                				name="email"
		                				type='text'
		                				label="E-mail"
		                				color='pink lighten-3'>
	                					</v-text-field>
	                				</v-flex>
		                			<v-flex xs12 sm10>
		                				<v-text-field		                				
		                				:rules='[rules.password]'
		                				prepend-icon='lock'
		                				v-model='password'
		                				name="password"
		                				type='password'
		                				label="Password"
		                				secure
		                				color='pink lighten-3'>
		                				</v-text-field>
		                			</v-flex>
		                			<v-flex xs12 sm10 >
			                			<v-btn v-if='email&&password&&displayName&&surname&&phone&&country' color="pink lighten-3" dark @click.once='signUp'>Sign up</v-btn>
		                				<v-btn v-else disabled>Sign up</v-btn>
	                				</v-flex>
								</v-flex>	
	                		</v-layout>
	                	</v-container>		
	                </v-form>
	              </v-card-text>
	            </v-card>
	          </v-flex>
	        </v-layout>
	      </v-container>
    	</v-content>
	</v-app>
</template>

<script>
	import {auth, usersRef, storageImagesRef} from '../firebase'
	import firebase from 'firebase'
	export default {
  		name: 'Register',
  		data() {
 			return{
 				id: null,
 				signedUp: false,
 				imgsrc: "https://www.akcaotoaksesuar.com/yonetim/images/no-image.jpg",
 				loading4:false,
 				displayName: '',
 				imgUrl: null,
 				email: '',
 				password: '',
 				file: null,
 				surname:'',
 				phone: '',
 				country:'',
 				birthDate: new Date().toISOString().substr(0, 10),
 				rules: {
 					phone: v => v.length == 11 ? !!v : 'Invalid number, must be 11 characters',
                	required:v => !!v || 'Required',
                	email: value => {
          				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          				return pattern.test(value) || 'Example@gmail.com'
        			},
        			password: v => /^[a-z0-9_-]{8,18}$/.test(v) || 'Min 8 characters'
            	}
 			}
 		},
 		computed:{
 			user(){
 				return this.$root.$data.user
 			}
 		},
 		methods:{
 			imageChange(e){
 				this.file = e.target.files[0]
 				if (this.file) {
                	const reader = new FileReader()
                	reader.onload = (e) => {
                    	this.imgsrc = e.target.result
                	}
                	reader.readAsDataURL(this.file)
            	}
 			},
 			removeImage(){
 				this.file = null
 				this.imgsrc = "https://www.akcaotoaksesuar.com/yonetim/images/no-image.jpg"
 			},
 			signUp(){
 				auth.createUserWithEmailAndPassword(this.email, this.password)
 				.then(	() => {
 					this.updateProfile()
 				})
 				.catch(	(err) => {
 					this.err = err.message
 				})
 				if (this.file){
 					const uploadTask = storageImagesRef.child(this.file.name).put(this.file)
                	this.imgUrl = uploadTask.snapshot.ref.getDownloadURL()
 					}
 				else {
 					this.imgUrl = this.imgsrc
 				}
 				firebase.database().ref('users/' + this.$root.$data.user.uid).set({
 					photoURL: this.imgUrl,
 					surname: this.surname,
 					birthDate: this.birthDate,
 					country: this.country,
 					phone: this.phone
 				})
 				this.$router.replace('/')	
 				
 			},
 			updateProfile () {
       			auth.currentUser.updateProfile({
         		displayName: this.displayName,
         		email: this.email
      			})
    		}
 		}
	}
</script>

<style>
	#btn{
		position: fixed;
		right: 320px;
		top:570px;

	}	
	#image{
		margin-top: 20px;
		width: 155px;
		height: 155px;
	}
	#input {
    position: absolute;
    opacity: 0;
    outline: none;
    cursor: pointer;
    display: block;
  }
</style>