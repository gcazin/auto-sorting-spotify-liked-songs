<template>
  <Container>
    <div class="max-w-3xl mx-auto py-32">
      <div class="py-3 px-2">
        <div class="mb-8 text-center">
          <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-3xl">
            Options selection
          </h2>
          <Text class="max-w-xl mx-auto">
            First check the options you want. They allow you to customize your experience as much as possible.
          </Text>
        </div>
        <ul class="grid w-full gap-5 md:grid-cols-1">
          <li>
            <input type="checkbox" id="react-option" value="" class="hidden peer" required="" v-model="randomizeTracks" :checked="randomizeTracks" >
            <label
              for="react-option"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-700 hover:border-white/50 rounded-lg cursor-pointer peer-checked:bg-primary/10 peer-checked:border-primary-dark hover:text-white peer-checked:text-primary-dark"
            >
              <div class="flex space-x-5">
                <ion-icon class="text-5xl text-primary" name="shuffle-outline"></ion-icon>
                <div>
                  <div class="w-full text-lg font-semibold">Randomize tracks</div>
                  <div class="w-full text-sm">Randomize your tracks when you add playlists</div>
                </div>
              </div>
            </label>
          </li>
          <li>
            <input type="checkbox" id="flowbite-option" value="" class="hidden peer" v-model="performCreatePlaylistAutomatically" :checked="performCreatePlaylistAutomatically" >
            <label
              for="flowbite-option"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-700 hover:border-white/50 rounded-lg cursor-pointer peer-checked:bg-primary/10 peer-checked:border-primary-dark hover:text-white peer-checked:text-primary-dark"
            >
              <div class="flex space-x-5">
                <ion-icon class="text-5xl text-primary" name="color-wand-outline"></ion-icon>
                <div>
                  <div class="w-full text-lg font-semibold">Create playlist automatically</div>
                  <div class="w-full text-sm">Vue.js is an model–view front end JavaScript framework.</div>
                </div>
              </div>
            </label>
          </li>
          <div class="relative z-0 w-full group flex items-center space-x-5" v-show="performCreatePlaylistAutomatically">
            <p class="w-11/12 text-white">Minimum of tracks present in the corresponding genre</p>
            <div class="w-1/12">
              <input
                v-model="minimumOfTracksToCreatePlaylistAutomatically"
                type="number"
                class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-blue-100 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer text-center"
                required
              />
            </div>
          </div>
          <li>
            <input type="checkbox" id="angular-option" value="" class="hidden peer" v-model="performSubmittingData" :checked="performSubmittingData">
            <label for="angular-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-700 hover:border-white/50 rounded-lg cursor-pointer peer-checked:bg-primary/10 peer-checked:border-primary-dark hover:text-white peer-checked:text-primary-dark">
              <div class="flex space-x-5">
                <ion-icon class="text-5xl text-primary" name="push-outline"></ion-icon>
                <div>
                  <div class="w-full text-lg font-semibold">Submit data</div>
                  <div class="w-full text-sm">A TypeScript-based web application framework.</div>
                </div>
              </div>
            </label>
          </li>
        </ul>
        <div class="flex justify-between items-center mt-5">
          <Button color="outline-secondary" size="xl" is-link to="home">
            Cancel
          </Button>
          <Text class="text-sm text-gray-300" v-if="checkIfLessThanOneOptionIsSelected">
            {{ numberOfOptionsSelected }} selected option<template v-if="numberOfOptionsSelected > 1">s</template>
          </Text>
          <Button color="primary" size="xl" @click="login()">
            Login with Spotify
          </Button>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '@/components/Container.vue';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import Text from '@/components/Text.vue';

export default {
  name: 'FormView',
  components: {
    Text,
    Button,
    Card,
    Container,
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
      minimumOfTracksToCreatePlaylistAutomatically: 100,
      randomizeTracks: false,
    };
  },
  computed: {
    checkIfLessThanOneOptionIsSelected() {
      return this.performSubmittingData
        || this.performCreatePlaylistAutomatically
        || this.randomizeTracks;
    },
    numberOfOptionsSelected() {
      let counter = 0;
      if (this.performSubmittingData) {
        counter += 1;
      }
      if (this.performCreatePlaylistAutomatically) {
        counter += 1;
      }
      if (this.randomizeTracks) {
        counter += 1;
      }
      return counter;
    },
  },
  methods: {
    login() {
      const redirectUri = new URL(
        'auto-sorting',
        window.location.href,
      );
      localStorage.setItem('redirect-uri', redirectUri.toString());

      const state = (Math.random() + 1).toString(36).substring(2);
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const scopes = [
        'user-read-private',
        'user-read-email',
        'user-library-read',
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
      ];

      const url = new URL('/authorize', 'https://accounts.spotify.com/');
      url.searchParams.append('response_type', 'code');
      url.searchParams.append('client_id', clientId);
      url.searchParams.append('scope', scopes.join(' '));
      url.searchParams.append('redirect_uri', redirectUri.toString());
      url.searchParams.append('state', state);

      localStorage.setItem('parameters', JSON.stringify({
        randomizeTracks: this.randomizeTracks,
        performCreatePlaylistAutomatically: this.performCreatePlaylistAutomatically,
        minimumOfTracksToCreatePlaylistAutomatically: this.minimumOfTracksToCreatePlaylistAutomatically,
        performSubmittingData: this.performSubmittingData,
      }));
      window.location.href = url.toString();
    },
  },
};
</script>

<style scoped>

</style>
