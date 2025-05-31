import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Profil() {



  return (
    <section class="mx-8 md:mx-10">
      <div class="pt-24 pl-4 h-[35vh] flex flex-col">
        <div class="w-full h-full items-center flex gap-4 md:gap-6">
          <img src="/src/public/images/mockup/11.png" alt="" class="object-cover w-16 h-16 rounded-full"/>
          <div class="flex flex-col text-left">
            <h2 class="text-2xl font-medium">Rian Diana</h2>
            <p>Pengguna dari November 2024</p>
          </div>
        </div>
      </div>
      <hr class="border-t border-gray-400 my-5" />
      <div class="flex flex-col text-gray-600 my-8 gap-2">
        <a href="/" class="hover:underline">Informasi Pribadi</a>
        <a href="/" class="hover:underline">Alamat</a>
        <a href="/" class="hover:underline">Pembayaran</a>
        <a href="/" class="hover:underline">Akun dan Keamanan</a>
      </div>
    </section>
  );
}
