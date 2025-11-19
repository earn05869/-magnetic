<script>
	import { ArrowBigRight, Bluetooth, Wifi, RefreshCw } from 'lucide-svelte';
	import SensorConnection from '$lib/components/SensorConnection.svelte';
	import SensorConnected from '$lib/components/SensorConnected.svelte';

	// 1. ตัวแปร State สำหรับเลือกโหมด ('bluetooth' หรือ 'wifi')
	let connectionMode = 'bluetooth';

	// --- Bluetooth Logic ---
	let bluetoothDevice = null;
	let isBtConnected = false;

	const connectBluetooth = async () => {
		try {
			const device = await navigator.bluetooth.requestDevice({
				acceptAllDevices: true,
				optionalServices: ['battery_service']
			});
			bluetoothDevice = device;
			// device.gatt.connect(); // Uncomment เพื่อเชื่อมต่อจริง
			isBtConnected = true;
		} catch (error) {
			console.log("User cancelled or error:", error);
		}
	};

	// --- Wi-Fi Logic (Simulation) ---
	let wifiSSID = '';
	let wifiPassword = '';
	let isWifiConnecting = false;

	const connectWifi = () => {
		isWifiConnecting = true;
		// จำลองการส่งค่า SSID/Pass ไปยังอุปกรณ์
		setTimeout(() => {
			isWifiConnecting = false;
			alert(`กำลังเชื่อมต่อ Wi-Fi: ${wifiSSID}`);
		}, 2000);
	};
</script>

<div class="flex flex-1 flex-col items-center justify-items-start gap-4 sm:gap-4 md:gap-8 h-auto p-4 pb-16 sm:px-4 md:px-8 lg:px-12 xl:px-16 bg-sky-100 min-h-screen">

	<div class="flex flex-col items-center gap-2 w-full">
		<p class="text-xl ">ตั้งค่าการเชื่อมต่อ</p>

		<div class="flex bg-white p-1 rounded-full shadow-sm border border-blue-100 w-full max-w-md">

			<button
				class="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full transition-all duration-300
				{connectionMode === 'bluetooth' ? 'bg-blue-200 shadow-md' : 'text-gray-500 hover:bg-blue-50'}"
				on:click={() => connectionMode = 'bluetooth'}
			>
				<Bluetooth size={20} />
				<span>Bluetooth</span>
			</button>

			<button
				class="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full transition-all duration-300
				{connectionMode === 'wifi' ? 'bg-blue-200 shadow-md' : 'text-gray-500 hover:bg-blue-50'}"
				on:click={() => connectionMode = 'wifi'}
			>
				<Wifi size={20} />
				<span>Wi-Fi</span>
			</button>

		</div>
	</div>

	{#if connectionMode === 'bluetooth'}
		<div class="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
			<button
				class="flex items-center justify-between w-full p-4 rounded-2xl border border-blue-200 bg-white shadow-sm hover:border-blue-400 transition-all"
				on:click={connectBluetooth}
			>
				<div class="text-left">
					<p class="font-semibold text-blue-900">จับคู่อุปกรณ์ใหม่</p>
					<p class="text-xs text-gray-500">แตะเพื่อค้นหาผ่าน Bluetooth</p>
				</div>
				<div class="bg-blue-50 p-2 rounded-full text-blue-600">
					<Bluetooth />
				</div>
			</button>

			{#if isBtConnected}
				<div class="flex flex-col gap-2 w-full">
					<p class="text-sm text-gray-600 ml-2">เชื่อมต่อแล้ว</p>
					<SensorConnected deviceName={bluetoothDevice?.name || "Unknown Device"} />
				</div>
			{/if}

			<div class="flex flex-col w-full gap-2">
				<p class="text-sm text-gray-600 ml-2">อุปกรณ์ที่เคยเชื่อมต่อ</p>
				<SensorConnection name="Sensor A1" />
				<SensorConnection name="Sensor B2" />
			</div>
		</div>

	{:else if connectionMode === 'wifi'}
		<div class="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

			<div class="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex flex-col gap-4">
				<div class="flex items-center gap-3 border-b pb-3 border-blue-50">
					<div class="bg-sky-100 p-2 rounded-full text-blue-600">
						<Wifi />
					</div>
					<div>
						<p class="font-semibold text-blue-900">เชื่อมต่อเครือข่าย</p>
						<p class="text-xs text-gray-500">ป้อนชื่อและรหัสผ่าน Wi-Fi ของคุณ</p>
					</div>
				</div>

				<div class="space-y-3">
					<div>
						<label class="text-xs font-bold text-gray-500 ml-1">SSID (ชื่อ Wi-Fi)</label>
						<input
							type="text"
							bind:value={wifiSSID}
							placeholder="เช่น My_Home_WiFi"
							class="w-full p-3 bg-stone-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
						/>
					</div>
					<div>
						<label class="text-xs font-bold text-gray-500 ml-1">Password</label>
						<input
							type="password"
							bind:value={wifiPassword}
							placeholder="••••••••"
							class="w-full p-3 bg-slate-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
						/>
					</div>
				</div>

				<button
					class="w-full bg-sky-100 py-3 rounded-xl font-semibold shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2"
					on:click={connectWifi}
					disabled={isWifiConnecting}
				>
					{#if isWifiConnecting}
						<RefreshCw class="animate-spin" size={20} /> กำลังเชื่อมต่อ...
					{:else}
						บันทึกและเชื่อมต่อ
					{/if}
				</button>
			</div>

		</div>
	{/if}

</div>