import type { Car } from "@api/types";
import s from "./Specs.module.css";

export default function Specs({ car }: { car: Car }) {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <span className={s.key}>Type:</span> {car.type}
      </li>
      <li className={s.item}>
        <span className={s.key}>Engine:</span> {car.engineSize}
      </li>
      <li className={s.item}>
        <span className={s.key}>Fuel:</span> {car.fuelConsumption} L/100km
      </li>
      <li className={s.item}>
        <span className={s.key}>Accessories:</span> {car.accessories.join(", ")}
      </li>
      <li className={s.item}>
        <span className={s.key}>Functions:</span>{" "}
        {car.functionalities.join(", ")}
      </li>
      <li className={s.item}>
        <span className={s.key}>Company:</span> {car.rentalCompany}
      </li>
      <li className={s.item}>
        <span className={s.key}>Address:</span> {car.address}
      </li>
    </ul>
  );
}
