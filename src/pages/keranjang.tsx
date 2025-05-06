import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Keranjang() {

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

  const [selectedOption, setSelectedOption] = createSignal("Urutkan");
  const [isOpen, setIsOpen] = createSignal(false);

  const options = ["Terbaru", "Terlama", "Nama: A - Z", "Nama: Z - A", "Harga: Rendah - Tinggi", "Harga: Tinggi - Rendah"];

  const [quantity, setQuantity] = createSignal(1);

  const increase = () => setQuantity(quantity() + 1);
  const decrease = () => {
    if (quantity() > 1) {
      setQuantity(quantity() - 1);
    }
  };

  const [isScrollingUp, setIsScrollingUp] = createSignal(false);
  let lastScrollTop = 0;

  onMount(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll < lastScrollTop) {
        setIsScrollingUp(true); // Scroll ke atas
      } else {
        setIsScrollingUp(false); // Scroll ke bawah
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Untuk antisipasi scroll ke atas mentok
    };

    window.addEventListener('scroll', handleScroll);
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  const [showModal, setShowModal] = createSignal(false);

  const [showModal2, setShowModal2] = createSignal(false);

  const [isDropdownOpen2, setIsDropdownOpen2] = createSignal(false);
  const [selectedOption2, setSelectedOption2] = createSignal("Pilih ukuran");
  let dropdownRef;

  const toggleDropdown = () => setIsDropdownOpen2(!isDropdownOpen2());

  const selectOption2 = (option) => {
    setSelectedOption2(option);
    setIsDropdownOpen2(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef && !dropdownRef.contains(e.target)) {
      setIsDropdownOpen2(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    onCleanup(() => {
      document.removeEventListener("click", handleClickOutside);
    });
  });

  return (
    <section class="mx-8 md:mx-10 flex flex-row">
      <div class="w-full h-full md:w-3/5 lg:w-2/3 md:mr-4">
        <div class="pt-20 h-[25vh] md:h-[20vh] flex flex-col">
          <div class="w-full h-full items-center flex">
            <div class="w-full flex text-left">
              <h2 class="text-2xl font-medium">Keranjang</h2>
            </div>
          </div>
        </div>
        <div class="w-full h-full block md:hidden bg-gray-100 my-5 py-4 px-5">
          <h2 class="w-full text-xl font-medium mb-6 mt-2">Rincian pesanan</h2>
          <div class="flex flex-row items-center justify-between mb-3">
            <p class="text-md">Total belanja</p>
            <p class="text-md">Rp 400.000</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3">
            <div class="items-center flex flex-row">
              <p class="text-md">Kode promo</p>
              <button onClick={() => setShowModal(true)} class="ml-1 text-xs px-2 py-1 rounded-full hover:bg-gray-200"><i class="fa-solid fa-plus"></i></button>
            </div>
            <p class="text-md">--</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3">
            <p class="text-md  w-40">Perkiraan Pengiriman & Penanganan</p>
            <p class="text-md">Free</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3 font-medium border-t border-gray-500 pt-3">
            <p class="text-md">Total harga</p>
            <p class="text-md">Rp 400.000</p>
          </div>
          <button class="w-full rounded-full bg-black text-white py-2 hover:bg-white border border-gray-800 hover:text-black">Proses pesanan</button>
        </div>
        <div class="w-full flex flex-row border-b border-gray-600 mb-4 py-4 text-sm">
          <div class="w-full">
            <p class="text-lg font-medium">Produk(7)</p>
          </div>
        </div>
        <div class="w-full mb-8 gap-4 flex">
          <div class="w-full w-full">
              <div class="w-full h-full space-y-4 mb-10">
                <div class="w-full flex flex-col bg-white rounded border">
                    <div class="w-full flex flex-row h-[30vh]">
                      <img
                        src="/src/public/images/mockup/9.png"
                        alt=""
                        class="object-cover w-1/3 lg:w-1/4"
                      />
                      <div class="w-2/3 lg:w-3/4 p-4 flex-col space-y-1 text-left text-black">
                        <div class="w-full flex flex-row justify-between items-center">
                          <p class="text-lg font-semibold truncate">Hoodie 1.1</p>
                          <p>Stok: 10</p>
                        </div>
                        <p class="text-sm max-w-[160px] lg:max-w-xs line-clamp-2 text-gray-600">Produk ini adalah hoodie keluaran terbaru dari Personal Store yang dirilis tahun 2090 di Summer Vation Paris 2090.</p>
                        <p class="text-sm">Hoodie</p>
                        <div class="items-center flex flex-row">
                          <p class="text-sm py-1 md:py-1 pb-0 md:pb-1">Ukuran: XL</p>
                          <button onClick={() => setShowModal2(true)} class="items-center px-2 block md:hidden py-1 ml-2 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                        </div>
                        <button onClick={() => setShowModal2(true)} class="items-center px-2 hidden md:block py-1 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                      </div>
                    </div>
                    <div class="w-full bg-gray-100 h-[10vh] justify-between flex flex-row items-center">
                      <h2 class="px-4 font-medium">Rp 200.000</h2>
                      <div class="px-4 flex flex-row items-center gap-4">
                        <div class="text-sm bg-gray-50 border border-gray-500 bg-white rounded-full py-1 px-2 gap-3 flex flex-row">
                          {quantity() > 1 ? (
                            <button
                              class="rounded-full hover:bg-gray-200 px-1"
                              onClick={decrease}
                            >
                              <i class="fa-solid fa-minus"></i>
                            </button>
                          ) : (
                            <button
                              class="rounded-full hover:text-gray-600 px-1"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          )}

                          <p>{quantity()}</p>

                          <button
                            class="rounded-full hover:bg-gray-200 px-1"
                            onClick={increase}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <input type="checkbox" checked class="w-6 h-6 cursor-pointer accent-black" />
                      </div>
                    </div>
                </div>
                <div class="w-full flex flex-col bg-white rounded border">
                    <div class="w-full flex flex-row h-[30vh]">
                      <img
                        src="/src/public/images/mockup/9.png"
                        alt=""
                        class="object-cover w-1/3 lg:w-1/4"
                      />
                      <div class="w-2/3 lg:w-3/4 p-4 flex-col space-y-1 text-left text-black">
                        <div class="w-full flex flex-row justify-between items-center">
                          <p class="text-lg font-semibold truncate">Hoodie 1.1</p>
                          <p>Stok: 10</p>
                        </div>
                        <p class="text-sm max-w-[160px] lg:max-w-xs line-clamp-2 text-gray-600">Produk ini adalah hoodie keluaran terbaru dari Personal Store yang dirilis tahun 2090 di Summer Vation Paris 2090.</p>
                        <p class="text-sm">Hoodie</p>
                        <div class="items-center flex flex-row">
                          <p class="text-sm py-1 md:py-1 pb-0 md:pb-1">Ukuran: XL</p>
                          <button onClick={() => setShowModal2(true)} class="items-center px-2 block md:hidden py-1 ml-2 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                        </div>
                        <button onClick={() => setShowModal2(true)} class="items-center px-2 hidden md:block py-1 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                      </div>
                    </div>
                    <div class="w-full bg-gray-100 h-[10vh] justify-between flex flex-row items-center">
                      <h2 class="px-4 font-medium">Rp 200.000</h2>
                      <div class="px-4 flex flex-row items-center gap-4">
                        <div class="text-sm bg-gray-50 border border-gray-500 bg-white rounded-full py-1 px-2 gap-3 flex flex-row">
                          {quantity() > 1 ? (
                            <button
                              class="rounded-full hover:bg-gray-200 px-1"
                              onClick={decrease}
                            >
                              <i class="fa-solid fa-minus"></i>
                            </button>
                          ) : (
                            <button
                              class="rounded-full hover:text-gray-600 px-1"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          )}

                          <p>{quantity()}</p>

                          <button
                            class="rounded-full hover:bg-gray-200 px-1"
                            onClick={increase}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <input type="checkbox" checked class="w-6 h-6 cursor-pointer accent-black" />
                      </div>
                    </div>
                </div>
                <div class="w-full flex flex-col bg-white rounded border">
                    <div class="w-full flex flex-row h-[30vh]">
                      <img
                        src="/src/public/images/mockup/9.png"
                        alt=""
                        class="object-cover w-1/3 lg:w-1/4"
                      />
                      <div class="w-2/3 lg:w-3/4 p-4 flex-col space-y-1 text-left text-black">
                        <div class="w-full flex flex-row justify-between items-center">
                          <p class="text-lg font-semibold truncate">Hoodie 1.1</p>
                          <p>Stok: 10</p>
                        </div>
                        <p class="text-sm max-w-[160px] lg:max-w-xs line-clamp-2 text-gray-600">Produk ini adalah hoodie keluaran terbaru dari Personal Store yang dirilis tahun 2090 di Summer Vation Paris 2090.</p>
                        <p class="text-sm">Hoodie</p>
                        <div class="items-center flex flex-row">
                          <p class="text-sm py-1 md:py-1 pb-0 md:pb-1">Ukuran: XL</p>
                          <button onClick={() => setShowModal2(true)} class="items-center px-2 block md:hidden py-1 ml-2 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                        </div>
                        <button onClick={() => setShowModal2(true)} class="items-center px-2 hidden md:block py-1 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                      </div>
                    </div>
                    <div class="w-full bg-gray-100 h-[10vh] justify-between flex flex-row items-center">
                      <h2 class="px-4 font-medium">Rp 200.000</h2>
                      <div class="px-4 flex flex-row items-center gap-4">
                        <div class="text-sm bg-gray-50 border border-gray-500 bg-white rounded-full py-1 px-2 gap-3 flex flex-row">
                          {quantity() > 1 ? (
                            <button
                              class="rounded-full hover:bg-gray-200 px-1"
                              onClick={decrease}
                            >
                              <i class="fa-solid fa-minus"></i>
                            </button>
                          ) : (
                            <button
                              class="rounded-full hover:text-gray-600 px-1"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          )}

                          <p>{quantity()}</p>

                          <button
                            class="rounded-full hover:bg-gray-200 px-1"
                            onClick={increase}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <input type="checkbox" class="w-6 h-6 cursor-pointer accent-black" />
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="hidden md:block w-2/5 lg:w-1/3 mb-10">
        <div class={`w-full h-[55svh] sticky ${isScrollingUp() ? 'top-20' : 'top-4'} mt-20 bg-gray-100 py-5 px-6`}>
          <h2 class="w-full text-xl font-medium mb-6 mt-2">Rincian pesanan</h2>
          <div class="flex flex-row items-center justify-between mb-3">
            <p class="text-md">Total belanja</p>
            <p class="text-md">Rp 400.000</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3">
            <div class="items-center flex flex-row">
              <p class="text-md">Kode promo</p>
              <button onClick={() => setShowModal(true)} class="ml-1 text-xs px-2 py-1 rounded-full hover:bg-gray-200"><i class="fa-solid fa-plus"></i></button>
            </div>
            <p class="text-md">--</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3">
            <p class="text-md  w-40">Perkiraan Pengiriman & Penanganan</p>
            <p class="text-md">Free</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3 font-medium border-t border-gray-500 pt-3">
            <p class="text-md">Total harga</p>
            <p class="text-md">Rp 400.000</p>
          </div>
          <button class="w-full rounded-full bg-black text-white py-2 hover:bg-white border border-gray-800 hover:text-black">Proses pesanan</button>
        </div>
      </div>
      {showModal() && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-80 shadow-lg relative">
            <h2 class="text-lg font-semibold mb-4">Masukkan Kode Promo</h2>
            <input type="text" placeholder="Masukan kode promo" class="w-full border px-3 py-2 rounded mb-4" />
            <div class="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} class="px-4 py-2 text-sm rounded hover:bg-gray-200">Batal</button>
              <button class="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-700">Terapkan</button>
            </div>
          </div>
        </div>
      )}
      {showModal2() && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg py-5 w-80 shadow-lg relative">
            <h2 class="text-lg font-semibold px-6 mb-4">Atur ulang pesanan</h2>
            <img src="/src/public/images/mockup/9.png" alt="" class="w-full h-[30vh] object-cover mb-4" />
            <p class="text-md font-semibold truncate mb-3 px-6">Hoodie 1.1</p>
            <div class="flex justify-start mb-3 gap-2 px-6">
              <div class="relative inline-block text-left" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  class="inline-flex justify-between items-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 min-w-[70px]"
                >
                  {selectedOption2()}
                  <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen2() && (
                  <div class="absolute mt-2 w-44 h-20 md:h-28 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div class="py-1 text-sm text-gray-700">
                      <button onClick={() => selectOption2("S")} class="block w-full text-left px-4 py-2 hover:bg-gray-100">S</button>
                      <button onClick={() => selectOption2("M")} class="block w-full text-left px-4 py-2 hover:bg-gray-100">M</button>
                      <button onClick={() => selectOption2("L")} class="block w-full text-left px-4 py-2 hover:bg-gray-100">L</button>
                      <button onClick={() => selectOption2("XL")} class="block w-full text-left px-4 py-2 hover:bg-gray-100">XL</button>
                      <button onClick={() => selectOption2("XXL")} class="block w-full text-left px-4 py-2 hover:bg-gray-100">XXL</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div class="flex justify-end gap-2 px-6">
              <button onClick={() => setShowModal2(false)} class="px-4 py-2 text-sm rounded hover:bg-gray-200">Batal</button>
              <button class="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-700">Terapkan</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
