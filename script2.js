// Variabel global untuk menyimpan data
let carbonData = {
    biomass: 0,
    carbonFraction: 0,
    carbonStock: 0,
    carbonAbsorptionPerTree: 0,
    carbonAbsorptionPerHectar: 0
};

// Fungsi untuk menampilkan/menyembunyikan metode perhitungan
function showAllometric() {
    document.getElementById('allometric').style.display = 'block';
    document.getElementById('nonAllometric').style.display = 'none';
}

function showNonAllometric() {
    document.getElementById('allometric').style.display = 'none';
    document.getElementById('nonAllometric').style.display = 'block';
}

// Fungsi validasi input
function validateInput(...inputs) {
    return inputs.every(input => input !== '' && !isNaN(input));
}

// Fungsi perhitungan biomassa
function calculateBiomass() {
    const spesies = document.getElementById('spesies').value;
    const dbh = parseFloat(document.getElementById('dbh').value);
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);

    if (!validateInput(dbh, a, b)) {
        showAlert('Harap isi semua input dengan benar');
        return;
    }

    // Rumus biomassa (contoh, sesuaikan dengan rumus spesifik)
    const biomass = a * Math.pow(dbh, b);
    
    // Perbarui tampilan
    document.getElementById('biomassResult').innerText = 
        `Biomassa ${spesies}: ${biomass.toFixed(2)} kg`;
    
    // Simpan data
    carbonData.biomass = biomass;
    updateVisualizationAllo();
}

// Fungsi perhitungan fraksi karbon
function calculateCarbonFraction() {
    const massaKarbon = parseFloat(document.getElementById('massaKarbon').value);
    const massaTotal = parseFloat(document.getElementById('massaTotal').value);
    const spesies = document.getElementById('spesies').value;

    if (!validateInput(massaKarbon, massaTotal) || massaTotal === 0) {
        showAlert('Harap isi semua input dengan benar');
        return;
    }

    const carbonFraction = (massaKarbon / massaTotal) * 100;
    
    // Perbarui tampilan
    document.getElementById('carbonFractionResult').innerText = 
        `Fraksi Karbon ${spesies}: ${carbonFraction.toFixed(2)}%`;
    
    // Simpan data
    carbonData.carbonFraction = carbonFraction;
    updateVisualizationAllo();
}

// Fungsi perhitungan stok karbon
function calculateCarbonStock() {
    const biomass = parseFloat(document.getElementById('biomassInput').value);
    const carbonFraction = parseFloat(document.getElementById('carbonFractionInput').value);
    const spesies = document.getElementById('spesies').value;

    if (!validateInput(biomass, carbonFraction)) {
        showAlert('Harap isi semua input dengan benar');
        return;
    }

    const carbonStock = biomass * (carbonFraction / 100);
    
    // Perbarui tampilan
    document.getElementById('carbonStockResult').innerText = 
        `Stok Karbon ${spesies}: ${carbonStock.toFixed(2)} kg`;
    
    // Simpan data
    carbonData.carbonStock = carbonStock;
    updateVisualizationAllo();
}

// Fungsi perhitungan serapan karbon per pohon
function calculateCarbonAbsorptionPerTree() {
    const stock = parseFloat(document.getElementById('stockInput').value);
    const spesies = document.getElementById('spesies').value;

    if (!validateInput(stock)) {
        showAlert('Harap isi input dengan benar');
        return;
    }

    // Konversi stok karbon ke CO2 yang diserap
    const carbonAbsorptionPerTree = (44 / 12) * stock;
    
    // Perbarui tampilan
    document.getElementById('carbonAbsorptionPerTreeResult').innerText = 
        `Serapan Karbon per Pohon ${spesies}: ${carbonAbsorptionPerTree.toFixed(2)} kg CO2`;
    
    // Simpan data
    carbonData.carbonAbsorptionPerTree = carbonAbsorptionPerTree;
    updateVisualizationAllo();
}

// Fungsi perhitungan serapan karbon per hektar
function calculateCarbonAbsorptionPerHectar() {
    const density = parseFloat(document.getElementById('density').value);
    const stockPerTree = parseFloat(document.getElementById('stockInputHectar').value);
    const spesies = document.getElementById('spesies').value;

    if (!validateInput(density, stockPerTree)) {
        showAlert('Harap isi semua input dengan benar');
        return;
    }

    const carbonAbsorptionPerHectar = density * stockPerTree;
    
    // Perbarui tampilan
    document.getElementById('carbonAbsorptionPerHectarResult').innerText = 
        `Serapan Karbon per Hektar ${spesies}: ${carbonAbsorptionPerHectar.toFixed(2)} kg/ha`;
    
    // Simpan data
    carbonData.carbonAbsorptionPerHectar = carbonAbsorptionPerHectar;
    updateVisualizationAllo();
}

// Fungsi untuk perhitungan Non-Allometrik

// Perhitungan Biomassa Non-Allometrik
function calculateBiomassNonAllometric() {
    const dryWeight = parseFloat(document.getElementById('dryWeight').value);
    const wetWeight = parseFloat(document.getElementById('wetWeight').value);
    const totalWetWeight = parseFloat(document.getElementById('totalWetWeight').value);

    if (!validateInput(dryWeight, wetWeight, totalWetWeight)) {
        showAlert('Harap isi semua input dengan benar');
        return;
    }

    // Rumus biomassa untuk Non-Allometrik
    const biomass = (dryWeight / wetWeight) * totalWetWeight;

    // Perbarui tampilan
    document.getElementById('biomassNonAllometricResult').innerText = 
        `Biomassa Non-Allometrik: ${biomass.toFixed(2)} kg`;

    // Simpan data
    carbonData.biomass = biomass;
    updateVisualization();
}

// Perhitungan Fraksi Karbon Non-Allometrik
function calculateCarbonFractionNonAllometric() {
    const carbonMass = parseFloat(document.getElementById('carbonMass').value);
    const totalMass = parseFloat(document.getElementById('totalMass').value);

    if (!validateInput(carbonMass, totalMass)) {
        showAlert('Harap isi semua input dengan benar');
        return;
    }

    const carbonFraction = (carbonMass / totalMass) * 100;

    // Perbarui tampilan
    document.getElementById('carbonFractionNonAllometricResult').innerText = 
        `Fraksi Karbon Non-Allometrik: ${carbonFraction.toFixed(2)}%`;

    // Simpan data
    carbonData.carbonFraction = carbonFraction;
    updateVisualization();
}

// Perhitungan Stok Karbon Non-Allometrik
function calculateCarbonStockNonAllometric() {
    const biomass = parseFloat(document.getElementById('biomassInputNonAllometric').value);
    const carbonFraction = parseFloat(document.getElementById('carbonFractionInputNonAllometric').value);

    if (!validateInput(biomass, carbonFraction)) {
        showAlert('Harap isi semua input dengan benar');
        return;
    }

    const carbonStock = biomass * (carbonFraction / 100);

    // Perbarui tampilan
    document.getElementById('carbonStockNonAllometricResult').innerText = 
        `Stok Karbon Non-Allometrik: ${carbonStock.toFixed(2)} kg`;

    // Simpan data
    carbonData.carbonStock = carbonStock;
    updateVisualization();
}

// Perhitungan Serapan Karbon per Pohon Non-Allometrik
function calculateCarbonAbsorptionPerTreeNonAllometric() {
    const stock = parseFloat(document.getElementById('stockInputNonAllometric').value);

    if (!validateInput(stock)) {
        showAlert('Harap isi input dengan benar');
        return;
    }

    const carbonAbsorptionPerTree = (44 / 12) * stock;

    // Perbarui tampilan
    document.getElementById('carbonAbsorptionPerTreeNonAllometricResult').innerText = 
        `Serapan Karbon per Pohon Non-Allometrik: ${carbonAbsorptionPerTree.toFixed(2)} kg CO2`;

    // Simpan data
    carbonData.carbonAbsorptionPerTree = carbonAbsorptionPerTree;
    updateVisualization();
}

// Perhitungan Serapan Karbon per Hektar Non-Allometrik
function calculateCarbonAbsorptionPerHectarNonAllometric() {
    const density = parseFloat(document.getElementById('densityNonAllometric').value);
    const stockPerTree = parseFloat(document.getElementById('stockInputHectarNonAllometric').value);

    if (!validateInput(density, stockPerTree)) {
        showAlert('Harap isi semua input dengan benar');
        return;
    }

    const carbonAbsorptionPerHectar = density * stockPerTree;

    // Perbarui tampilan
    document.getElementById('carbonAbsorptionPerHectarNonAllometricResult').innerText = 
        `Serapan Karbon per Hektar Non-Allometrik: ${carbonAbsorptionPerHectar.toFixed(2)} kg/ha`;

    // Simpan data
    carbonData.carbonAbsorptionPerHectar = carbonAbsorptionPerHectar;
    updateVisualization();
}

// Fungsi untuk menampilkan alert
function showAlert(message) {
    alert(message);
}

// Fungsi untuk memperbarui visualisasi allo
function updateVisualizationAllo() {
    // Pastikan Chart.js telah dimuat
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('carbonChartAllo').getContext('2d');

        // Hapus chart sebelumnya jika ada
        if (window.carbonChartInstance) {
            window.carbonChartInstance.destroy();
        }

        // Buat chart baru
        window.carbonChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Biomassa', 
                    'Fraksi Karbon', 
                    'Stok Karbon', 
                    'Serapan/Pohon', 
                    'Serapan/Hektar'
                ],
                datasets: [{
                    label: 'Perhitungan Karbon Mangrove',
                    data: [
                        carbonData.biomass, 
                        carbonData.carbonFraction, 
                        carbonData.carbonStock, 
                        carbonData.carbonAbsorptionPerTree, 
                        carbonData.carbonAbsorptionPerHectar
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(231, 76, 60, 0.6)',
                        'rgba(155, 89, 182, 0.6)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(231, 76, 60, 1)',
                        'rgba(155, 89, 182, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Jumlah (kg)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Visualisasi Serapan Karbon Mangrove'
                    }
                }
            }
        });
    }
}

// Fungsi untuk memperbarui visualisasi 
function updateVisualization() {
    // Pastikan Chart.js telah dimuat
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('carbonChart').getContext('2d');

        // Hapus chart sebelumnya jika ada
        if (window.carbonChartInstance) {
            window.carbonChartInstance.destroy();
        }

        // Buat chart baru
        window.carbonChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Biomassa', 
                    'Fraksi Karbon', 
                    'Stok Karbon', 
                    'Serapan/Pohon', 
                    'Serapan/Hektar'
                ],
                datasets: [{
                    label: 'Perhitungan Karbon Mangrove',
                    data: [
                        carbonData.biomass, 
                        carbonData.carbonFraction, 
                        carbonData.carbonStock, 
                        carbonData.carbonAbsorptionPerTree, 
                        carbonData.carbonAbsorptionPerHectar
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(231, 76, 60, 0.6)',
                        'rgba(155, 89, 182, 0.6)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(231, 76, 60, 1)',
                        'rgba(155, 89, 182, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Jumlah (kg)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Visualisasi Serapan Karbon Mangrove'
                    }
                }
            }
        });
    }
}

// Event listener untuk memuat grafik saat halaman dimuat
window.onload = function() {
    updateVisualizationAllo();
};

window.onload = function() {
    updateVisualization();
};
