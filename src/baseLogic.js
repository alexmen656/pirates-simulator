import { eventBus } from "@/eventBus";
import axios from "axios";

export function updateBases() {
  eventBus.emit("baseUpdated");
}

export async function addBase(json) {
  try {
    const response = await axios.post(
      "https://alex.polan.sk/pirates-simulator/base.php",
      json
    );
    if (response.data.success) {
      console.log("Base created successfully");
      updateBases();
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
