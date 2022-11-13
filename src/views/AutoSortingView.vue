<template>
  <div class="mb-4">
    <template v-if="formattedData && formattedData.length > 0">
      <Card>
        <p class="fs-5">If you want to sort your liked music again, you can click this button again to start the process.</p>
      </Card>
      <Login text="Refresh data" />
    </template>
    <template v-else>
      <Card>
        <p class="fs-5">Ready to be done with manual sorting? Click on the button below to start automatic sorting !</p>
        <div class="mb-3 form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="randomizeTracks" :checked="randomizeTracks" :disabled="loading">
          <label class="form-check-label" for="flexSwitchCheckChecked">Randomize tracks?</label>
        </div>
        <div class="mb-3 form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="performSubmittingData" :checked="performSubmittingData" :disabled="loading">
          <label class="form-check-label" for="flexSwitchCheckChecked">Submitting data?</label>
        </div>
      </Card>
      <div class="text-center">
        <button class="btn btn-success btn-lg" @click="autoSortingLikedTracks" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Auto sorting
        </button>
      </div>
    </template>
  </div>

  <!-- Options card -->
  <Card title="Options" v-if="infos.length > 0">
    <div class="form-check form-switch form-check-inline">
      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="showGenres" :checked="showGenres" :disabled="loading">
      <label class="form-check-label" for="flexSwitchCheckChecked">Show styles retrieved</label>
    </div>
    <div class="form-check form-switch form-check-inline">
      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="showLikedTracks" :checked="showLikedTracks" :disabled="loading">
      <label class="form-check-label" for="flexSwitchCheckChecked">Show liked tracks</label>
    </div>
    <div class="form-check form-switch form-check-inline">
      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="showDebug" :checked="showDebug" :disabled="loading">
      <label class="form-check-label" for="flexSwitchCheckChecked">Show debug information's</label>
    </div>
  </Card>

  <!-- Debug information card -->
  <Card v-if="showDebug && infos.length > 0">
    <p class="text-white" v-html="info" v-for="info in infos"></p>
  </Card>

  <!-- Dashboard -->
  <!-- Statistics -->
  <div class="row" v-if="me && 'display_name' in me">
    <h3 class="text-white mb-4 text-uppercase">{{ me?.display_name }}'s dashboard</h3>
    <div class="container">
      <div class="row">
        <div class="col">
          <Card title="Number of tracks" icon-name="musical-notes-outline">
            {{ formattedData.length }}
          </Card>
        </div>
        <div class="col" v-if="genres.length">
          <Card title="Number of playlists" icon-name="library-outline" v-if="genres.length">
            {{ genres.length }}
          </Card>
        </div>
      </div>
    </div>
  </div>

  <!-- Liked tracks card -->
  <div class="row" v-if="formattedData.length && genres.length && filteredGenres.length">
    <div class="col" v-if="showLikedTracks">
      <Card title="Liked tracks">
        <div class="about">
          <ul class="list-group list-group-flush list-group-numbered  text-white">
            <template v-for="track in formattedData">
              <li class="list-group-item text-white" style="background: transparent"><span class="bold">
            {{ track.song }}</span>
                de <span class="bold">{{ track.artist.map((artist) => artist.name).join(',') }}</span>
                (<span class="bold">{{ track.genres.join(',') }}</span>)</li>
            </template>
          </ul>
        </div>
      </Card>
    </div>
  </div>

  <!-- Filtered genres card -->
  <Card title="Filtered genres" v-if="genresToAddInPlaylist.length">
    <table class="table text-white table-borderless">
      <thead>
      <tr>
        <th class="text-uppercase" scope="col">Description shortcode</th>
        <th class="text-uppercase text-end" scope="row">Number of items</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="genre in genresToAddInPlaylist">
        <td class="text-uppercase">
          [{{genre.genre}}]
          <span class="badge rounded-pill bg-dark" data-bs-toggle="modal" :data-bs-target="`#${genre.genre}`">
            <ion-icon name="information-circle-outline"></ion-icon>
          </span>
        </td>
        <td class="text-end"><span class="badge rounded-pill bg-dark">{{ genre.tracks.length }}</span></td>
        <td class="text-end">
          <template v-if="!genres.map((g) => g.description).find((g) => g === genre.genre)">
            <button @click="createUserPlaylist(genre.genre)" class="btn btn-outline-success fw-bold btn-sm">Add to spotify</button>
          </template>
          <template v-else>
            <button disabled class="btn btn-outline-secondary fw-bold btn-sm">
              Already existing.
            </button>
          </template>
        </td>

        <Modal :id="genre.genre" :title="`Associated genres to ${genre.genre}`">
          {{ genre.genres.join(', ') }}
        </Modal>
      </tr>
      </tbody>
    </table>
  </Card>

  <!-- Playlists found -->
  <Card title="Founded playlists" v-if="formattedData.length && genres.length && filteredGenres.length">
    <table class="table table-borderless text-white">
      <thead>
      <tr>
        <th scope="col"></th>
        <th class="text-uppercase" scope="col">Playlist name</th>
        <th class="text-uppercase" scope="col">Description</th>
        <th class="text-uppercase" scope="col">Number of items added</th>
      </tr>
      </thead>
      <tbody>
      <tr
        style="vertical-align: middle"
        v-for="genre in genres.sort((a, b) => b.tracks.length - a.tracks.length)"
      >
        <td>
          <template v-if="genre.image">
            <a :href="genre.uri" class="text-decoration-none">
              <img :src="genre.image" class="rounded" height="50" :alt="`${genre.name}'s cover`">
              +
            </a>
          </template>
          <template v-else>
            <span class="text-muted">No cover available</span>
          </template>
        </td>
        <td><a :href="genre.uri" class="text-success text-decoration-none fw-bold">{{ genre.name }}</a></td>
        <td>[{{ genre.genre }}]</td>
        <td>
          <span
            class="badge rounded-pill bg-success"
            v-if="'numberOfItemsAdded' in userPlaylists.find((userPlaylist) => userPlaylist.description === `[${genre.genre}]`)"
          >
              {{ userPlaylists.find((userPlaylist) => userPlaylist.description === `[${genre.genre}]`).numberOfItemsAdded }}
          </span>
          <span class="badge rounded-pill bg-dark" v-else>
              0
            </span>
        </td>
      </tr>
      </tbody>
    </table>
  </Card>
</template>

<script>
import Login from '@/components/Login.vue';
import Card from '@/components/Card.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'AutoSortingView',
  components: { Modal, Card, Login },
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
      showDebug: true,
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
            if (this.formattedData.findIndex((fd) => fd.id === likedTrack.track.id) === -1) {
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
              if (this.likedTracks.length > 0) {
                this.pushInfo(`Your liked tracks has been successfully retrieved, ${this.likedTracks.length} found !`);
                this.pushInfo('Get styles of your liked tracks...');

                // Get user liked tracks style
                this.getGenres().then(() => {
                  // And we finally send data to the Spotify API
                  this.sendDataToSpotifyApi();
                  this.loading = false;
                });
              } else {
                this.pushInfo('No tracks liked found, try to add your first liked song.');
                this.loading = false;
              }
            });
          });
        });
      });
    },
    /**
     * Create a user playlist
     * @param title
     */
    createUserPlaylist(title) {
      this.fetchService.post(`users/${this.me.id}/playlists`, {
        name: `${title} - Auto-generated by autosort-spotify-liked-songs`,
        description: `[${title}]`,
        public: false,
      }).then(() => {
        this.pushInfo('The playlist has been correctly created');
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
          ...(item.images.length > 0 ? {
            image: item.images.length === 1
              ? item.images.map((image) => image.url)[0]
              : item.images.find((image) => image.height === 300).url,
            uri: item.external_urls.spotify,
          } : null),
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

      const findFilteredGenre = [];
      genres.forEach((genre) => {
        const explode = genre.split(' ');
        explode.forEach((e) => {
          if (!findFilteredGenre.find((filteredGenre) => filteredGenre.genre === e)) {
            findFilteredGenre.push({
              genre: e,
              genres: [],
              tracks: [],
            });
          }
          const findFilteredGenres = findFilteredGenre.find((filteredGenre) => filteredGenre.genre === e);
          if (findFilteredGenres) {
            findFilteredGenres.genres.push(genre);
          }
        });
      });
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

      let filteredGenres = [];
      const userPlaylists = this.userPlaylists.map((userPlaylist) => ({
        ...userPlaylist,
        description: userPlaylist.description.replace(/[\\[\]']+/g, ''),
      }));
      userPlaylists.forEach((userPlaylist) => {
        genres.forEach((genre) => {
          if (genre.includes(userPlaylist.description)) {
            const findGenre = filteredGenres
              .find((filteredGenre) => filteredGenre.genre === userPlaylist.description);
            if (!findGenre) {
              filteredGenres.push({
                ...userPlaylist,
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
          ...filteredGenre,
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
      if (this.genres.length > 0) {
        this.pushInfo(
          `Your playlists with valid description has been successfully retrieved,
        ${this.genres.length} found !`,
        );
      } else {
        this.pushInfo(
          `No playlists found.
          Try to add your your first playlist by adding [${this.genresToAddInPlaylist[0].genre}] for example`,
        );
      }
      let counter = 0;
      const doneMessage = () => {
        counter += 1;
        if (userPlaylists.length === counter) {
          this.pushInfo('All operations has been performed.');
        }
      };
      this.userPlaylists.forEach((userPlaylist) => {
        const tracks = sortByGenre.find((sort) => sort.id === userPlaylist.id);

        if (tracks) {
          this.getPlaylistTracks(userPlaylist).then((playlistTracks) => {
            const checkInPlaylists = [...new Set(playlistTracks.map((check) => check.track.uri))];

            const tracksToBeAdded = [...new Set(tracks.tracks
              .map((track) => track.uri))]
              .filter((checkInPlaylist) => !checkInPlaylists.find((c) => checkInPlaylist === c));

            if (this.performSubmittingData) {
              if (tracksToBeAdded.length > 0) {
                userPlaylist.numberOfItemsAdded = tracksToBeAdded.length;
                this.pushInfo(`${tracksToBeAdded.length} tracks are be sending to your playlist ${userPlaylist.name}...`);
                const chunks = [];
                const chunkSize = 100;
                for (let i = 0; i < tracksToBeAdded.length; i += chunkSize) {
                  const chunk = tracksToBeAdded.slice(i, i + chunkSize);
                  chunks.push(chunk);
                }
                if (chunks.length > 1) {
                  this.pushInfo(
                    `Only 100 tracks can be added at the same time,
                    so ${chunks.length} sets of tracks are waiting to be pushed to your playlist ${userPlaylist.name}...`,
                  );
                }
                chunks.forEach((chunk) => {
                  // eslint-disable-next-line max-len
                  if (this.randomizeTracks) {
                    this.pushInfo(`Randomize ${chunk.length} tracks...`);
                    this.shuffleArray(chunk);
                  }
                  if (chunk.length > 0) {
                    this.pushInfo(`Push to your playlist ${userPlaylist.name}...`);
                    this.fetchService
                      .post(`playlists/${userPlaylist.id}/tracks?uris=${chunk.join(',')}`)
                      .then(() => {
                        this.pushInfo(`${chunk.length} tracks has correctly be added to your playlist ${userPlaylist.name} !`);
                      });
                  } else {
                    this.pushInfo('All the music has already been sorted, '
                      + 'or already exists in the corresponding playlists, '
                      + 'no action has been performed.');
                  }
                  doneMessage();
                });
              } else {
                doneMessage();
              }
            } else {
              this.pushInfo(`No operations have been performed on your playlist ${userPlaylist.name}`);
              doneMessage();
            }
          });
        } else {
          this.pushInfo('All the music has already been sorted, or already exists in the corresponding playlists, no action has been performed.');
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
