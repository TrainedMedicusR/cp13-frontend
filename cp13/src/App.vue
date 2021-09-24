<template>

  <div id="app">
    <header>
      <div class="header-inner">
        <div class="row align-items-center">
          <div class="col-3">
            <div class="header-left">
              <a role="button" @click="goHome" class="logo header-back"><v-icon name="smartphone"></v-icon>Survey Taker</a>
            </div>
          </div>
        </div>
      </div>

    </header>

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


</style>
