<template>
  <section class="container">
    <form @submit.prevent="submit">
      <h3>Add new candidate</h3>
      <fieldset class="form-group">
        <label for="candidateName">Candidate Name</label>
        <input id="candidateName" type="text" v-model="candidateName" class="form-control" placeholder="Candidate Name" :disabled="loading">
      </fieldset>
      <fieldset class="form-group">
        <button class="btn btn-dark btn-block" type="submit" :disabled="loading">Submit</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        candidateName: '',
        loading: false,
      };
    },
    methods: {
      ...mapActions({
        addCandidate: 'election/addCandidate',
      }),
      submit() {
        this.loading = true;
        this.addCandidate(this.candidateName).then(() => {
          this.candidateName = '';
          this.loading = false;
        });
      },
    },
  }
</script>
