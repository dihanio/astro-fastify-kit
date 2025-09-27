export default function PartytownDemo() {
  return (
    <div className="partytown-demo">
      <h3 className="text-2xl font-bold text-purple-600 mb-4">🎉 Integrasi Partytown</h3>
      <p>Partytown siap digunakan untuk skrip pihak ketiga!</p>
      <p>Tambahkan skrip analitik, pelacakan, atau pemasaran Anda di sini untuk menjalankannya di web worker.</p>
      
      <div className="demo-info bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">Manfaat:</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-green-700">✅ Skrip pihak ketiga tidak memblokir</li>
          <li className="flex items-center text-green-700">✅ Performa lebih baik</li>
          <li className="flex items-center text-green-700">✅ Core Web Vitals yang lebih baik</li>
          <li className="flex items-center text-green-700">✅ Eksekusi terisolasi</li>
        </ul>
      </div>

      <div className="demo-code">
        <h4>Contoh Penggunaan:</h4>
        <pre>
{`<script type="text/partytown">
  // Google Analytics, Facebook Pixel, dll.
  // Ini akan berjalan di web worker!
</script>`}
        </pre>
      </div>

      <div className="partytown-status">
        <p><strong>Status:</strong> ✅ Partytown dikonfigurasi di astro.config.mjs</p>
        <p><strong>Penggunaan:</strong> Tambahkan <code>type="text/partytown"</code> ke tag skrip apa pun</p>
      </div>
    </div>
  );
}