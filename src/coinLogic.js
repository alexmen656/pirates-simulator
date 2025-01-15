import axios from "axios";
import { eventBus } from "@/eventBus";

export function updateCoinCount(newCount) {
  localStorage.setItem("goldCoins", newCount);
  eventBus.emit("updateGoldCoins");
}

export async function getCoinCount() {
  const verificationId = localStorage.getItem("verification_id");
  if (!verificationId) {
    console.error("Verification ID is missing");
    return 0;
  }

  try {
    const response = await axios.get(
      "https://alex.polan.sk/pirates-simulator/coins.php",
      {
        params: { verification_id: verificationId },
      }
    );
    if (response.data && response.data.amount !== undefined) {
      const coinCount = parseInt(response.data.amount);
      updateCoinCount(coinCount); // Update local storage and emit event
      return coinCount;
    } else {
      console.error("Error fetching coin count:", response.data.error);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching coin count:", error);
    return 0;
  }
}

let timeSwitcher = 1;
export async function addCoins(amount, description) {
  //const delay = Math.random() * (1500 - 400) + 100; // Random delay between 100ms and 1500ms
  if (
    localStorage.getItem("goldCoins") &&
    localStorage.getItem("goldCoins") != ""
  ) {
    let currentCount = localStorage.getItem("goldCoins");
    currentCount = parseInt(currentCount);
    currentCount += amount;
    updateCoinCount(currentCount);
  }else{
    localStorage.setItem("goldCoins", amount);
  }

  let delay;

  if (description != "NewShip") {
    delay = 500 * timeSwitcher;
    if (timeSwitcher === 1) {
      timeSwitcher = 2;
    } else if (timeSwitcher === 2) {
      timeSwitcher = 1;
    }
  } else {
    delay = 0;
  }
  setTimeout(async () => {
    const verificationId = localStorage.getItem("verification_id");
    if (!verificationId) {
      console.error("Verification ID is missing");
      return;
    }

    try {
      const response = await axios.post(
        "https://alex.polan.sk/pirates-simulator/coins.php",
        {
          verification_id: verificationId,
          amount: amount,
          description: description,
        }
      );
      if (response.data && response.data.success) {
        const newCount = await getCoinCount(); // Fetch the updated coin count
        updateCoinCount(newCount);
      } else {
        console.error("Error adding coins:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding coins:", error);
    }
  }, delay);
}

export async function subtractCoins(amount, description) {
  const verificationId = localStorage.getItem("verification_id");
  if (!verificationId) {
    console.error("Verification ID is missing");
    return;
  }

  const currentCount = await getCoinCount();
  if (currentCount >= amount) {
    try {
      const response = await axios.post(
        "https://alex.polan.sk/pirates-simulator/coins.php",
        {
          verification_id: verificationId,
          amount: -amount,
          description: description,
        }
      );
      if (response.data && response.data.success) {
        const newCount = await getCoinCount(); // Fetch the updated coin count
        updateCoinCount(newCount);
        return true;
      } else {
        console.error("Error subtracting coins:", response.data.error);
        return false;
      }
    } catch (error) {
      console.error("Error subtracting coins:", error);
      return false;
    }
  }
  return false;
}
