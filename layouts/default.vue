<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <nuxt-link class="nav-link" to="election" title="">Vote</nuxt-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <nuxt-link class="nav-link " to="create" title="">Create election</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link " to="#" title="">Give access to vote</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <main role="main" class="container">
      <div class="jumbotron">
        <nuxt/>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  mounted() {
    this.auth();
  },

  computed: {
    ...mapGetters({
      address: 'currentUser/address',
    }),
  },

  methods: {
    ...mapMutations({
      setAddress: 'currentUser/SET_ADDRESS',
    }),
    auth() {
      if (window.web3) {
        if (window.ethereum) {
          window.ethereum.enable();
        }
        setTimeout(() => {
          const address = window.web3.eth.coinbase;
          if (address !== this.address) {
            this.setAddress(address);
          }
        }, 300);
      }
    },
  },
};
</script>

<style lang="scss">
  @import 'assets/style.scss';
</style>
