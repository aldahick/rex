import { MetaFunction } from "@remix-run/node";
import { CatCanvas } from "../components/cat/CatCanvas";

export const meta: MetaFunction = () => [{ title: "Rex | Cat" }];

export default function CatRoute() {
  return (
    <div style={{ marginTop: "1em" }}>
      <CatCanvas />
    </div>
  );
}
