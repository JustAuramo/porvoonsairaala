tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    colors: {
                        ems: {
                            50: '#eefbfe',
                            100: '#d7f5fc',
                            400: '#22d3ee',
                            500: '#06b6d4',
                            600: '#0891b2',
                            900: '#083344',
                            950: '#041f2d',
                        },
                        redems: {
                            500: '#ef4444',
                            600: '#dc2626',
                            700: '#b91c1c',
                        },
                        dark: {
                            bg: '#0a0d14',
                            card: '#121824',
                            border: '#1e293b',
                            accent: '#1e293b'
                        }
                    },
                    animation: {
                        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                    },
                    keyframes: {
                        glow: {
                            '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.2)' },
                            '100%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.4)' }
                        }
                    }
                }
            }
        }

// DISCORD WEBHOOK OSOITE:
        // Aseta tähän oma Discord Webhook URL-osoitteesi
        const DISCORD_WEBHOOK_URL "";

        // Lucide Icons init
        lucide.createIcons();

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // EMS Emergency Codes Data
        const emsCodes = [
            { code: "700", title: "Liikenneonnettomuus", urgent: "KORKEA (A/B)", desc: "Ajoneuvojen kolarointi tai jalankulkijan päälleajo." },
            { code: "701", title: "Palovamma / Räjähdys", urgent: "KORKEA (A)", desc: "Tulipalon aiheuttamat vammat tai höyrypalovammat." },
            { code: "702", title: "Elottomuus / CPR", urgent: "KRIITTINEN (A)", desc: "Potilas ei hengitä tai sydän on pysähtynyt." },
            { code: "703", title: "Aseellinen Vamma (Ampuma/Puukotus)", urgent: "KRIITTINEN (A)", desc: "Ampuma- tai teräaseen aiheuttama vakava kudosvaurio." },
            { code: "704", title: "Pahoinpitely / Väkivalta", urgent: "KESKITASO (B/C)", desc: "Fyyseisen väkivallan uhrin tutkimus ja hoito." },
            { code: "705", title: "Putoaminen / Trauma", urgent: "KESKITASO (B)", desc: "Korkealta putoaminen tai muu tylppä trauma." },
            { code: "706", title: "Rintakipu / Sydänoire", urgent: "KORKEA (A/B)", desc: "Epäily sepelvaltimotautikohtauksesta tai rytmihäiriöstä." },
            { code: "707", title: "Myrkytys / Yliannostus", urgent: "KORKEA (A/B)", desc: "Aineiden väärinkäyttö tai kemikaalimyrkytys." },
            { code: "708", title: "Sairaskohtaus (Aivoverenkierto/Kouristus)", urgent: "KESKITASO (B)", desc: "Epilepsiointi tai halvausoireet." },
            { code: "709", title: "Siirtoajo / Perushoito", urgent: "MATALA (D)", desc: "Kiireetön potilassiirto sairaaloiden välillä." }
        ];

        // Render Codes to Table
        function renderCodes(items) {
            const tbody = document.getElementById('codeTableBody');
            if(!tbody) return;
            tbody.innerHTML = '';
            
            items.forEach(item => {
                let badgeClass = "bg-slate-800 text-slate-300 border-slate-700";
                if(item.urgent.includes("KRIITTINEN")) badgeClass = "bg-redems-500/20 text-redems-400 border-redems-500/40";
                else if(item.urgent.includes("KORKEA")) badgeClass = "bg-amber-500/20 text-amber-400 border-amber-500/40";
                else if(item.urgent.includes("KESKITASO")) badgeClass = "bg-blue-500/20 text-blue-400 border-blue-500/40";

                const tr = document.createElement('tr');
                tr.className = "hover:bg-dark-bg/50 transition";
                tr.innerHTML = `
                    <td class="p-3.5 pl-4 font-bold text-ems-400">${item.code}</td>
                    <td class="p-3.5">
                        <div class="font-semibold text-slate-200 text-sm">${item.title}</div>
                        <div class="text-slate-400 text-[11px] font-sans">${item.desc}</div>
                    </td>
                    <td class="p-3.5">
                        <span class="px-2 py-0.5 rounded border text-[10px] font-semibold ${badgeClass}">
                            ${item.urgent}
                        </span>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Filter Codes Search Function
        function filterCodes() {
            const query = document.getElementById('codeSearchInput').value.toLowerCase();
            const filtered = emsCodes.filter(c => 
                c.code.toLowerCase().includes(query) || 
                c.title.toLowerCase().includes(query) || 
                c.desc.toLowerCase().includes(query)
            );
            renderCodes(filtered);
        }

        // Live Dispatch Calls Mock Data & Generator
        let activeDispatchCalls = [
            { id: 101, code: "702 - ELOTTOMUUS", location: "Satamakatu 4, Satama", units: "E-101, E-201", time: "1 min sitten", priority: "A-Kiireellinen" },
            { id: 102, code: "706 - RINTAKIPU", location: "Bulevardi 12, Keskusta", units: "E-102", time: "5 min sitten", priority: "B-Kohtalainen" },
            { id: 103, code: "704 - PAHOINPITELY", location: "Kujakatu 2, Vinewood", units: "E-202", time: "12 min sitten", priority: "C-Perus" }
        ];

        function renderDispatchCalls() {
            const container = document.getElementById('dispatchCallList');
            if(!container) return;
            container.innerHTML = '';

            activeDispatchCalls.forEach(call => {
                const card = document.createElement('div');
                card.className = "p-3.5 rounded-xl bg-dark-bg border border-dark-border flex items-start justify-between gap-4 hover:border-slate-700 transition";
                card.innerHTML = `
                    <div class="space-y-1">
                        <div class="flex items-center space-x-2">
                            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-redems-500/20 text-redems-400 border border-redems-500/30">
                                ${call.code}
                            </span>
                            <span class="text-xs font-mono text-slate-400">${call.priority}</span>
                        </div>
                        <div class="text-sm font-semibold text-slate-200">${call.location}</div>
                        <div class="text-xs text-slate-400 font-mono">Resurssit: <span class="text-ems-400">${call.units}</span></div>
                    </div>
                    <span class="text-[10px] font-mono text-slate-500 whitespace-nowrap">${call.time}</span>
                `;
                container.appendChild(card);
            });
        }

        // Sound Effect Synth using Web Audio API
        function playEmergencyBeep() {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if(!AudioContext) return;
                const ctx = new AudioContext();
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);

                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            } catch (e) {
                console.log("Audio play blocked or not supported");
            }
        }

        // Trigger Simulated Emergency Call
        function triggerEmergencyAlert() {
            playEmergencyBeep();

            const locations = ["Lentokenttä Terminal 1", "Pääkatu 88", "Moottoritie A3", "Pohjois-Satama", "Teollisuusalue B"];
            const codes = [
                "700 - LIIKENNEONNETTOMUUS", 
                "703 - AMPUMAVAMMA", 
                "701 - TULIPALO/PALOVAMMA", 
                "702 - ELOTTOMUUS"
            ];

            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            const randomCode = codes[Math.floor(Math.random() * codes.length)];

            const newCall = {
                id: Date.now(),
                code: randomCode,
                location: randomLocation,
                units: "E-101, L-3",
                time: "Nyt",
                priority: "A-KRIITTINEN"
            };

            activeDispatchCalls.unshift(newCall);
            if(activeDispatchCalls.length > 5) activeDispatchCalls.pop();
            renderDispatchCalls();

            const banner = document.getElementById('emergencyAudioBanner');
            const bannerText = document.getElementById('alertBannerText');
            if (banner && bannerText) {
                bannerText.innerText = `${randomCode} kohteessa ${randomLocation}. Yksiköt hälytetty.`;
                banner.classList.remove('hidden');

                setTimeout(() => {
                    banner.classList.add('hidden');
                }, 4000);
            }

            const callCounter = document.getElementById('statCallsToday');
            if(callCounter) callCounter.innerText = parseInt(callCounter.innerText) + 1;
        }

        function addManualDispatchCall() {
            triggerEmergencyAlert();
        }

        // Form Submission Handling & Discord Webhook Integration
        async function handleRecruitmentSubmit(event) {
            event.preventDefault();

            const form = event.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Lähetetään...';
            }

            // Kerätään kaikki kentät FormData-objektilla
            const formData = new FormData(form);
            const fields = [];

            formData.forEach((value, key) => {
                fields.push({
                    name: key,
                    value: value.toString().trim() || 'Ei ilmoitettu',
                    inline: (key === 'IRL Ikä' || key === 'Kuuluuko Jengiin')
                });
            });

            // Discord Embed Payload
            const payload = {
                username: "EMS Hakemus Botti",
                avatar_url: "https://cdn-icons-png.flaticon.com/512/1032/1032989.png",
                embeds: [
                    {
                        title: "🚑 Uusi Työhakemus Saapunut!",
                        color: 14231078, // Punainen hex-sävy (#d92626)
                        fields: fields,
                        footer: {
                            text: "Sairaalan Rekrytointijärjestelmä"
                        },
                        timestamp: new Date().toISOString()
                    }
                ]
            };

            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const modal = document.getElementById('successModal');
                    if (modal) modal.classList.remove('hidden');
                    else alert('Hakemus lähetetty onnistuneesti!');
                    
                    form.reset();
                } else {
                    alert('Virhe hakemuksen lähetyksessä. Tarkista Discord Webhook -osoite skriptistä.');
                }
            } catch (error) {
                console.error('Webhook error:', error);
                alert('Lähetys epäonnistui. Tarkista verkko-yhteys tai Discord Webhook -osoite.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        }

        function closeModal() {
            const modal = document.getElementById('successModal');
            if (modal) modal.classList.add('hidden');
        }

        // Initialize on load
        window.onload = function() {
            renderCodes(emsCodes);
            renderDispatchCalls();

            let seconds = 134;
            setInterval(() => {
                seconds++;
                const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
                const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
                const secs = (seconds % 60).toString().padStart(2, '0');
                const timerElem = document.getElementById('heroLiveTimer');
                if(timerElem) timerElem.innerText = `${hrs}:${mins}:${secs}`;
            }, 1000);
        };