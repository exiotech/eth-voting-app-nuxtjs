<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="election" title="">Vote</nuxt-link>
          </li>
          <li class="nav-item" v-if="isCreator">
            <nuxt-link class="nav-link " to="add-candidate" title="">Add Candidate</nuxt-link>
          </li>
          <!-- <li class="nav-item">
            <nuxt-link class="nav-link " to="create" title="">Create election</nuxt-link>
          </li> -->
          <li class="nav-item" v-if="isCreator">
            <nuxt-link class="nav-link" to="access" title="">Add Voter</nuxt-link>
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
    this.loadChairPerson();
  },

  computed: {
    ...mapGetters({
      address: 'currentUser/address',
      chairperson: 'election/chairPerson'
    }),
    isCreator() {
      return this.chairperson === this.address;
    },
  },

  methods: {
    ...mapActions({
      loadChairPerson: 'election/loadChairPerson',
      loadVoterData: 'currentUser/loadVoterData',
    }),
    ...mapMutations({
      setAddress: 'currentUser/SET_ADDRESS',
    }),
    auth() {
      if (window.web3) {
        if (window.ethereum) {
          window.ethereum.enable();
        }
        setInterval(() => {
          const address = window.web3.eth.coinbase;
          if (address !== this.address) {
            this.setAddress(address);
          }
        }, 300);
      }
    },
  },
  watch: {
    address(to) {
      if (to) {
        this.loadVoterData();
      }
    }
  },
};
</script>

<style lang="scss">
  @import 'assets/style.scss';
</style>
