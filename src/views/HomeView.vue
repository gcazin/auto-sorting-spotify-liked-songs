<template>
  <div class="container-sm">
    <Card>
      <p>
        This small utility allows you to retrieve your latest favorite music, extract the genre and categorize them in the right playlists
      </p>
      <p>
        Click on the <span class="fw-bold">Login to Spotify</span> button to get started!
      </p>
      <template #footer>
      </template>
    </Card>
    <Card title="Instructions">
      <ul>
        <li><span class="fw-bold">Create a playlist</span> with the name you want on Spotify.</li>
        <li>Put in <span class="fw-bold">description</span> the music genres of the playlist (ex: [rap]).
          You can retrieve the genres that appear most often in your playlists by submitting the form and unchecking the 'Submitting data',
          nothing will be added or modified in your playlists.</li>
        <li>Click on the <span class="fw-bold">auto sorting button</span> and tada!</li>
      </ul>
    </Card>
    <Login />
  </div>
</template>

<script setup>
import Login from '@/components/Login.vue';
import Card from '@/components/Card.vue';
</script>
