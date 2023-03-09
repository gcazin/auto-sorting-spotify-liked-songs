<template>
  <Container>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
      <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-100 sm:text-7xl">
        sorting Spotify liked tracks
        <span class="text-transparent bg-clip-text bg-gradient-to-l to-primary from-green-500">made easy !</span>
      </h1>
      <div class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-300">
        <p>
          This small utility allows you to retrieve your latest favorite music,
          extract the genre and categorize them in the right playlists
        </p>
      </div>
      <div class="space-x-2 mt-6">
        <Button color="secondary" outline>Instructions</Button>
        <Button color="primary" is-link to="form">Get started</Button>
      </div>
    </div>
    <div class="bg-primary shadow px-0.5 pt-0.5 rounded-x-lg rounded-t-lg">
      <img class="rounded-x-lg rounded-t-lg" src="/images/process.png" alt="Homepage banner">
    </div>
  </Container>

  <section class="relative overflow-hidden bg-primary-dark pt-20 pb-28 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">Multiple filters available.</h2>
        <p class="mt-6 text-lg tracking-tight text-blue-100">Everything you need to stop wasting time sorting out your liked tracks.</p>
      </div>
      <div class="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
        <div class="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
          <div class="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal" role="tablist" aria-orientation="vertical">
            <div class="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6 bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10">
              <h3>
                <button
                  class="font-display text-lg [&:not(:focus-visible)]:focus:outline-none text-blue-600 lg:text-white"
                  @click="selectedTabs = 'genres'"
                >
                  <span class="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl"></span>Genres </button>
              </h3>
              <p class="mt-2 hidden text-sm lg:block text-white">Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.</p>
            </div>
            <div class="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6 hover:bg-white/10 lg:hover:bg-white/5">
              <h3>
                <button
                  class="font-display text-lg [&:not(:focus-visible)]:focus:outline-none text-blue-100 hover:text-white lg:text-white"
                  @click="selectedTabs = 'playlists'"
                >
                  <span class="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl"></span>Artists</button>
              </h3>
              <p class="mt-2 hidden text-sm lg:block text-blue-100 group-hover:text-white">All of your receipts organized into one place, as long as you don't mind typing in the data by hand.</p>
            </div>
          </div>
        </div>
        <div class="lg:col-span-7">
          <div :style="{ display: selectedTabs === 'genres' ? 'inherit' : 'none' }">
            <div class="relative sm:px-6 lg:hidden">
              <div class="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"></div>
              <p class="relative mx-auto max-w-2xl text-base text-white sm:text-center">Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.</p>
            </div>
            <div class="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
              <img alt="" sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem" src="/images/process.png" width="2174" height="1464" decoding="async" data-nimg="1" class="w-full" style="color:transparent">
            </div>
          </div>
          <div :style="{ display: selectedTabs === 'playlists' ? 'inherit' : 'none' }">
            <div class="relative sm:px-6 lg:hidden">
              <div class="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"></div>
              <p class="relative mx-auto max-w-2xl text-base text-white sm:text-center">All of your receipts organized into one place, as long as you don't mind typing in the data by hand.</p>
            </div>
            <div class="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
              <img alt="" sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem" src="/images/home.png" width="2174" height="1464" decoding="async" data-nimg="1" class="w-full" style="color:transparent">
            </div>
          </div>
          <div id="headlessui-tabs-panel-:Rta9m:" role="tabpanel" tabindex="-1" style="display: none;" data-headlessui-state="" aria-labelledby="headlessui-tabs-tab-:R2ra9m:" hidden="">
            <div class="relative sm:px-6 lg:hidden">
              <div class="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"></div>
              <p class="relative mx-auto max-w-2xl text-base text-white sm:text-center">We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.</p>
            </div>
            <div class="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
              <img alt="" sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvat-returns.7402820f.png&amp;w=3840&amp;q=75" width="2174" height="1464" decoding="async" data-nimg="1" class="w-full" style="color:transparent">
            </div>
          </div>
          <div id="headlessui-tabs-panel-:R15a9m:" role="tabpanel" tabindex="-1" style="display: none;" data-headlessui-state="" aria-labelledby="headlessui-tabs-tab-:R33a9m:" hidden="">
            <div class="relative sm:px-6 lg:hidden">
              <div class="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"></div>
              <p class="relative mx-auto max-w-2xl text-base text-white sm:text-center">Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.</p>
            </div>
            <div class="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
              <img alt="" sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freporting.2ad6f065.png&amp;w=3840&amp;q=75" width="2174" height="1464" decoding="async" data-nimg="1" class="w-full" style="color:transparent">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">How it works ?</h2>
        <p class="mt-6 text-lg tracking-tight text-blue-100">Some explanations on how the tool works.</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
        <dl class="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
          <div class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-primary">
              <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <ion-icon class="h-6 w-6 text-white" name="code-slash-outline"></ion-icon>
              </div>
              Connect to Spotify
            </dt>
            <dd class="mt-2 text-base leading-7 text-blue-100">
              The tool connects to Spotify to retrieve your playlists, liked tracks and username from your account.
            </dd>
          </div>

          <div class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-primary">
              <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <ion-icon class="h-6 w-6 text-white" name="construct-outline"></ion-icon>
              </div>
              Process your liked tracks
            </dt>
            <dd class="mt-2 text-base leading-7 text-blue-100">
              After getting your liked tracks, the tool extracts the genre, and classifies them in the right playlists.
              With this tool, you can easily sort your tracks by genre or by artist!
            </dd>
          </div>

          <div class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-primary">
              <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <ion-icon class="h-6 w-6 text-white" name="color-wand-outline"></ion-icon>
              </div>
              It's your turn !
            </dt>
            <dd class="mt-2 text-base leading-7 text-blue-100">
              Simply choose the playlists you need at the click of a button, either by genre or by artist. It's as easy as that!
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>

  <section class="relative overflow-hidden bg-[#1d75de] pt-20 pb-28 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">Ready ?</h2>
          <Text>Everything you need to stop wasting time sorting out your liked tracks.</Text>
        </div>
        <div>
          <Button color="dark" is-link to="form">Get started</Button>
        </div>
      </div>
    </div>
  </section>

  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex space-x-32">
        <div>
          <h2 class="font-display text-xl tracking-tight text-white sm:text-xl md:text-2xl">
            Frequently asked questions
          </h2>
          <p class="mt-1 text-lg tracking-tight text-blue-100">
            Can't find the answer to your question? Contact me by email at this address
            <a class="text-primary font-bold" href="mailto:czn.guillaume@gmail.com">czn.guillaume@gmail.com</a>.
          </p>
        </div>
        <div class="flex flex-col space-y-8">
          <div v-for="(faq, index) in faqs" :key="index">
            <h3 class="font-display text-lg tracking-tight text-white sm:text-xl md:text-xl">{{ faq.title }}</h3>
            <p class="mt-1 text-lg tracking-tight text-blue-100">{{ faq.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="py-24 sm:py-12 bg-dark border-t-2 border-primary/30">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 class="font-display tracking-tight text-white">© 2023 SpotifyLikedTracksSorter. All rights reserved.</h2>
      </div>
    </div>
    <div class="mt-5 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-500">
      <a href="/privacy-policy">Privacy policy</a>
      <div class="h-4 w-px bg-slate-500/20"></div>
      <a href="/changelog">Changelog</a>
    </div>
  </div>

</template>

<script>
import Login from '@/components/Login.vue';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import Container from '@/components/Container.vue';
import Text from "@/components/Text.vue";

export default {
  components: {
    Text,
    Container,
    Button,
    Login,
    Card,
  },
  data() {
    return {
      // View
      accordion: [
        {
          title: 'How can manually create playlist ?',
          text: 'Test ?',
        },
      ],
      selectedTabs: 'genres',
      tabs: ['genres', 'playlists'],
      faqs: [
        {
          title: 'Is my data secure?',
          description: 'Yes, no information is stored, or used for advertising purposes.',
        },
        {
          title: 'Can I create playlists manually?',
          description: 'Yes, you can create playlists manually so that they can be filled in later by the tool by describing the genre or artist in brackets (e.g. [rap], or [metallica])',
        },
      ],
    };
  },
  methods: {},
};
</script>
