<template>
  <template v-if="!checkIsDataIsLoaded">
    <!-- Debug information card -->
    <section class="col-10 m-auto">
      <template v-if="showFetchError">
        <h1 class="fw-normal my-4 text-danger">
          Spotify connection error
        </h1>
        <p class="text-white">The most likely error is that the connection has expired.</p>
        <p class="text-white">Please return to the home page.</p>
        <Button is-link to="home">Return to home</Button>
      </template>
      <template v-else>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader class="mt-5 mb-3" :text="progressInfo" />
          <!--          <div class="mx-auto text-center">
                      <Button size="sm" outline @click="showDebug = !showDebug" class="mb-2">
                        show debug ?
                      </Button>
                    </div>
                    <Card v-if="debugInfos.length > 0 && showDebug">
                      <div class="text-muted mb-4">
                        <p>Welcome to auto-sorting-spotify-liked-songs-program !</p>
                        <p>If you have any questions, send a message at czn.guillaume[at]gmail[dot].com.</p>
                      </div>
                      <p v-for="info in debugInfos" class="text-white" v-html="info.toLowerCase()"></p>
                    </Card>-->
        </div>
      </template>
    </section>
  </template>
  <template v-else>
    <Container>
      <Teleport to="#menu">
        <div class="text-sm font-medium text-center text-gray-500 border-t border-gray-700 dark:text-gray-400 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px">
            <MenuItem
              v-for="(sidebarTab, index) in sidebarTabs"
              :key="index"
              :text="sidebarTab.title"
              @click="selectMenu(sidebarTab.title.toLowerCase())"
              :active="selectedCard === sidebarTab.title.toLowerCase()"
            />
          </ul>
        </div>
      </Teleport>

      <div class="mt-4">
        <Card>
          <div class="flex space-x-8">
            <div class="flex items-center">
              <img class="rounded-full h-20" v-if="me.images" :src="me.images[0].url" />
            </div>
            <div class="flex flex-col justify-center">
              <Text>Welcome,</Text>
              <p class="text-2xl text-primary">
                {{ me.display_name }}
                <!--                <span
                                  v-show="me.product === 'premium'"
                                  class="bg-yellow-700 text-yellow-300 align-middle text-xs font-medium px-1 py-0.5 rounded-full">
                                  Premium
                                </span>-->
              </p>
              <div class="flex items-center space-x-4 text-sm mt-4">
                <Text class="text-sm mt-0">Selected options :</Text>
                <div class="flex items-center space-x-4 text-white">
                  <p v-if="randomizeTracks">
                    <ion-icon class="align-middle text-primary" name="checkmark-done-outline"></ion-icon>
                    Randomize tracks
                  </p>
                  <p v-if="performCreatePlaylistAutomatically">
                    <ion-icon class="align-middle text-primary" name="checkmark-done-outline"></ion-icon>
                    Create playlist automatically
                  </p>
                  <p v-if="performSubmittingData">
                    <ion-icon class="align-middle text-primary" name="checkmark-done-outline"></ion-icon>
                    Submit data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div class="mt-4">
        <!-- Dashboard -->
        <!-- Statistics -->
        <div v-if="me">
          <div class="flex space-x-4 mb-4">
            <div class="flex-1">
              <Card title=" Number of tracks" icon-name="musical-notes-outline">
                {{ formattedLikedTracks.length }}
              </Card>
            </div>
            <div class="flex-1">
              <Card
                v-if="genres.length"
                icon-name="library-outline"
                title=" Number of playlists"
              >
                {{ genres.length }}
              </Card>
            </div>
            <div class="flex-1">
              <Card
                title=" Genres"
                icon-name="albums-outline"
              >
                {{ genresToAddInPlaylist.length }}
              </Card>
            </div>
          </div>
        </div>

        <!-- tabs begin -->
        <!-- Filtered genres card -->
        <Card
          has-pagination
          v-if="selectedCard === 'genres'"
          title="Genres"
        >
          <template #pagination>
            <Pagination
              :per-page="10"
              name="genres"
              :data="genresToAddInPlaylist"
              @data="setDataFromPagination"
            />
          </template>
          <div class="pt-4">
            <div class="relative">
              <input type="text" id="small_outlined" class="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="small_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Small outlined</label>
            </div>
          </div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
            <tr>
              <th scope="col" class="py-4">Name</th>
              <th scope="col" class="text-right py-4">
                Number of associated musics
              </th>
              <th scope="col" class="text-right py-4"></th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-base" v-for="(genre, index) in getPaginationData('genres')" :key="index">
              <td class="uppercase text-white pb-4">
                {{ genre.genre }}
                <span
                  v-if="genre.genres.length !== 0"
                  class="badge rounded-pill bg-dark"
                  data-bs-toggle="modal"
                  :data-bs-target="`#${genre.genre}`"
                >
<!--                    <ion-icon name="information-circle-outline"></ion-icon>-->
                  </span>
              </td>
              <td class="text-end pb-4">
                  <span
                    class="badge rounded-pill"
                    data-bs-toggle="modal"
                    :data-bs-target="`#tracks-${genre.genre}`"
                  >
<!--                    <ion-icon name="information-circle-outline"></ion-icon>-->
                    <span class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full bg-green-900 text-green-300">
                      {{ genre.tracks.length }}
                    </span>

                  </span>
              </td>
              <td class="space-x-1 flex justify-end items-center pb-4">
                <template
                  v-if="!findPlaylistWithDescription(genre.genre)"
                >
                  <Button
                    @click="createUserPlaylist(genre.genre)"
                    size="sm"
                    color="primary"
                    icon="add"
                  >
                    Add to spotify
                  </Button>
                </template>
                <Dropdown />
              </td>

              <!--              &lt;!&ndash; Associated genres to main genre &ndash;&gt;
                            <Modal
                              v-if="genre.genres.length !== 0"
                              :id="genre.genre"
                              :title="`Associated genres to ${genre.genre}`"
                            >
                              {{ genre.genres.join(', ') }}
                            </Modal>
                            &lt;!&ndash; Tracks inside this genres &ndash;&gt;
                            <Modal
                              v-show="genre.tracks.length !== 0"
                              :id="`tracks-${genre.genre}`"
                              :title="`Associated tracks to ${genre.genre}`"
                            >
                              <div v-for="(track, index) in genre.tracks" :key="index">
                                {{ getTrackSongFromAssociatedGenres(track) }}
                                ({{ getTrackArtistsFromAssociatedGenres(track) }})
                              </div>
                            </Modal>-->
            </tr>
            </tbody>
          </table>
        </Card>

        <!-- Playlists found -->
        <Card
          has-pagination
          v-if="selectedCard === 'playlists'"
          title="Playlists"
        >
          <template #pagination>
            <Pagination
              name="playlists"
              :data="genres"
              @data="setDataFromPagination"
            />
          </template>
          <div class="table-responsive">
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
                v-for="(genre, index) in getPaginationData('playlists')"
                :key="index"
              >
                <td>
                  <template v-if="genre.image">
                    <a :href="genre.uri" class="text-decoration-none">
                      <img :src="genre.image" height="50" :alt="`${genre.name}'s cover`">
                    </a>
                  </template>
                  <template v-else>
                    <span class="text-muted">No cover available</span>
                  </template>
                </td>
                <td>
                  <a :href="genre.uri" class="text-success text-decoration-none fw-bold">
                    {{ genre.name }}
                  </a>
                </td>
                <td>[{{ genre.genre }}]</td>
                <td>
          <span
            v-if="'numberOfItemsAdded' in findPlaylistWithDescription(genre.genre)"
            class="badge rounded-pill bg-success"
          >
              {{ findPlaylistWithDescription(genre.genre).numberOfItemsAdded }}
          </span>
                  <span class="badge rounded-pill bg-dark" v-else>
              0
            </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <!-- Artists card -->
        <div
          v-if="selectedCard === 'artists'"
          class="row"
        >
          <div class="col">
            <Card has-pagination title="Artists">
              <template #pagination>
                <Pagination
                  :per-page="10"
                  name="artists"
                  :data="artistsToAddInPlaylist"
                  @data="setDataFromPagination"
                />
              </template>
              <div class="table-responsive">
                <table class="table text-white table-borderless">
                  <thead>
                  <tr>
                    <th scope="col"></th>
                    <th class="text-uppercase" scope="row">Artist name</th>
                    <th class="text-uppercase" scope="row">Nb of tracks</th>
                    <th scope="col"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    style="vertical-align: middle;"
                    v-for="(artist, index) in getPaginationData('artists')"
                    :key="index">
                    <td>
                      <a target="_blank" :href="artist.external_urls.spotify">
                        <img
                          v-if="artist.images.length"
                          height="80"
                          :src="artist.images.slice(-1)[0].url"
                          :alt="artist.name"
                        >
                      </a>
                    </td>
                    <td class="text-uppercase d-flex flex-column">
                      <a
                        class="text-decoration-none text-success fw-bold"
                        :href="artist.external_urls.spotify"
                      >
                        {{ artist.name }}
                      </a>
                    </td>
                    <td>
                      {{ artist.tracks.length }}
                    </td>
                    <td class="text-end">
                      <template
                        v-if="!findPlaylistWithDescription(artist.name.toLowerCase())"
                      >
                        <Button
                          @click="createUserPlaylist(artist.name, 'artists')"
                          size="sm"
                          outline
                          borderless
                        >
                          Add to spotify
                        </Button>
                      </template>
                      <template v-else>
                        <Button color="light" size="sm" borderless outline disabled>
                          Already existing
                        </Button>
                      </template>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

        <!-- Liked tracks card -->
        <div
          v-if="selectedCard === 'tracks'"
          class="row"
        >
          <div class="col">
            <Card has-pagination title="Liked tracks">
              <template #pagination>
                <Pagination
                  :per-page="10"
                  name="likedTracks"
                  :data="formattedLikedTracks"
                  @data="setDataFromPagination"
                />
              </template>
              <div class="table-responsive">
                <table class="table text-white table-borderless">
                  <thead>
                  <tr>
                    <th class="text-uppercase" scope="col">Song name</th>
                    <th class="text-uppercase" scope="col">Artists</th>
                    <th class="text-uppercase" scope="row">Genres</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(track, index) in getPaginationData('likedTracks')" :key="index">
                    <td class="text-uppercase d-flex flex-column">
                      <a
                        class="text-decoration-none text-success fw-bold"
                        :href="track.external_url"
                      >
                        {{ track.song }}
                      </a>
                      <a
                        :href="track.album.uri"
                        class="block fs-6 text-muted"
                      >
                        {{ track.album.name }}
                      </a>
                    </td>
                    <td>
                      <a
                        class="text-decoration-none text-success fw-bold"
                        v-for="(artist, index) in track.artist"
                        :key="index"
                        :href="artist.uri">
                        {{ artist.name }}
                        <br>
                      </a>
                    </td>
                    <td>{{ track.genres.join(', ')}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

        <!-- Debug information card -->
        <Card v-if="selectedCard === 'debug' && debugInfos.length > 0">
          <p
            v-for="(info, index) in debugInfos"
            :key="index"
            class="text-white"
            v-html="info.toLowerCase()"
          ></p>
        </Card>

        <!-- end tabs -->
      </div>
    </Container>
  </template>
</template>

<script>
import Login from '@/components/Login.vue';
import Card from '@/components/Card.vue';
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';
import Pagination from '@/components/Pagination.vue';
import Loader from '@/components/Loader.vue';
import MenuItem from '@/components/MenuItem.vue';
import Container from '@/components/Container.vue';
import Text from '@/components/Text.vue';
import Dropdown from "@/components/Dropdown.vue";

export default {
  name: 'AutoSortingView',
  components: {
    Dropdown,
    Text,
    Container,
    MenuItem,
    Loader,
    Pagination,
    Button,
    Modal,
    Card,
    Login,
  },
  data() {
    return {
      // Profile
      me: null,
      userPlaylists: [],
      // Liked tracks
      likedTracks: [],
      formattedLikedTracks: [],
      // Genres
      genres: [],
      filteredGenres: [],
      genresToAddInPlaylist: [],
      // Artists
      artistsFromLikedTracks: [],
      artistsToAddInPlaylist: [],
      // State
      loading: false,
      // Debug
      debugInfos: [],
      consoleUsername: null,
      progressInfo: null,
      // Form
      numberOfItems: 50,
      showDebug: false,
      showFetchError: false,
      // Form from HomeView
      randomizeTracks: null,
      performCreatePlaylistAutomatically: null,
      minimumOfTracksToCreatePlaylistAutomatically: null,
      performSubmittingData: null,
      // View
      selectedCard: 'genres',
      sidebarTabs: [
        {
          icon: 'library',
          title: 'Genres',
        },
        {
          icon: 'albums',
          title: 'Playlists',
        },
        {
          icon: 'people',
          title: 'Artists',
        },
        {
          icon: 'musical-notes',
          title: 'Tracks',
        },
        {
          icon: 'bug',
          title: 'Debug',
        },
      ],
      // Pagination
      pagination: [
        {
          name: 'genres',
          data: null,
        },
        {
          name: 'likedTracks',
          data: null,
        },
        {
          name: 'playlists',
          data: null,
        },
        {
          name: 'artists',
          data: null,
        },
      ],
    };
  },

  computed: {
    checkIsDataIsLoaded() {
      return this.formattedLikedTracks.length
        && this.genres.length
        && this.genresToAddInPlaylist.length
        && this.likedTracks.length;
    },
  },

  mounted() {
    const parameters = JSON.parse(localStorage.getItem('parameters'));
    this.performSubmittingData = parameters.performSubmittingData;
    this.randomizeTracks = parameters.randomizeTracks;
    this.performCreatePlaylistAutomatically = parameters.performCreatePlaylistAutomatically;
    this.minimumOfTracksToCreatePlaylistAutomatically = parameters.minimumOfTracksToCreatePlaylistAutomatically;
    this.autoSortingLikedTracks();
  },

  methods: {
    /** ======================
     * AUTH
     ** ===================* */
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
          if (response.ok) {
            response.json().then((data) => {
              successCallback(data);
            });
          } else {
            this.showFetchError = true;
          }
        });
      });
    },
    /**
     * Get user profile
     * @returns {Promise<*>}
     */
    async getProfile() {
      const response = await this.fetchService.get('me');
      return await response;
    },

    /** ======================
     * PLAYLISTS
     ** ===================* */
    /**
     * Get user playlists
     * @returns {Promise<*>}
     */
    async getUserPlaylists() {
      const response = await this.fetchService.get('me/playlists');
      return await response;
    },
    /**
     * Get user playlist tracks
     * @param userPlaylist
     * @returns {Promise<FlatArray<*[], 1>[]>}
     */
    async getPlaylistTracks(userPlaylist) {
      const response = await this.fetchService
        .get(`playlists/${userPlaylist.id}/tracks?limit=50`);
      let playlistTracks = [];
      playlistTracks.push(response.items);
      if (response.next) {
        let nextUrl = response.next;
        let hasFetchedAllTracks = false;
        while (!hasFetchedAllTracks) {
          const fetchNextTracks = await this.fetchService.get(
            `playlists/${nextUrl.split('/').slice(-2).join('/')}`,
          );
          const fetchNextTracksData = await fetchNextTracks;

          playlistTracks.push(fetchNextTracksData.items);

          if (!fetchNextTracks.next) {
            hasFetchedAllTracks = true;
          } else {
            nextUrl = fetchNextTracks.next;
          }
        }
      }
      playlistTracks = playlistTracks.flat();
      return playlistTracks;
    },
    /**
     * Format user playlists
     * @param userPlaylists
     */
    async getFormattedUserPlaylists(userPlaylists) {
      return new Promise(async (successCallback) => {
        this.userPlaylists = [...new Set(userPlaylists.items
          .filter((item) => item.description !== '' && item.description.match(/\[(.*?)]/g) !== null)
          .map((item) => ({
            id: item.id,
            description: item.description.match(/\[(.*?)]/g)[0],
            name: item.name,
            ...(item.images.length > 0 ? {
              image: item.images.length === 1
                ? item.images.map((image) => image.url)[0]
                : item.images.find((image) => image.height === 300).url,
              uri: item.external_urls.spotify,
            } : null),
          })).flat())];

        for (const userPlaylist of this.userPlaylists) {
          userPlaylist.tracks = await this.getPlaylistTracks(userPlaylist);
          const percent = (this.userPlaylists.filter((userPlaylist) => 'tracks' in userPlaylist && userPlaylist.tracks.length > 0).length * 100) / this.userPlaylists.length;
          this.pushInfo(`${this.userPlaylists.length} playlists found... ${Math.ceil(percent)}%`);
        }
        successCallback();
      });
    },

    /** ======================
     * LIKED TRACKS
     ** =====================/
     /**
     * Get user liked tracks
     * @returns {Promise<FlatArray<*[], 1>[]>}
     */
    async getLikedTracks() {
      const response = await this.fetchService.get(`me/tracks?limit=${this.numberOfItems}`);
      let tracks = [];
      tracks.push(response.items);
      if (response.next) {
        let nextUrl = response.next;
        let hasFetchedAllTracks = false;
        while (!hasFetchedAllTracks) {
          const fetchNextTracks = await this.fetchService.get(
            nextUrl.split('/').slice(-2).join('/'),
          );
          const fetchNextTracksData = await fetchNextTracks;

          tracks.push(fetchNextTracksData.items);

          if (!fetchNextTracks.next) {
            hasFetchedAllTracks = true;
          } else {
            nextUrl = fetchNextTracks.next;
          }
        }
      }
      tracks = tracks.flat();
      return tracks;
    },

    /** ======================
     * GENRES
     ** ===================* */
    /**
     * Get user tracks style
     */
    async getGenres() {
      const chunks = [];
      const chunkSize = 50;
      const artists = [];
      const artistsIds = [...new Set(
        this.likedTracks
          .map((likedTrack) => likedTrack.track)
          .map((track) => track.artists)
          .flat()
          .map((artist) => artist.id),
      )];

      for (let i = 0; i < artistsIds.length; i += chunkSize) {
        const chunk = [...artistsIds].slice(i, i + chunkSize);
        chunks.push(chunk);
      }

      for (const chunk of chunks) {
        if (chunk.length > 0) {
          const response = await this.fetchService.get(`artists?ids=${chunk.join(',')}`);
          const data = await response;

          artists.push(data.artists);
        }
      }

      this.artistsFromLikedTracks = artists.flat();
      if (this.artistsFromLikedTracks.length === artistsIds.length) {
        return new Promise((successCallback) => {
          this.likedTracks.forEach((likedTrack) => {
            likedTrack.track.artists.forEach((artist) => {
              const artistData = this.artistsFromLikedTracks.find((a) => a.id === artist.id);
              if (this.formattedLikedTracks.findIndex((fd) => fd.id === likedTrack.track.id) === -1) {
                this.formattedLikedTracks.push({
                  id: likedTrack.track.id,
                  song: likedTrack.track.name,
                  uri: likedTrack.track.uri,
                  genres: artistData.genres,
                  artist: likedTrack.track.artists.map((artist) => ({
                    name: artist.name,
                    id: artist.id,
                    uri: artist.external_urls.spotify,
                  })).flat(),
                  external_url: likedTrack.track.external_urls.spotify,
                  album: {
                    name: likedTrack.track.album.name,
                    uri: likedTrack.track.album.external_urls.spotify,
                  },
                });
              }
            });
          });

          return successCallback();
        });
      }
    },
    /**
     * Sorting tracks by genres of musics
     * @param genres
     * @param userPlaylists
     */
    sortTracksByGenres(genres, userPlaylists) {
      const filteredGenres = [];
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
      this.filteredGenres = filteredGenres;
      const sortByGenre = [];
      filteredGenres.forEach((filteredGenre) => {
        sortByGenre.push({
          ...filteredGenre,
          tracks: [],
        });
        this.formattedLikedTracks.forEach((g) => {
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
        this.pushInfo(`${this.genres.length} playlists found !`, true);
      } else {
        this.pushInfo(
          `No playlists found.
          Try to add your your first playlist by adding [${this.genresToAddInPlaylist[0].genre}] for example`,
        );
      }
    },
    /**
     * Generate a list of genres that can be added
     * @param genres
     */
    generateListOfGenresThatCanBeAdded(genres) {
      genres.forEach((genre) => {
        // Add full name of genre (ex: french rap)
        if (!this.genresToAddInPlaylist.find((filteredGenre) => filteredGenre.genre === genre)) {
          this.genresToAddInPlaylist.push({
            genre,
            genres: [],
            tracks: [],
          });
        }
        // Add split genre (ex: [french, rap])
        genre.split(' ').forEach((e) => {
          if (!this.genresToAddInPlaylist.find((filteredGenre) => filteredGenre.genre === e)) {
            this.genresToAddInPlaylist.push({
              genre: e,
              genres: [],
              tracks: [],
            });
          }
        });
      });
      // Add tracks to corresponding genre
      this.formattedLikedTracks.forEach((data) => {
        data.genres.forEach((fg) => {
          if (fg.length > 0) {
            this.genresToAddInPlaylist.forEach((genre) => {
              if (fg.includes(genre.genre)) {
                if (!genre.genres.includes(fg) && fg !== genre.genre) {
                  genre.genres.push(fg);
                }
                if (!genre.tracks.includes(data.id)) {
                  genre.tracks.push(data.id);
                }
              }
            });
          }
        });
      });

      this.genresToAddInPlaylist = this.genresToAddInPlaylist
        .sort((a, b) => b.tracks.length - a.tracks.length);
    },
    /**
     * Generate a list of artists that can be added
     */
    generateListOfArtistsThatCanBeAdded() {
      this.formattedLikedTracks.forEach((data) => {
        data.artist.forEach((d) => {
          const findArtistFromLikedTracks = this.artistsFromLikedTracks
            .find((artist) => artist.id === d.id);
          if (!('tracks' in findArtistFromLikedTracks)) {
            findArtistFromLikedTracks.tracks = [];
          } else if (!findArtistFromLikedTracks.tracks.includes(data.id)) {
            findArtistFromLikedTracks.tracks.push(data.id);
          }
        });
      });

      this.artistsToAddInPlaylist = this.artistsFromLikedTracks
        .sort((a, b) => b.tracks.length - a.tracks.length);
    },

    /** ======================
     * HANDLE API SUBMITTING
     ** ===================* */
    /**
     * Create a user playlist
     * @param title
     * @param type (genres, or tracks)
     */
    createUserPlaylist(title, type = 'genres') {
      return new Promise((resolve) => {
        this.fetchService.post(`users/${this.me.id}/playlists`, {
          name: this.formatTitleForPlaylist(title),
          description: `[${title.toLowerCase()}], an automatically playlist sorter located at ${window.location.origin}`,
          public: false,
        }).then((response) => {
          this.pushInfo(`Playlist ${response.name} correctly created.`);

          this.userPlaylists.push({
            id: response.id,
            description: response.description.toLowerCase(),
            name: response.name,
            ...(response.images.length > 0 ? {
              image: response.images.length === 1
                ? response.images.map((image) => image.url)[0]
                : response.images.find((image) => image.height === 300).url,
            } : null),
            uri: response.external_urls.spotify,
            automaticallyCreated: true,
          });

          if (type === 'genres') {
            const genre = this.genresToAddInPlaylist
              .find((filteredGenre) => filteredGenre.genre === title);
            this.submitTracksToPlaylist(
              this.formatSpotifyUris(genre.tracks),
              this.userPlaylists.find((userPlaylist) => userPlaylist.id === response.id),
            );
          }
          if (type === 'artists') {
            const artist = this.artistsToAddInPlaylist
              .find((filteredArtist) => filteredArtist.name === title);
            this.submitTracksToPlaylist(
              this.formatSpotifyUris(artist.tracks),
              this.userPlaylists.find((userPlaylist) => userPlaylist.id === response.id),
            );
          }
          // this.generateListOfArtistsThatCanBeAdded();
          resolve(true);
        });
      });
    },

    /**
     * Automatically create playlist
     */
    createPlaylistsAutomatically() {
      // Filtering genres by number of tracks
      const filterGenresToAddInPlaylist = this.genresToAddInPlaylist
        .filter((genreToAddInPlaylist) => genreToAddInPlaylist.tracks.length >= this.minimumOfTracksToCreatePlaylistAutomatically);

      filterGenresToAddInPlaylist.forEach((filterGenre) => {
        const userPlaylistExisting = this.userPlaylists.find((up) => up.description === `[${filterGenre.genre}]`);
        // Check if playlist is not existing
        if (!userPlaylistExisting) {
          this.createUserPlaylist(filterGenre.genre).then((isPassed) => {
            const userPlaylist = this.userPlaylists.find((up) => up.description === `[${filterGenre.genre}]`);
            if (isPassed && userPlaylist.automaticallyCreated) {
              // Send tracks to the playlist created
              this.submitTracksToPlaylist(filterGenre.tracks, userPlaylist, true);
            }
          });
        }
      });
    },
    /**
     * Create chunks of list of uris
     * Limited by 100 at the same time
     * @param tracks
     * @param userPlaylist
     * @param isForPlaylistAutomaticallyCreated
     */
    submitTracksToPlaylist(tracks, userPlaylist, isForPlaylistAutomaticallyCreated = false) {
      const chunks = [];
      const chunkSize = 100;
      for (let i = 0; i < tracks.length; i += chunkSize) {
        const chunk = tracks.slice(i, i + chunkSize);
        chunks.push(chunk);
      }
      if (chunks.length > 1) {
        this.pushInfo(
          `Only 100 tracks can be added at the same time,
                    so ${chunks.length} sets of tracks are waiting to be pushed to your playlist ${userPlaylist.name}...`,
        );
      }
      chunks.forEach((chunk) => {
        if (this.randomizeTracks) {
          this.shuffleArray(chunk);
        }
        if (chunk.length > 0) {
          let handleChunk = chunk;
          if (isForPlaylistAutomaticallyCreated) {
            handleChunk = this.formatSpotifyUris(chunk);
          }
          this.fetchService
            .post(`playlists/${userPlaylist.id}/tracks?uris=${handleChunk.join(',')}`)
            .then(() => {
              this.pushInfo(`Sent ${chunk.length} tracks correctly to playlist ${userPlaylist.name} !`);
            });
          // eslint-disable-next-line no-param-reassign
          userPlaylist.numberOfItemsAdded = tracks.length;
        } else {
          this.pushInfo('All the music has already been sorted, '
            + 'or already exists in the corresponding playlists, '
            + 'no action has been performed.');
        }
      });
    },
    /**
     * Main function to send the data to the Spotify API
     */
    sendDataToSpotifyApi() {
      const genres = [...new Set(this.formattedLikedTracks.map((data) => data.genres).flat())];

      // Generate the list of genres which can be added to Spotify
      this.generateListOfGenresThatCanBeAdded(genres);

      // Generate the list of artists which can be added to Spotify
      this.generateListOfArtistsThatCanBeAdded();

      // Create automatically the playlist if the user wants
      if (this.performCreatePlaylistAutomatically) {
        this.createPlaylistsAutomatically();
      }

      // Sort the tracks by genres
      const userPlaylists = this.userPlaylists.map((userPlaylist) => ({
        ...userPlaylist,
        description: userPlaylist.description.replace(/[\\[\]']+/g, ''),
      }));
      this.sortTracksByGenres(genres, userPlaylists);

      // Done message
      let counter = 0;
      const doneMessage = () => {
        counter += 1;
        if (userPlaylists.length === counter) {
          this.pushInfo('All operations has been performed.');
          this.loading = false;
        }
      };

      this.userPlaylists.forEach((userPlaylist) => {
        const tracks = this.genres.find((sort) => sort.id === userPlaylist.id);

        if (tracks) {
          // Submitting data to true
          if (this.performSubmittingData) {
            const tracksToBeAdded = [...new Set(tracks.tracks
              .map((track) => track.uri))]
              .filter((checkInPlaylist) => !userPlaylist.tracks.map((track) => track.track.uri).find((c) => checkInPlaylist === c));

            if (tracksToBeAdded.length > 0) {
              this.submitTracksToPlaylist(tracksToBeAdded, userPlaylist);
            } else {
              doneMessage();
            }
          } else { // Don't submit data
            this.pushInfo(`No operations have been performed on playlist ${userPlaylist.name}`);
            doneMessage();
          }
        } else {
          this.loading = false;
          this.pushInfo('All the music has already been sorted, or already exists in the corresponding playlists, no action has been performed.');
        }
      });
    },

    /** ======================
     * MAIN
     ** ===================* */
    /**
     * Main function to sort the tracks
     */
    autoSortingLikedTracks() {
      this.loading = true;
      // Get user credentials
      this.getCredentials().then((response) => {
        localStorage.setItem('token', response.access_token);
        // Get user profile
        this.getProfile().then((profile) => {
          this.me = profile;
          this.consoleUsername = this.me.display_name;
          this.pushInfo(`Welcome ${this.me.display_name} !`);
          // Get user playlists
          this.getUserPlaylists().then((userPlaylists) => {
            // Format user playlists
            this.pushInfo('Getting playlists and tracks associated...');
            this.getFormattedUserPlaylists(userPlaylists).then(() => {
              this.pushInfo('Playlists successfully retrieved!');

              // Get user liked tracks
              this.getLikedTracks().then((likedTracks) => {
                this.likedTracks = likedTracks;
                if (this.likedTracks.length > 0) {
                  this.pushInfo(`${this.likedTracks.length} liked tracks found !`, true);

                  // Get user liked tracks style
                  this.getGenres().then(() => {
                    // And we finally send data to the Spotify API
                    this.sendDataToSpotifyApi();
                  });
                } else {
                  this.pushInfo('No tracks liked found, try to add your first liked song.');
                  this.loading = false;
                }
              });
            });
          });
        });
      });
    },

    /** ======================
     * VIEW
     ======================* */
    selectMenu(option) {
      this.selectedCard = option;
    },

    /** ======================
     * PAGINATION
     ** ===================* */
    /**
     * Get the data from the pagination
     * @param name
     * @returns {null|*}
     */
    getPaginationData(name) {
      return this.pagination.find((pagination) => pagination.name === name).data;
    },
    /**
     * Set the data from the pagination
     * @param n
     */
    setDataFromPagination(n) {
      this.pagination.find((pagination) => pagination.name === n.name).data = n.data;
    },

    /** ======================
     * HELPERS
     ** ===================* */
    /**
     * Push value to be displayed in debug terminal
     * @param value
     */
    pushInfo(value) {
      this.progressInfo = `${value}... `;
      this.debugInfos.push(`<span class="fw-bold">${this.consoleUsername}@<span class="text-success">spotify</span>:~></span> ${value}`);
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
    /**
     * Format the url to match the one required by the Spotify API
     * @param arrayOfUris
     * @returns {*}
     */
    formatSpotifyUris(arrayOfUris) {
      return arrayOfUris.map((arrayOfUri) => `spotify:track:${arrayOfUri}`);
    },
    /**
     * Format url for Spotify title playlist
     * @param title
     * @returns {string}
     */
    formatTitleForPlaylist(title) {
      return `${title[0].toUpperCase()}${title.slice(1)}`;
    },
    /**
     * Retrieves the song associated with the ID
     * @param track
     * @returns {*}
     */
    getTrackSongFromAssociatedGenres(track) {
      return this.formattedLikedTracks.find((data) => data.id === track)?.song;
    },
    /**
     * Retrieves the artists associated with the ID
     * @param track
     * @returns {*}
     */
    getTrackArtistsFromAssociatedGenres(track) {
      return this.formattedLikedTracks.length && this.formattedLikedTracks
        .find((data) => data.id === track)
        ?.artist
        .map((artist) => artist.name)
        .join(', ');
    },
    /**
     * Find the playlist associated with the given description
     * @param data
     * @returns {*}
     */
    findPlaylistWithDescription(data) {
      return this.userPlaylists.find((userPlaylist) => userPlaylist.description.includes(`[${data}]`));
    },
  },
};
</script>

<style scoped>
#app {
  overflow-y: hidden;
}
main {
  overflow-x: auto;
}
.sidebar {
  height: 100vh;
  width: 280px;
  background: var(--background);
}
.main-content {
  height: 100%;
  overflow-y: visible;
}
.sidebar-icon {
  margin-right: 10px;
  vertical-align: middle;
}
.nav-link {
  color: var(--bs-white);
}
.nav-link.active {
  background: none;
  border-bottom: 3px solid var(--bs-success);
  border-radius: 0;
  color: var(--bs-success);
  font-weight: bold;
}
</style>
