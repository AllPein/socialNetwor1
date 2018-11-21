<template>
	<div v-if='!!user'>
		<div v-for='(item, i) in items' :key='i'>
			<img :src="item.imgUrl" alt="">
		</div>
		<p>{{user.displayName}}</p>
		<p>{{user.email}}</p>
	</div>
</template>

<script>
import {auth, usersRef} from '../firebase'
import firebase from 'firebase'
export default {
  name: 'Profile',
  data() {
  	return {
  		items: [],
  		id:null
  	}
  },
  computed: {
  	user(){
  		return this.$root.$data.user
  	}
  },
  methods : {
  	signOut () {
      auth.signOut()
      this.$root.$data.user = auth.currentUser
      this.$router.replace("/login")
    }
  },
   created(){
   	const curUser = firebase.database().ref('users/' + this.user.uid)
   	curUser.on('value', (snapshot) =>{
   		let {birthDate, country, phone, surname, photoURL} = snapshot.val()
   		this.items.push({
   			imgUrl: photoURL, 
   			surname: surname,
   			phone: phone,
  			country: country,
  			birthDate: birthDate
   		})
   	})
   	console.log(this.items)
}

}
</script>
