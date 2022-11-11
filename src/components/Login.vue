<template>
    <div class="text-center">
      <button class="btn btn-success btn-lg fw-bold" @click="login()">{{ text ?? 'Login with Spotify' }}</button>
    </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    text: {
      type: String,
    },
  },
  watch: {
    '$route.query': function () {
      console.log('oui');
    },
  },
  methods: {
    login() {
      const redirectUri = new URL(
        'about',
        window.location.href,
      );
      localStorage.setItem('redirect-uri', redirectUri.toString());

      const state = (Math.random() + 1).toString(36).substring(2);
      const clientId = 'ead24efe803043aaabfedf71fba1df14';
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

      window.location.href = url.toString();
    },
  },
};
</script>
