<template>
  <section class="container">
    <form @submit.prevent="submit">
      <h3>Give access to vote</h3>
      <fieldset class="form-group">
        <label>Enter address</label>
        <input type="text" v-model="address" class="form-control" name="address" placeholder="Address">
      </fieldset>
      <!-- <fieldset class="form-group">
        <label>Select election</label>
        <select class="form-control field" v-model="selectedElection">
          <option :value="item.id" :key="item.id" v-for="item in items" class="form-control">
            {{item.name}}
          </option>
        </select>
      </fieldset> -->
      <fieldset class="form-group">
        <button type="submit" class="btn btn-dark btn-block">Submit</button>
      </fieldset>
    </form>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      selectedElection: '',
      address:''
    };
  },

  mounted() {
    this.loadVoters();
  },

  computed: {
    ...mapGetters({
      items: 'elections/items',
    }),
  },

  methods: {
    ...mapActions({
      grantAccess: 'election/grantAccess',
      loadVoters: 'election/loadVoters',
    }),
    submit() {
      this.grantAccess(this.address);
    },
  },
}

</script>
