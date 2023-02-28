<template>
  <section class="col-10 m-auto mt-5">
    <h1 class="text-white text-center">
      Let the <span class="text-success">automatic sorting</span> of your music by genre begin !
    </h1>
    <div class="my-5">
      <p>
        This small utility allows you to retrieve your latest favorite music,
        extract the genre and categorize them in the right playlists
      </p>
      <p>Click on the <span class="fw-bold">Auto sorting</span> button to get started!</p>
    </div>
    <div class="container-fluid">
      <div class="row no-gutters">
        <div class="col bg-success text-white p-3 rounded-start">
          <p class="h5 fw-bold mb-4">Instructions</p>
          <p>
            <span class="rounded-circle border px-2 d-inline">1</span>
            <span class="fw-bold">Create a playlist</span> with the name you want on Spotify.
          </p>
          <p>
            <span class="rounded-circle border px-2">2</span>
            Put in <span class="fw-bold">description</span> the music genres of the playlist (ex: [rap]).
            You can retrieve the genres that appear most often in your playlists by submitting the form and unchecking the 'Submitting data',
            nothing will be added or modified in your playlists.</p>
          <p>
            <span class="rounded-circle border px-2">3</span>
            Click on the <span class="fw-bold">auto sorting button</span> and tada!
          </p>
        </div>
        <div
          class="col-12 col-lg-8 text-white d-flex flex-column p-3 rounded-end"
          style="background: #1e1e1e"
        >
          <p class="fw-bold">Let's verify this options !</p>
          <div class="mb-3 form-check">
            <input class="form-check-input" type="checkbox" id="randomizeTracks" v-model="randomizeTracks" :checked="randomizeTracks" :disabled="loading">
            <label class="form-check-label" for="randomizeTracks">Randomize tracks ?</label>
          </div>
          <div class="mb-3 form-check">
            <input class="form-check-input" type="checkbox" id="performCreatePlaylistAutomatically" v-model="performCreatePlaylistAutomatically" :checked="performCreatePlaylistAutomatically" :disabled="loading">
            <label class="form-check-label" for="performCreatePlaylistAutomatically">Create playlist automatically ?</label>
          </div>
          <div class="mb-3" v-show="performCreatePlaylistAutomatically">
            <label class="form-label" for="performCreatePlaylistAutomatically">Minimum of tracks present in the corresponding genre</label>
            <input class="form-control bg-dark text-white" type="number" id="performCreatePlaylistAutomatically" v-model="minimumOfTracksToCreatePlaylistAutomatically" :checked="minimumOfTracksToCreatePlaylistAutomatically" :disabled="loading">
          </div>
          <div class="mb-3 form-check">
            <input class="form-check-input" type="checkbox" id="performSubmittingData" v-model="performSubmittingData" :checked="performSubmittingData" :disabled="loading">
            <label class="form-check-label" for="performSubmittingData">Submitting data ?</label>
          </div>
          <div>
            <Login text="Auto sorting"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Login from '@/components/Login.vue';
import Card from '@/components/Card.vue';

export default {
  components: {
    Login,
    Card,
  },
  data() {
    return {
      // Form
      numberOfItems: 50,
      showGenres: true,
      showLikedTracks: false,
      showDebug: true,
      performSubmittingData: true,
      performCreatePlaylistAutomatically: false,
      minimumOfTracksToCreatePlaylistAutomatically: 25,
      randomizeTracks: false,
    };
  },
};
</script>
