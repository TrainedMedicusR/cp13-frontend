<template>

  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" role="button" @click="goHome">
        <img src="./assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        <span>SurveyTaker</span>
      </a>
    </nav>

    <modal id="allError" v-if="showAllError !== ''" @close="showAllError === ''">
      <h3 slot="header">Error!</h3>
      <div slot="body">
        <p>{{showAllError}}</p>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-primary" @click="close">
          Close
        </button>
      </div>
    </modal>

    <router-view/>
    <hr>

    <footer class="footer">
      <div class="text-center footer-text">© 2021 Copyright -
        <a role="button" @click="goHome">ChaiLab Survey</a> - SOFT3888 Group XXX
      </div>
    </footer>
  </div>
</template>


<script>
import modal from './components/Modal.vue';

export default {
  name: 'App',
  components: {
    modal,
  },
  data(){
    return{
      inputSearch: null,
      loginTab: true,
      regTab:false,
      showAllError: '',
      // loginTab: true,
      // regTab:false,
      // showModalLogin: false,
      host:location.hostname
    }
  },
  computed:{
  },
  methods: {
    goHome(){
      this.$router.push({path: '/'}).catch(err => {});
    },
    close() {
      this.showAllError="";
      this.$emit('close');
    }
  }
}


</script>

<style>
.navbar-brand img{
  display: inline-block;
}

nav {
  padding-left: 20px;
}

.navbar-brand span {
  padding-left: 5px;
}
</style>
