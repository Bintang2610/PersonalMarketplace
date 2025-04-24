import { Suspense, type Component } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { createSignal, onCleanup, onMount } from "solid-js";

const App: Component = (props: { children: Element }) => {
  const location = useLocation();

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

  return (
    <>
      <nav class={`bg-white fixed w-full z-30 top-0 start-0 border-b border-gray-200 transition-transform duration-300 ${
    showNavbar() ? "translate-y-0" : "-translate-y-full"
  }`}>
        <div class="max-w-screen-xl mx-auto p-4 relative flex items-center justify-between">
          <A href="/" class="h-full flex items-center z-10">
            <span class="text-lg font-semibold">PersonalStore</span>
          </A>
          <div class="hidden md:block absolute left-1/2 top-3 transform -translate-x-1/2">
            <ul class="flex items-center space-x-6 font-medium bg-white px-4 py-2 rounded-lg">
              <li>
                <A href="/" class="hover:text-gray-600 hover:underline text-black text-sm">Terbaru</A>
              </li>
              <li>
                <A href="/" class="hover:text-gray-600 hover:underline text-black text-sm">Katalog</A>
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
            <A href="/profil" class="flex items-center rounded-full px-2 py-2 hover:bg-gray-100 bg-white justify-center text-black text-md">
              <i class="fa-regular fa-heart"></i>
            </A>
            <A href="/profil" class="flex items-center rounded-full px-2 py-2 hover:bg-gray-100 bg-white justify-center text-black text-md">
              <i class="fa-regular fa-user"></i>
            </A>
            <button onClick={toggleMobileMenu} type="button" class="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
        </div>
        <div class={`md:hidden ${isOpen() ? '' : 'hidden'} bg-white border-t border-gray-200 px-4 py-2`}>
            <ul class="space-y-4 text-sm font-medium text-gray-700">
                <li>Katalog</li>
            </ul>
        </div>
      </nav>

      <main>
        <Suspense>{props.children}</Suspense>
      </main>
    </>
  );
};

export default App;
