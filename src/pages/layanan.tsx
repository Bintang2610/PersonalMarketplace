import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation, useNavigate } from '@solidjs/router';

export default function Layanan() {

let revealDiv1: HTMLDivElement | undefined;

  const navigate = useNavigate();
  
    function handleBack() {
      if (window.history.length > 1) {
        navigate(-1); // Kembali ke halaman sebelumnya
      } else {
        navigate('/'); // Kalau tidak ada history, ke homepage
      }
    }

  return (
    <section>
      <div class="w-full h-[90vh] mt-16 py-4 px-6 md:px-20 lg:px-48">
        <div class="w-full h-full flex flex-col bg-gray-50">
          <div class="w-full relative bg-gray-200 p-3 font-medium text-center">
            <button onClick={handleBack} class="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
              <i class="fa-solid fa-chevron-left mr-2 ml-2"></i>Kembali
            </button>

            <div class="inline-flex items-center justify-center">
              <i class="fa-solid fa-user-tie mr-2"></i>Layanan
            </div>
          </div>
          <div class="w-full flex-1"></div>
          <div class="w-full flex flex-row relative p-3 gap-3">
            <button class="w-10 py-2 bg-white shadow-lg rounded-full"><i class="fa-solid fa-bars"></i></button>
            <input type="text" class="flex-1 rounded-full shadow-lg px-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
