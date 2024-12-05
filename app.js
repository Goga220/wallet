async function createWallet() {
    // Генерация нового кошелька
    const wallet = ethers.Wallet.createRandom();

    // Сохранение данных в localStorage
    localStorage.setItem('privateKey', wallet.privateKey);
    localStorage.setItem('address', wallet.address);

    alert(`Кошелек создан! Адрес: ${wallet.address}`);
    window.location.href = 'wallet.html';
}

async function loadWallet() {
    const address = localStorage.getItem('address');
    const privateKey = localStorage.getItem('privateKey');

    if (!address || !privateKey) {
        alert("Кошелек не найден. Вернитесь на главную страницу.");
        window.location.href = 'index.html';
        return;
    }

    const provider = new ethers.providers.InfuraProvider('mainnet', 'YOUR_INFURA_API_KEY');
    const balance = await provider.getBalance(address);

    document.getElementById('wallet-address').textContent = address;
    document.getElementById('wallet-balance').textContent = ${ethers.utils.formatEther(balance)} ETH;
}

async function sendTransaction() {
    const privateKey = localStorage.getItem('privateKey');
    const wallet = new ethers.Wallet(privateKey);

    const provider = new ethers.providers.InfuraProvider('mainnet', 'YOUR_INFURA_API_KEY');
    const walletWithProvider = wallet.connect(provider);

    const tx = {
        to: "0xReceiverAddress", // Адрес получателя
        value: ethers.utils.parseEther("0.01"), // Сумма в ETH
    };

    const transaction = await walletWithProvider.sendTransaction(tx);
    alert(`Транзакция отправлена! Хэш: ${transaction.hash}`);
}

function goBack() {
    window.location.href = 'index.html';
} 
