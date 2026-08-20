// src/utils/icons.js
//
// Data files (src/data/units.js) reference icons by name so the data layer
// never imports lucide-react directly (D9). Components that render a
// feature's icon resolve the string here, e.g. `iconMap[feature.icon]`.
import {
  BedDouble,
  ShowerHead,
  Car,
  ChefHat,
  DoorOpen,
  Square,
  Grid,
  Utensils,
  Shirt,
  Sofa,
  Layers,
} from "lucide-react";

const iconMap = {
  BedDouble,
  ShowerHead,
  Car,
  ChefHat,
  DoorOpen,
  Square,
  Grid,
  Utensils,
  Shirt,
  Sofa,
  Layers,
};

export default iconMap;
