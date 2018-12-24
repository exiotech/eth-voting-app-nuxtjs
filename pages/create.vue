<template>
  <form class="form body" @submit.prevent="submit">
    <div >
      <h3>Create a new election</h3>
        <label for="nomination_start">Nomination Period</label>
      <div class="form-group">
        <input type="text" v-model.number="form.nomination_start" class="form-control input" id="nomination_start" placeholder="Start">
      </div>
      <div class="form-group">
        <input type="text" v-model.number="form.nomination_end" class="form-control input" id="nomination_end" placeholder="End">
      </div>
        <label for="voting_start">Voting Period</label>
      <div class="form-group">
        <input class="form-control input" v-model.number="form.voting_start" type="text" id="voting_start" name="voting_start" placeholder="Start">
      </div>
      <div class="form-group">
        <input class="form-control input" v-model.number="form.voting_end" type="text" id="voting_end" name="voting_end" placeholder="End">
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-dark" type="submit">Create election</button>
      <nuxt-link class="btn btn-link" to="election" title="">Back</nuxt-link>
    </div>
  </form>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        form: {
          nomination_start: '',
          nomination_end: '',
          voting_start: '',
          voting_end: ''
        }
      };
    },
    methods: {
      submit() {
      axios.post('/create',this.form)
        .then(response => {
            console.log(this.form);
        });
      },
    },
  }
</script>