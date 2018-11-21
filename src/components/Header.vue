<template>
	<div v-if='!!user'>
		<v-toolbar color='pink lighten-3' dark>
    		<v-toolbar-title class='ml-5'>SocialNetwork</v-toolbar-title>
    		<v-spacer></v-spacer>
    		<v-toolbar-items class="hidden-sm-and-down">
      			<v-btn to='/' flat>Profile</v-btn>
      			<v-btn flat>Groups</v-btn>
      			<v-btn @click='signOut' flat>Exit</v-btn>
    		</v-toolbar-items>
  		</v-toolbar>
	</div>
</template>

<script>
  import {auth} from '../firebase'
  export default {
    name: 'Header',
    data() {
  	 return {}
    },
    computed:{
      user(){
        return this.$root.$data.user
      }
    },
    methods:{
      signOut () {
        auth.signOut()
        this.$root.$data.user = auth.currentUser
        this.$router.replace("/login")
      }
    }
  }
</script>

<style>
  
</style>