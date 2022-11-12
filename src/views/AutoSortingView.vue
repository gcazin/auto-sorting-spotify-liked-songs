<template>
  <div class="mb-4">
    <template v-if="formattedData && formattedData.length > 0">
      <p class="fs-5 mt-4">If you want to sort your liked music again, you can click this button again to start the process.</p>
      <Login text="Refresh data" />
    </template>
    <template v-else>
      <p class="fs-5 mt-4">Ready to be done with manual sorting? Click on the button below to start automatic sorting !</p>
      <div class="mb-3 form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="randomizeTracks" :checked="randomizeTracks" :disabled="loading">
        <label class="form-check-label" for="flexSwitchCheckChecked">Randomize tracks?</label>
      </div>
      <div class="mb-3 form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="performSubmittingData" :checked="performSubmittingData" :disabled="loading">
        <label class="form-check-label" for="flexSwitchCheckChecked">Submitting data?</label>
      </div>
      <div class="text-center">
        <button class="btn btn-success btn-lg mt-4" @click="autoSortingLikedTracks" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Auto sorting
        </button>
      </div>
    </template>
  </div>
  <hr>
  <h4>Instructions</h4>
  <p>- Create a playlist with the name you want.</p>
  <p>
    - Put in description the music genres of the playlist (separated by a comma, ex: french hip hop, calm rap).
    You can retrieve the genres that appear most often in your playlists by submitting the form and unchecking the 'Submitting data',
    nothing will be added or modified in your playlists.
  </p>
  <p>- Click on the auto sorting button and tada!</p>

  <hr>
  <div class="row">
    <h1 class="mb-4" v-if="me && !('error' in me)">{{ me?.display_name }}'s dashboard</h1>
    <form v-if="formattedData && formattedData.length > 0">
      <div class="mb-3 form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="showGenres" :checked="showGenres" :disabled="loading">
        <label class="form-check-label" for="flexSwitchCheckChecked">Show styles retrieved</label>
      </div>
      <div class="mb-3 form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="showLikedTracks" :checked="showLikedTracks" :disabled="loading">
        <label class="form-check-label" for="flexSwitchCheckChecked">Show liked tracks</label>
      </div>
      <div class="mb-3 form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="showDebug" :checked="showDebug" :disabled="loading">
        <label class="form-check-label" for="flexSwitchCheckChecked">Show debug information's</label>
      </div>
    </form>
  </div>
  <div class="row">
    <div class="col text-white" v-show="showDebug">
      <div class="mb-4" v-if="infos.length > 0">
        <p v-html="info" v-for="info in infos">
        </p>
      </div>
    </div>
    <div class="col text-white" v-if="showLikedTracks">
      <div class="about">
        <ul class="list-group list-group-flush list-group-numbered  text-white" v-if="formattedData && formattedData.length">
          <template v-for="track in formattedData">
            <li class="list-group-item text-white" style="background: transparent"><span class="bold">
            {{ track.song }}</span>
              de <span class="bold">{{ track.artist.map((artist) => artist.name).join(',') }}</span>
              (<span class="bold">{{ track.genres.join(',') }}</span>)</li>
          </template>
        </ul>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div v-if="filteredGenres && filteredGenres.length > 0">
        <table class="table table-dark" v-if="filteredGenres.length > 0">
          <thead>
          <tr>
            <th scope="col">Description to put in your playlist</th>
            <th scope="col">Number of items</th>
            <th scope="col">Add to your playlist</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="genre in genresToAddInPlaylist">
            <td>[{{genre.genre}}]</td>
            <td>{{ genre.tracks.length }}</td>
            <td>
              <button @click="createUserPlaylist(genre.genre, genre.genres)" class="btn btn-outline-success fw-bold btn-sm">Add to spotify</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col text-white" v-if="showGenres">
      <table class="table table-dark" v-if="genres.length > 0">
        <thead>
        <tr>
          <th scope="col">Playlist name</th>
          <th scope="col">Description</th>
          <th scope="col">Number of items added</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="genre in genres.sort((a, b) => b.tracks.length - a.tracks.length)">
          <td>{{ genre.name }}</td>
          <td>[{{ genre.genre }}]</td>
          <td>{{ genre.tracks.length }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';

export default {
  name: 'AutoSortingView',
  components: { Login },
  data() {
    return {
      me: null,
      likedTracks: [],
      artists: [],
      genres: [],
      userPlaylists: [],
      formattedData: [],
      filteredGenres: [],
      genresToAddInPlaylist: [],
      infos: [],
      loading: false,

      // Form
      numberOfItems: 50,
      showGenres: true,
      showLikedTracks: false,
      showDebug: false,
      performSubmittingData: true,
      randomizeTracks: false,
    };
  },
  methods: {
    /**
     * Get credentials
     * Used to set the local storage token
     * @returns {Promise<unknown>}
     */
    getCredentials() {
      const { code } = this.$route.query;
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
      return new Promise((successCallback) => {
        fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          body: new URLSearchParams({
            code,
            grant_type: 'authorization_code',
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          }),
          headers: {
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`).toString()}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((response) => {
          response.json().then((data) => {
            successCallback(data);
          });
        });
      });
    },
    /**
     * Get user profile
     * @returns {Promise<*>}
     */
    async getProfile() {
      const response = await this.fetchService.get('me');
      const data = await response;
      return data;
    },
    /**
     * Get user playlists
     * @returns {Promise<*>}
     */
    async getUserPlaylists() {
      const response = await this.fetchService.get('me/playlists');
      const data = await response;
      return data;
    },
    /**
     * Get user playlist tracks
     * @param userPlaylist
     * @returns {Promise<FlatArray<*[], 1>[]>}
     */
    async getPlaylistTracks(userPlaylist) {
      const response = await this.fetchService
        .get(`playlists/${userPlaylist.id}/tracks?fields=items(track(name,uri)),total`);
      const data = await response;
      let playlistTracks = [];
      let offset = 0;
      for (let i = 0; i < Math.ceil(data.total / 100); i++) {
        const fetchNextTracks = await this.fetchService
          .get(`playlists/${userPlaylist.id}/tracks?fields=items(track(name,uri))&offset=${offset}`);
        const fetchNextTracksData = await fetchNextTracks;
        if (fetchNextTracksData.total < 100) {
          offset = fetchNextTracksData.total;
        } else {
          offset += 50;
        }
        playlistTracks.push(fetchNextTracksData);
      }
      playlistTracks = playlistTracks.map((playlistTrack) => playlistTrack.items).flat();
      return playlistTracks;
    },
    /**
     * Get user liked tracks
     * @returns {Promise<FlatArray<*[], 1>[]>}
     */
    async getLikedTracks() {
      const response = await this.fetchService
        .get(`me/tracks?=limit=${this.numberOfItems}`);
      const data = await response;
      let tracks = [];
      let offset = 0;
      for (let i = 0; i < Math.ceil(data.total / this.numberOfItems); i++) {
        const fetchNextTracks = await this.fetchService
          .get(`me/tracks?offset=${offset}&limit=${this.numberOfItems}`);
        const fetchNextTracksData = await fetchNextTracks;
        if (fetchNextTracksData.total < 50) {
          offset = fetchNextTracksData.total;
        } else {
          offset += 50;
        }
        tracks.push(fetchNextTracksData);
      }
      tracks = tracks.map((track) => track.items).flat();
      return tracks;
    },
    /**
     * Get user tracks style
     * @returns {Promise<unknown>}
     */
    async getGenres() {
      return new Promise(async (successCallback) => {
        const artists = [];
        for (const likedTrack of this.likedTracks) {
          for (const artist of likedTrack.track.artists) {
            const find = artists.find((a) => a.id === artist.id);
            if (!find) {
              artists.push({
                id: artist.id,
                data: [],
              });
            }

            let artistData;
            let findArtistData = artists.find((a) => a.id === artist.id).data;
            if (findArtistData.length === 0) {
              const fetchData = await this.fetchService
                .get(`artists/${artist.id}`);
              const data = await fetchData;
              findArtistData = data;
              artistData = findArtistData;
            } else {
              artistData = artists.find((a) => a.id === artist.id).data;
            }
            this.formattedData.push({
              id: likedTrack.track.id,
              song: likedTrack.track.name,
              uri: likedTrack.track.uri,
              genres: artistData.genres,
              artist: likedTrack.track.artists.map((artist) => ({
                name: artist.name,
                id: artist.id,
              })).flat(),
            });
          }
        }

        return successCallback();
      });
    },
    /**
     * Main function to sort the tracks
     */
    autoSortingLikedTracks() {
      this.loading = true;
      this.pushInfo('Get credentials...');
      // Get user credentials
      this.getCredentials().then(async (response) => {
        localStorage.setItem('token', response.access_token);
        this.pushInfo('Successfully connected!');
        this.pushInfo('Get profile...');

        // Get user profile
        this.getProfile().then((profile) => {
          this.me = profile;
          this.pushInfo('Profile successfully retrieved!');
          this.pushInfo(`Welcome ${this.me.display_name} !`);
          this.pushInfo('Get user playlists...');

          // Get user playlists
          this.getUserPlaylists().then((userPlaylists) => {
            // Format user playlists
            this.getFormattedUserPlaylists(userPlaylists);
            this.pushInfo('Your playlists has been successfully retrieved!');
            this.pushInfo('Get your liked tracks...');

            // Get user liked tracks
            this.getLikedTracks().then((likedTracks) => {
              this.likedTracks = likedTracks;
              this.pushInfo('Your liked tracks has been successfully retrieved!');
              this.pushInfo('Get styles of your liked tracks...');

              // Get user liked tracks style
              this.getGenres().then(() => {
                // And we finally send data to the Spotify API
                this.sendDataToSpotifyApi();
                this.loading = false;
              });
            });
          });
        });
      });
    },
    createUserPlaylist(title, description) {
      this.fetchService.post(`users/${this.me.id}/playlists`, {
        name: title,
        description: description.join(', '),
        public: false,
      }).then((response) => {
        console.log(response);
        console.log('playlist crée');
      });
    },
    /**
     * Format user playlists
     * @param userPlaylists
     */
    getFormattedUserPlaylists(userPlaylists) {
      this.userPlaylists = [...new Set(userPlaylists.items
        .filter((item) => item.description !== ''
          && item.description.startsWith('[')
          && item.description.endsWith(']'))
        .map((item) => ({
          id: item.id,
          description: item.description.toLowerCase(),
          name: item.name,
        })).flat())];
    },
    /**
     * Main function to send the data to the Spotify API
     */
    sendDataToSpotifyApi() {
      /* Genre de toutes les musiques likés */
      const genres = [...new Set(this.formattedData.map((data) => data.genres).flat())];

      let filterGenres = [];
      genres.forEach((genre) => {
        const explode = genre.split(' ');
        filterGenres.push(explode);
        filterGenres = filterGenres.flat();
      });
      this.genresToAddInPlaylist = filterGenres;

      let findFilteredGenre = [];
      genres.forEach((genre) => {
        const explode = genre.split(' ');
        explode.forEach((e) => {
          const findFilteredGenres = findFilteredGenre
            .find((filteredGenre) => filteredGenre.genre === e);
          if (findFilteredGenres) {
            findFilteredGenres.genres.push(genre);
          } else {
            findFilteredGenre.push({
              genre: e,
              genres: [],
              tracks: [],
            });
          }
        });
      });
      findFilteredGenre = findFilteredGenre.filter((filteredGenre) => filteredGenre.genres.length);
      this.formattedData.forEach((fd) => {
        fd.genres.forEach((fg) => {
          findFilteredGenre.forEach((t) => {
            if (fg.includes(t.genre)) {
              if (!t.tracks.includes(fd.id)) {
                t.tracks.push(fd.id);
              }
            }
          });
        });
      });
      this.genresToAddInPlaylist = findFilteredGenre
        .sort((a, b) => b.tracks.length - a.tracks.length)
        .slice(0, 10);

      console.log('test', this.genresToAddInPlaylist);

      let filteredGenres = [];
      const userPlaylists = this.userPlaylists.map((userPlaylist) => ({
        id: userPlaylist.id,
        name: userPlaylist.name,
        description: userPlaylist.description.replace(/[\\[\]']+/g, ''),
      }));
      userPlaylists.forEach((userPlaylist) => {
        genres.forEach((genre) => {
          if (genre.includes(userPlaylist.description)) {
            const findGenre = filteredGenres
              .find((filteredGenre) => filteredGenre.genre === userPlaylist.description);
            if (!findGenre) {
              filteredGenres.push({
                playlistId: userPlaylist.id,
                playlistName: userPlaylist.name,
                genre: userPlaylist.description,
                genres: [],
              });
            } else {
              findGenre.genres.push(genre);
            }
          }
        });
      });
      filteredGenres = filteredGenres.filter((filteredGenre) => filteredGenre.genres.length);
      this.filteredGenres = filteredGenres;
      const sortByGenre = [];
      filteredGenres.forEach((filteredGenre) => {
        sortByGenre.push({
          id: filteredGenre.playlistId,
          name: filteredGenre.playlistName,
          genre: filteredGenre.genre,
          tracks: [],
        });
        this.formattedData.forEach((g) => {
          if (g.genres.length > 0) {
            g.genres.forEach((t) => {
              const findTracks = sortByGenre
                .find((sortG) => sortG.genre === filteredGenre.genre).tracks;
              if (t.includes(filteredGenre.genre)) {
                if (!findTracks.find((ft) => ft.id === g.id)) {
                  findTracks.push(g);
                }
              }
            });
          }
        });
      });
      this.genres = sortByGenre;
      console.log(this.genres);
      this.pushInfo('Your tracks styles has been successfully retrieved!');
      this.userPlaylists.forEach((userPlaylist) => {
        const tracks = sortByGenre.find((sort) => sort.id === userPlaylist.id);

        if (tracks) {
          this.getPlaylistTracks(userPlaylist).then((playlistTracks) => {
            const checkInPlaylists = playlistTracks.map((check) => check.track.uri);

            const tracksToBeAdded = tracks.tracks
              .map((track) => track.uri)
              .filter((checkInPlaylist) => !checkInPlaylists.find((c) => checkInPlaylist === c));

            const chunks = [];
            const chunkSize = 100;
            for (let i = 0; i < tracksToBeAdded.length; i += chunkSize) {
              const chunk = tracksToBeAdded.slice(i, i + chunkSize);
              chunks.push(chunk);
            }
            if (this.performSubmittingData) {
              chunks.forEach((chunk) => {
                // eslint-disable-next-line max-len
                if (this.randomizeTracks) {
                  this.shuffleArray(chunk);
                }
                if (chunk.length > 0) {
                  this.pushInfo(`Push to your playlist ${userPlaylist.name}...`);
                  this.fetchService
                    .post(`playlists/${userPlaylist.id}/tracks?uris=${chunk.join(',')}`)
                    .then(() => {
                      this.pushInfo(`${chunk.length} has been added to the playlist ${userPlaylist.name}`);
                    });
                } else {
                  this.pushInfo('All the music has already been sorted, or already exists in the corresponding playlists, no action has been performed.');
                }
              });
            } else {
              this.pushInfo('No operations have been performed.');
            }
          });
        }
      });
    },
    /**
     * Push value to be displayed in debug terminal
     * @param value
     */
    pushInfo(value) {
      this.infos.push(`<span class="fw-bold">api@<span class="text-success">spotify</span>:~></span> ${value}`);
    },
    /**
     * Used in case of the user has checked the "randomize tracks" buttons
     * @param array
     */
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    },
  },
};
</script>
