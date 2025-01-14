import axios from "axios";
import { eventBus } from "@/eventBus";

export async function getShipCount() {
  const verificationId = localStorage.getItem("verification_id");
  if (!verificationId) {
    console.error("Verification ID is missing");
    return 0;
  }

  try {
    const response = await axios.get(
      "https://alex.polan.sk/pirates-simulator/ships.php",
      {
        params: { verification_id: verificationId },
      }
    );
    if (response.data && Array.isArray(response.data)) {
      //.ships
      const shipCount = response.data.length; //.ships
      eventBus.emit("shipCountUpdated", shipCount);
      console.log("Ship count updated to:", shipCount);
      return shipCount;
    } else {
      console.error("Error fetching ship count:", response.data.error);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching ship count:", error);
    return 0;
  }
}

function roundToSignificantFigures(num, n) {
  if (num === 0) {
    return 0;
  }
  const d = Math.ceil(Math.log10(num < 0 ? -num : num));
  const power = n - d;
  const magnitude = Math.pow(10, power);
  const shifted = Math.round(num * magnitude);
  return shifted / magnitude;
}

export function calculateShipPrice(shipCount) {
  let price;
  if (shipCount < 3) {
    price = 750;
  } else if (shipCount < 10) {
    price = 750 * Math.pow(2, shipCount - 2);
  } else if (shipCount < 30) {
    price = 750 * Math.pow(2, 8) * Math.pow(1.5, shipCount - 10);
  } else if (shipCount < 60) {
    // Placeholder for further logic
    price =
      750 * Math.pow(2, 8) * Math.pow(1.5, 20) * Math.pow(1.1, shipCount - 30);
  } else {
    price = 10000000000;
  }

  // Round to the nearest significant figure
  price = roundToSignificantFigures(price, 2);

  return price;
}

export async function updateShipPrice() {
  const shipCount = await getShipCount();
  const shipPrice = calculateShipPrice(shipCount);
  eventBus.emit("shipPriceUpdated", shipPrice);
}

export function updateShips() {
  eventBus.emit("shipsUpdated");
}

export async function addShip(json) {
  try {
    const response = await axios.post(
      "https://alex.polan.sk/pirates-simulator/ships.php",
      json
    );
    if (response.data.success) {
      console.log("Ship created successfully");
      updateShips();
      return true;
    } else {
      console.error("Failed to create ship:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error creating ship:", error);
    return false;
  }
}
