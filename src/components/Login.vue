<template>
  <div class="text-center">
    <Button size="lg" @click="login()">
      {{ text ?? 'Login with Spotify' }}
    </Button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    Button,
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

      window.location.href = url.toString();
    },
  },
};
</script>
