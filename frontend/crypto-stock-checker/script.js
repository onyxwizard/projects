document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("priceForm");
	const input = document.getElementById("symbolInput");
	const resultDiv = document.getElementById("result");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const symbol = input.value.trim().toLowerCase();
		resultDiv.textContent = ""; // Clear previous result

		if (!symbol) {
			showError("Please enter a valid symbol.");
			return;
		}

		try {
			const response = await fetch(
				`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			if (Object.keys(data).length === 0) {
				showError(`No data found for "${symbol}". Please try again.`);
				return;
			}

			const price = data[symbol]?.usd;

			if (!price) {
				showError(`Could not retrieve USD price for "${symbol}".`);
				return;
			}

			showPrice(symbol.toUpperCase(), price);
		} catch (error) {
			console.error("Error fetching price:", error);
			showError("Unable to fetch data. Please try again later.");
		}
	});

	function showPrice(symbol, price) {
		resultDiv.innerHTML = `
    <h3>${symbol}</h3>
    <p><strong>Price:</strong> $${price.toLocaleString()}</p>
    `;
	}

	function showError(message) {
		resultDiv.innerHTML = `<p class="error">${message}</p>`;
	}
});

// Inside DOMContentLoaded
const themeToggle = document.getElementById("themeToggle");

// Apply saved theme on load
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    document.querySelector(".container").classList.add("light-mode");
    document.querySelector(".input-form input[type='text']").classList.add("light-mode");
    document.querySelector(".result-box").classList.add("light-mode");
    themeToggle.classList.add("light-mode");
    themeToggle.textContent = "Dark Mode";
}

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light-mode");
    document.querySelector(".container").classList.toggle("light-mode");
    const inputField = document.querySelector(".input-form input[type='text']");
    inputField.classList.toggle("light-mode");
    document.querySelector(".result-box").classList.toggle("light-mode");
    themeToggle.classList.toggle("light-mode");

    // Update button text
    themeToggle.textContent = isLightMode ? "Dark Mode" : "Light Mode";

    // Save preference
    if (isLightMode) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.removeItem("theme");
    }
});
