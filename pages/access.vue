<template>
  <div>
    <h3>Give access to vote</h3>
    <section class="container">
      <form  @submit.prevent="submit">
        <div class="form-group access">
          <div>
            <p>Enter address</p>
            <input type="text" v-model="electionAddress" class="form-control input field" name="address" placeholder="Address">
          </div>
          <div class="access">
            <p>Select electin</p>
            <select class="form-control field" v-model="selectedElection">
              <option :value="item.id" :key="item.id" v-for="item in items" class="form-control">
                {{item.name}}
              </option>
            </select>
          </div>
        </div>
          <button type="submit" class="btn btn-dark">Submit</button>
      </form>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data () {
    return {
      selectedElection: '',
      electionAddress:''
    };
  },

  computed: {
    ...mapGetters({
      items:'elections/items',
      address: 'currentUser/address',
    }),
  },

  mounted() {

  },

  methods: {
    submit() {
      // this.vote(this.selectedCandidateId);
    },
  },
}

</script>
