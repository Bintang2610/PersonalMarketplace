import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Notifikasi() {

let revealDiv1: HTMLDivElement | undefined;

  

  return (
    <section class="px-8">
      <div class="w-full h-[90vh] flex flex-col md:flex-row pt-4 pb-6 mt-16 gap-6">
        <div class="w-full md:w-1/3 h-full pb-4 flex flex-col gap-3">
          <h2 class="text-xl px-2 py-4 font-medium">Notifikasi</h2>
          <div class="bg-gray-100 h-full overflow-y-auto">
              <div class="w-full bg-black h-fit flex flex-col gap-[1px]">
                <div class="bg-gray-100 items-center hover:bg-gray-200 px-4 py-6 justify-between flex flex-row">
                  <div class="w-auto flex flex-col">
                    <h2 class="text-lg font-medium truncate md:w-20 lg:w-40 xl:w-52">Pesanan anda</h2>
                    <p class="text-md truncate md:w-24 lg:w-44 xl:w-60">Pesanan anda blak adadajdjbdajdbadj</p>
                  </div>
                  <div class="w-28 flex text-md flex-col text-right">
                    <h2>7 Mei 2024</h2>
                    <h2>20:24</h2>
                  </div>
                </div>
                <div class="bg-gray-100 items-center hover:bg-gray-200 px-4 py-6 justify-between flex flex-row">
                  <div class="w-auto flex flex-col">
                    <h2 class="text-lg font-medium truncate md:w-20 lg:w-40 xl:w-52">Pesanan anda</h2>
                    <p class="text-md truncate md:w-24 lg:w-44 xl:w-60">Pesanan anda blak adadajdjbdajdbadj</p>
                  </div>
                  <div class="w-28 flex text-md flex-col text-right">
                    <h2>7 Mei 2024</h2>
                    <h2>20:24</h2>
                  </div>
                </div>
                <div class="bg-gray-100 items-center hover:bg-gray-200 px-4 py-6 justify-between flex flex-row">
                  <div class="w-auto flex flex-col">
                    <h2 class="text-lg font-medium truncate md:w-20 lg:w-40 xl:w-52">Pesanan anda</h2>
                    <p class="text-md truncate md:w-24 lg:w-44 xl:w-60">Pesanan anda blak adadajdjbdajdbadj</p>
                  </div>
                  <div class="w-28 flex text-md flex-col text-right">
                    <h2>7 Mei 2024</h2>
                    <h2>20:24</h2>
                  </div>
                </div>
                <div class="bg-gray-100 items-center hover:bg-gray-200 px-4 py-6 justify-between flex flex-row">
                  <div class="w-auto flex flex-col">
                    <h2 class="text-lg font-medium truncate md:w-20 lg:w-40 xl:w-52">Pesanan anda</h2>
                    <p class="text-md truncate md:w-24 lg:w-44 xl:w-60">Pesanan anda blak adadajdjbdajdbadj</p>
                  </div>
                  <div class="w-28 flex text-md flex-col text-right">
                    <h2>7 Mei 2024</h2>
                    <h2>20:24</h2>
                  </div>
                </div>
                <div class="bg-gray-100 items-center hover:bg-gray-200 px-4 py-6 justify-between flex flex-row">
                  <div class="w-auto flex flex-col">
                    <h2 class="text-lg font-medium truncate md:w-20 lg:w-40 xl:w-52">Pesanan anda</h2>
                    <p class="text-md truncate md:w-24 lg:w-44 xl:w-60">Pesanan anda blak adadajdjbdajdbadj</p>
                  </div>
                  <div class="w-28 flex text-md flex-col text-right">
                    <h2>7 Mei 2024</h2>
                    <h2>20:24</h2>
                  </div>
                </div>
                <div class="bg-gray-100 items-center hover:bg-gray-200 px-4 py-6 justify-between flex flex-row">
                  <div class="w-auto flex flex-col">
                    <h2 class="text-lg font-medium truncate md:w-20 lg:w-40 xl:w-52">Pesanan anda</h2>
                    <p class="text-md truncate md:w-24 lg:w-44 xl:w-60">Pesanan anda blak adadajdjbdajdbadj</p>
                  </div>
                  <div class="w-28 flex text-md flex-col text-right">
                    <h2>7 Mei 2024</h2>
                    <h2>20:24</h2>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class=" w-full md:w-2/3 h-full bg-gray-50 p-4">
          <h2 class="text-lg font-medium">Pesanan anda</h2>
          <hr class="border-t border-gray-600 mt-3" />
          <p class="text-md text-black mt-4">Pesanan anda dalam perjalanan harap untuk memeriksa secara berkala dan laporkan jika ada kesalahan saat pengantaran</p>
        </div>
      </div>
    </section>
  );
}
