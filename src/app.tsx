import { Suspense, type Component } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { createSignal, onCleanup, onMount } from "solid-js";

const App: Component = (props: { children: Element }) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen());
  };

  const [showNavbar, setShowNavbar] = createSignal(true);

  let lastScrollY = 0;

  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  const [showText, setShowText] = createSignal(false);

  const [showText2, setShowText2] = createSignal(false);

  const [showText3, setShowText3] = createSignal(false);

  const navigate = useNavigate();

  const goToKatalogAndFocus = () => {
    navigate('/katalog');
    setTimeout(() => {
      const input = document.getElementById('searchInput');
      if (input) input.focus();
    }, 100); // kasih jeda sedikit biar halaman sempat load
  };

  return (
    <>
      <nav class={`bg-white fixed w-full z-30 top-0 start-0 border-b border-gray-200 transition-transform duration-300 ${
    showNavbar() ? "translate-y-0" : "-translate-y-full"
  }`}>
        <div class="w-auto mx-4 md:mx-6 p-4 relative flex items-center justify-between">
          <A href="/" class="h-full flex items-center z-10">
            <span class="text-lg font-semibold">PersonalStore</span>
          </A>
          <div class="hidden md:block absolute left-1/2 top-3 transform -translate-x-1/2">
            <ul class="flex items-center space-x-6 font-medium bg-white px-4 py-2 rounded-lg">
              <li>
                <A href="/" class="hover:text-gray-600 hover:underline text-black text-sm">Terbaru</A>
              </li>
              <li>
                <A href="/katalog" class="hover:text-gray-600 hover:underline text-black text-sm">Katalog</A>
              </li>
              <li>
                <A href="/" class="hover:text-gray-600 hover:underline text-black text-sm">Pria</A>
              </li>
              <li>
                <A href="/" class="hover:text-gray-600 hover:underline text-black text-sm">Wanita</A>
              </li>
            </ul>
          </div>
          <div class="flex items-center space-x-3 z-10">
            <button onClick={goToKatalogAndFocus} class="flex items-center rounded-full px-2 py-2 hover:bg-gray-100 bg-white justify-center text-black text-md">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <A href="/profil" class="flex items-center rounded-full px-2 py-2 hover:bg-gray-100 bg-white justify-center text-black text-md">
              <i class="fa-regular fa-heart"></i>
            </A>
            <A href="/profil" class="flex items-center rounded-full px-2 py-2 hover:bg-gray-100 bg-white justify-center text-black text-md">
              <i class="fa-regular fa-user"></i>
            </A>
            <button onClick={toggleMobileMenu} type="button" class="md:hidden px-2 py-1 h-auto justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
        <div class={`md:hidden ${isOpen() ? '' : 'hidden'} w-full bg-white border-t border-gray-200 px-4 py-2`}>
            <div class="w-full flex flex-col text-sm font-medium text-gray-700">
            <A href="" onClick={toggleMobileMenu} class="w-full py-4 px-4">Terbaru</A>
            <A href="/katalog" onClick={toggleMobileMenu} class="w-full py-4 px-4 border-t border-gray-200">Katalog</A>
            <A href="" onClick={toggleMobileMenu} class="w-full py-4 px-4 border-t border-gray-200">Pria</A>
            <A href="" onClick={toggleMobileMenu} class="w-full py-4 px-4 border-t border-gray-200">Wanita</A>
            </div>
        </div>
      </nav>

      <main>
        <Suspense>{props.children}</Suspense>
      </main>

      <footer class="border-t border-gray-300">
        <div class="flex flex-col md:space-x-4 md:flex-row text-black px-8 md:px-10 py-8 text-sm text-gray-700">
          <div class="w-auto md:w-1/4 mb-2 flex-col">
            <div class="flex items-center justify-between cursor-pointer md:cursor-default" onClick={() => setShowText(!showText())}>
              <p class="flex items-center text-lg font-medium py-4">
                <i class="fa-solid fa-location-dot mr-2"></i>Gerai Kami
              </p>
              <i
                class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:hidden ${
                  showText() ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <ul class={`${showText() ? "block" : "hidden md:block"} transition-opacity duration-300`}>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Komplek PJKA 386-388, JL. Jend. Sudirman, Purwokerto Lor, Purwokerto, Sokanegara, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53115</A>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/4 mb-2 flex-col">
            <div class="flex items-center justify-between cursor-pointer md:cursor-default" onClick={() => setShowText2(!showText2())}>
              <p class="flex items-center text-lg font-medium py-4">
                <i class="fa-solid fa-phone mr-2"></i>Pelayanan
              </p>
              <i
                class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:hidden ${
                  showText2() ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <ul class={`${showText2() ? "block" : "hidden md:block"} space-y-2 transition-opacity duration-300`}>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Minta bantuan</A>
              </li>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Opsi pembayaran</A>
              </li>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Pengembalian barang</A>
              </li>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Panduan perawatan</A>
              </li>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Kontak kami</A>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/4 mb-2 flex-col">
            <div class="flex items-center justify-between cursor-pointer md:cursor-default" onClick={() => setShowText3(!showText3())}>
              <p class="flex items-center text-lg font-medium py-4">
                <i class="fa-solid fa-user-tie mr-2"></i>Tentang kami
              </p>
              <i
                class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:hidden ${
                  showText3() ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <ul class={`${showText3() ? "block" : "hidden md:block"} space-y-2 transition-opacity duration-300`}>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Tentang Personal Store</A>
              </li>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Legalitas</A>
              </li>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Karir</A>
              </li>
              <li>
                <A href="/" class="cursor-pointer hover:text-gray-500">Investor</A>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/4 mb-2 flex-col text-right">
            <p class="flex items-center justify-end text-lg font-medium py-4"><i class="fa-solid fa-globe mr-2"></i>Indonesia</p>
          </div>
        </div>
        <div class="w-full px-8 md:px-10 py-8">
          <div class="w-auto flex py-4 flex-row space-x-6 text-sm text-black">
            <A href="" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-5 text-black inline-block mr-1">
                <path d="M349.33,69.33H162.67A93.34,93.34,0,0,0,69.33,162.67v186.66A93.34,93.34,0,0,0,162.67,442.67h186.66A93.34,93.34,0,0,0,442.67,349.33V162.67A93.34,93.34,0,0,0,349.33,69.33ZM256,362.67A106.67,106.67,0,1,1,362.67,256,106.76,106.76,0,0,1,256,362.67Zm117.33-192a21.33,21.33,0,1,1,21.34-21.34A21.32,21.32,0,0,1,373.33,170.67ZM256,181.33A74.67,74.67,0,1,0,330.67,256,74.77,74.77,0,0,0,256,181.33Z"/>
              </svg>
              <span class="text-lg font-semibold">Instagram</span>
            </A>
            <A href="" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 text-black inline-block mr-1" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91V127.38c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0C141.09 0 89.09 54.42 89.09 153.1v68.24H0v92.66h89.09V512h107.9V288z"/>
              </svg>
              <span class="text-lg font-semibold">facebook</span>
            </A>
          </div>
          <div class="w-auto flex py-4 flex-row border-t border-gray-300 space-x-4 border-d text-sm text-black">
            <p class="font-semibold text-gray-500">&copy; 2025 Hanifan Bintang</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
