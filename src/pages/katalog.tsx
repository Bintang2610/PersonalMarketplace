import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function About() {

let revealDiv1: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && revealDiv1) {
            revealDiv1.classList.remove('opacity-0', 'translate-x-0');
            revealDiv1.classList.add('opacity-100', 'translate-x-10');
            observer.unobserve(entry.target); // Berhenti observe setelah muncul
          }
        });
      },
      { threshold: 0.4 }
    );

    if (revealDiv1) observer.observe(revealDiv1);
  });

  const [showDropdown, setShowDropdown] = createSignal(false);
  const [searchText, setSearchText] = createSignal('');
  let containerRef;
  let inputRef;

  const handleFocus = () => setShowDropdown(true);

  const handleClickOutside = (e) => {
    if (containerRef && !containerRef.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleScroll = () => {
    if (containerRef) {
      const rect = containerRef.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) {
        setShowDropdown(false);
        // Blur input
        const input = document.getElementById("searchInput");
        if (input) input.blur();
      }
    }
  };  
  
  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
  
    onCleanup(() => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    });
  });

  document.addEventListener('click', handleClickOutside);
  onCleanup(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  const closeInput = () => {
    setShowDropdown(false);
    inputRef.blur(); // hilangkan fokus input
  };

  const [scrollX, setScrollX] = createSignal(0);
  let containerRef2;

  const scrollNext = () => {
    if (containerRef2) {
      containerRef2.scrollBy({ left: 195, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (containerRef2) {
      containerRef2.scrollBy({ left: -195, behavior: 'smooth' });
    }
  };

  const products = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `Hoodie ${i + 1}`,
    price: `Rp ${200000 + i * 10000}`,
    img: `/src/public/images/mockup/${(i % 4) + 1}.png`
  }));

  return (
    <section class="mx-8 md:mx-10">
      <div class="pt-20 pb-6 h-[100vh] flex flex-col">
      <div class="w-full mb-4 relative" ref={el => (containerRef = el)}>
      <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>

      <input
        type="text"
        placeholder="Cari produk..."
        value={searchText()}
        id="searchInput"
        ref={inputRef}
        onInput={(e) => setSearchText(e.target.value)}
        onFocus={handleFocus}
        class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Tombol X: muncul hanya saat showDropdown true */}
      {showDropdown() && (
        <button
          class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-black"
          onClick={closeInput}
          type="button"
        >
          <i class="fa-solid fa-xmark mr-1"></i>
        </button>
      )}

      {/* Dropdown muncul saat fokus */}
      {showDropdown() && (
        <div class="absolute top-full flex flex-col md:flex-row h-[70vh] md:h-[50vh] left-0 w-full p-10 mt-1 bg-white shadow-md border border-gray-200 rounded-xl z-10">
          <div class="flex-1 md:w-1/3 py-0 pb-4 md:pb-0 md:py-2">
          <p class="text-md font-medium text-black mb-2">Pencarian teratas</p>
            <ul>
              <li>
                <A href="" class="text-gray-600 hover:text-gray-500">Hoodie</A>
              </li>
              <li>
                <A href="" class="text-gray-600 hover:text-gray-500">Kaos</A>
              </li>
              <li>
                <A href="" class="text-gray-600 hover:text-gray-500">Sepatu</A>
              </li>
            </ul>
          </div>
          <div class="relative md:w-2/3 h-full overflow-x-auto flex-2">
          <button
              onClick={scrollPrev}
              class="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white p-2"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="overflow-x-hidden" ref={el => (containerRef2 = el)}>
              <div class="flex flex-row space-x-3">
                {products.map(product => (
                  <A
                    href="/"
                    class="w-[183px] flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      class="h-[160px] object-cover w-full"
                    />
                    <div class="p-2 text-left text-black">
                      <p class="text-md font-semibold truncate">{product.title}</p>
                      <p class="text-sm">{product.price}</p>
                    </div>
                  </A>
                ))}
              </div>
            </div>

            <button
              onClick={scrollNext}
              class="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white p-2"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
      <A href=""
            class="relative w-full flex-1 bg-cover bg-center md:bg-top flex items-center group"
            style="background-image: url('/src/public/images/mockup/13.png');"
          >
            <div class="absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0"></div>
      
            <div ref={revealDiv1} class="opacity-0 translate-x-0 transition-all duration-700 overflow-x-auto w-full max-w-sm md:max-w-sm lg:max-w-md ml-2 md:ml-16 lg:ml-32 rounded text-white font-medium">
              <h2 class="w-full mb-1 text-3xl lg:text-4xl font-medium lg:font-semibold">Hoodie terbaru dari Personal Store</h2>
              <p class="mb-2 text-md">Hoodie 1.1</p>
              <A href="/" class=" text-sm block md:hidden">
                <div class="flex items-center w-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full"><i class="fa-solid fa-bag-shopping mr-1"></i> Shop</div>
              </A>
              <A href="/" class=" text-sm hidden md:block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div class="flex items-center w-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full"><i class="fa-solid fa-bag-shopping mr-1"></i> Shop</div>
              </A>
            </div>
          </A>
      </div>
    </section>
  );
}
