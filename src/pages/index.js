import { Footer } from "@/components/Footer";
import { Mytodolist } from "@/components/Mytodolist";
import { Welcome } from "@/components/Welcome";

export default function Home() {
  return (
    <div className="Mytodolist">
      <Welcome />
      <Mytodolist />
      <Footer /> 
    </div>
  );
}
