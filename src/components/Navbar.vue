<template>
  <nav class="navbar navbar-expand-lg navbar-dark col-10 m-auto">
    <div class="container-fluid px-0">
      <a class="navbar-brand fw-bold" href="/">SpotifyLikedTracksSorter</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <a target="_blank" class="nav-link" aria-current="page" href="https://github.com/gcazin/auto-sorting-spotify-liked-songs">
              <ion-icon class="align-middle" name="logo-github"></ion-icon>
              Github
            </a>
          </li>
          <li class="nav-item">
            <a target="_blank" class="nav-link" href="https://www.guillaume-cazin.fr" tabindex="-1" aria-disabled="true">
              <ion-icon class="align-middle" name="tv-outline"></ion-icon>
              Website
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>
